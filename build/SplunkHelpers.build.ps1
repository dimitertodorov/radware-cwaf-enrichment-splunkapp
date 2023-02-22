task SetupDockerVariables SetupVariables, {
    $Script:SplunkAPIHost = "https://localhost:$( $DockerSplunkAPIPort )"
    $Script:SplunkURL = "http://localhost:$( $DockerSplunkWebPort )"
    $Script:RequestSplat = @{
        Method               = "GET"
        Uri                  = "$( $SplunkAPIHost )/services/authentication/users/$( $SplunkUser )"
        SkipCertificateCheck = $true
        Credential           = $SplunkCreds
    }
    $envFileContents = @"
DockerSplunkImage={0}
DockerSplunkHostname={1}
DockerSplunkWebPort={2}
DockerSplunkAPIPort={3}
DockerSplunkHECPort={4}
SplunkClearPassword={5}
SplunkAppName={6}
"@ -f $DockerSplunkImage, $DockerSplunkHostname, $DockerSplunkWebPort, $DockerSplunkAPIPort, $DockerSplunkHECPort, $SplunkClearPassword, $SplunkAppName
    $envFileContents | Out-File -FilePath "$( $BuildRoot )/build/.env" -Encoding ASCII
    
}

## Docker Tasks
task StartDockerContainer SetupDockerVariables, {
    # Cleanup any local files before starting docker container
    if (Test-Path "$( $BuildRoot )/splunkapp/local/") {
        Remove-Item "$( $BuildRoot )/splunkapp/local/*.conf" -Force
    }
    if (Test-Path "$( $BuildRoot )/splunkapp/metadata/local.meta") {
        Remove-Item "$( $BuildRoot )/splunkapp/metadata/local.meta" -Force
    }
    $SplunkContainerStatus = (docker ps --filter "name=$SplunkContainerName" --format "{{.Status}}")
    if ( [string]::IsNullOrEmpty($SplunkContainerStatus)) {
        exec {
            docker compose -f "$( $BuildRoot )/build/docker-compose-dev.yml" `
                -p "splunkdev" up -d
        }
    }
    else {
        Write-Host "Docker container already exists - status $SplunkContainerStatus"
    }
}

task StopDockerContainer {
    exec { docker-compose -f "$( $BuildRoot )/build/docker-compose-dev.yml" -p "splunkdev" down }
    exec { docker-compose -f "$( $BuildRoot )/build/docker-compose-dev.yml" -p "splunkdev" rm }
}

task AssertDockerContainersExist {
    $SplunkContainerStatus = (docker ps --filter "name=$SplunkContainerName" --format "{{.Status}}")
    assert ( -not [string]::IsNullOrEmpty($SplunkContainerStatus))
}

task CheckSplunkDockerHealth AssertDockerContainersExist, {
    $LoopCounter = 0
    $ContainerHealth = "starting"
    While (($LoopCounter -lt $MaxWaitSeconds) -and ($ContainerHealth -ilike "*starting*")) {
        $ContainerHealth = docker ps --filter "name=$( $SplunkContainerName )" --format "{{.Status}}"
        $LoopCounter += 1
        $ProgressParameters = @{
            Activity        = 'Waiting for Splunk to be Available'
            Status          = "Progress-> $ContainerHealth"
            PercentComplete = ($LoopCounter / $MaxWaitSeconds * 100)
        }
        Write-Progress @ProgressParameters
        Start-Sleep -Seconds 1
    }
    assert { (docker ps --filter "name=$( $SplunkContainerName )" --format "{{.Status}}") -ne "" }
}

task DockerPester SetupDockerVariables, {
    $dockerTestParams = @{
        SplunkAPIHost = $Script:SplunkAPIHost
        SplunkURL     = $Script:SplunkURL
    }
    $pesterContainer = New-PesterContainer -Path "$( $BuildRoot )/test/*.tests.ps1" -Data $dockerTestParams
    $PesterConfig.Run.Container = $pesterContainer
    Invoke-Pester -Configuration $Script:PesterConfig
}

task TestInDocker StartDockerContainer, CheckSplunkDockerHealth, CheckSplunkHealth, DockerPester, {
    Write-Host "TestInDocker Complete"
}

task TestFrontendInDocker StartDockerContainer, CheckSplunkDockerHealth, CheckSplunkHealth, PesterFrontend, {
    Write-Host "Frontend Testing Complete"
}

## Common Splunk Tasks - Can be used in both Docker and Local Splunk. To use in Docker, use SetupDockerVariables first
task ConfigureCORS SetupVariables, {
    $RequestSplat.Uri = "$( $SplunkAPIHost )/services/properties/server/httpServer/crossOriginSharingPolicy?output_mode=json"
    try {
        $ExistingSetting = Invoke-RestMethod @RequestSplat -ResponseHeadersVariable ResponseHeaders
    }
    catch {
        $ExistingSetting = $false
    }
    if ($ExistingSetting -ne "*") {
        Write-Host "Updating CORS Settings"
        $RequestSplat.Body = "crossOriginSharingPolicy=*"
        $RequestSplat.Method = "POST"
        $RequestSplat.Uri = "$( $SplunkAPIHost )/services/properties/server/httpServer"
        Invoke-RestMethod @RequestSplat
        $RequestSplat.Remove('Body')
        $RequestSplat.Uri = "$( $SplunkAPIHost )/services/server/control/restart"
        Invoke-RestMethod @RequestSplat
    }
    else {
        Write-Host "CORS is already configured on $SplunkAPIHost"
    }
}

task CheckSplunkHealth SetupVariables, {
    $RequestSplat = @{
        Method               = "GET"
        Uri                  = "$( $SplunkAPIHost )/services/server/info?output_mode=json"
        SkipCertificateCheck = $true
        Credential           = $SplunkCreds
    }
    $result = Invoke-RestMethod @RequestSplat
    assert($result.entry[0].content.health_info -eq "green")
    Write-Host "Splunk is healthy on $SplunkAPIHost - Host: $( $result.entry[0].content.host ) Version: $( $result.entry[0].content.version )"
}

task AcknowledgeTelemetryOptIn SetupVariables, {
    $RequestSplat = @{
        Method               = "POST"
        Body = @{
            output_mode = "json"
            sendAnonymizedUsage = "true"
            sendSupportUsage = "true"
            sendLicenseUsage = "true"
            sendAnonymizedWebAnalytics = "true"
            showOptInModal = "1"
            optInVersionAcknowledged = "4"
        }
        Uri                  = "$( $SplunkAPIHost )/servicesNS/nobody/splunk_instrumentation/admin/telemetry/general"
        SkipCertificateCheck = $true
        Credential           = $SplunkCreds
    }
    Invoke-RestMethod @RequestSplat
}

task SetupAuthToken CheckSplunkHealth, {
    $RequestSplat = @{
        Method               = "POST"
        Uri                  = "$( $SplunkAPIHost )/services/admin/Token-auth/tokens_auth?disabled=false&expiration=&output_mode=json"
        SkipCertificateCheck = $true
        Credential           = $SplunkCreds
    }
    Invoke-RestMethod @RequestSplat
    $RequestSplat.Body = @{
        name        = "admin"
        audience    = "splunktest"
        expires_on  = "+60d"
        not_before  = ""
        output_mode = "json"
    }
    $RequestSplat.Uri = "$( $SplunkAPIHost )/services/authorization/tokens"
    $TokenResult = Invoke-RestMethod @RequestSplat
    $JWTToken = $TokenResult.entry[0].content.token
    $TokenPath = "$( $FrontendPath )/packages/radware-enrichment-components/demo/standalone/local_setup.js"
    $TokenContent = @{
        splunkdHostUrl = $SplunkAPIHost
        splunkWebUrl   = $SplunkURL
        adminToken     = $JWTToken
    }
    "window.`$DEVC = " + ($TokenContent | ConvertTo-Json) | Out-File $TokenPath -Force
}

## Submit app for Splunk AppInspect
## https://dev.splunk.com/enterprise/docs/developapps/testvalidate/appinspect/useappinspectapi/
task SubmitAppInspect GetVersion, {
    if (-not $env:SPLUNKBASE_USER -or -not $env:SPLUNKBASE_PASSWORD) {
        Write-Host "SPLUNKBASE_USER and SPLUNKBASE_PASSWORD must be set in the environment for AppInspect"
        exit 1
    }
    [securestring]$SplunkBasePassword = ConvertTo-SecureString $env:SPLUNKBASE_PASSWORD -AsPlainText -Force
    [pscredential]$SplunkBaseCreds = New-Object System.Management.Automation.PSCredential ($env:SPLUNKBASE_USER, $SplunkBasePassword)

    ## Get Splunkbase Auth Token
    $token = Get-SplunkbaseAuthToken -Credentials $SplunkBaseCreds
    $bearerToken = $token.token

    $AppInspectStatus = $null

    $AppValidationCache = "$($BuildRoot)/splunkbase_appvalidate.json"
    if (Test-path $AppValidationCache) {
        $ValidationStatus = Get-Content $AppValidationCache | ConvertFrom-Json
        assert($ValidationStatus.app_version -eq $AppVersion) "Validation in progress is for a different version - $($ValidationStatus.app_version) vs $AppVersion in app.conf and manifest"
        Write-Host "App validation in progress found - checking status"
        $AppInspectStatus = Get-SplunkAppInspectReport -BearerToken $token.token -RequestId $ValidationStatus.request_id -Wait
    }
    else {
        Write-Host "No app validation in progress found - submitting new AppInspect Request"
        $PackageFilePath = "$($BuildRoot)/$PackageFileName"
        if (-not (Test-Path $PackageFilePath)) {
            Write-Host "Package file $($PackageFileName) not found - exiting"
            exit 1
        }
        $ValidationRequest = @{
            Uri     = "https://appinspect.splunk.com/v1/app/validate"
            Headers = @{
                "Authorization" = "Bearer $($bearerToken)"
                "Cache-Control" = "no-cache"
            }
            Method  = "Post"
            Form    = @{
                included_tags = "cloud"
                app_package   = (Get-Item $PackageFilePath)
            }
        }
        $ValidationResponse = Invoke-RestMethod @ValidationRequest
        if ($ValidationResponse.message -eq "Validation request submitted.") {
            Write-Host "Validation request submitted - waiting for results $($ValidationResponse.request_id)"
            $ValidationResponse | Add-Member -NotePropertyName "app_version" -NotePropertyValue $AppVersion
            $ValidationResponse | ConvertTo-Json -Depth 10 | Out-File $AppValidationCache -Force
            $AppInspectStatus = Get-SplunkAppInspectReport -BearerToken $token.token -RequestId $ValidationResponse.request_id -Wait
        }
        else {
            Write-Host "AppInspect Request Failed"
            return $ValidationResponse
            exit 1
        }
    }
    if ($AppInspectStatus) {
        if ($AppInspectStatus.info.failure -gt 0) {
            Write-Host "AppInspect validation failed - $($AppInspectStatus.info.failure) failures"
            Write-Host "AppInspect validation report - $($AppInspectStatus.report_file)"
            $ReportObject = (Get-Content $AppInspectStatus.report_file | ConvertFrom-Json -Depth 100)
            $FailureMessages = ($ReportObject.reports.groups.checks.messages | Where-Object { $_.result -eq "failure" } )
            foreach ($FailureMessage in $FailureMessages) {
                Write-Host "AppInspect Failure ### `n $($FailureMessage.message)"
            }
            assert($AppInspectStatus.info.failure -eq 0) "AppInspect validation failed Number of Failures - $($AppInspectStatus.info.failure)"
        }
        else {
            Write-Host "AppInspect validation passed. `n $($AppInspectStatus.info | ConvertTo-JSON)"
        }   
    }
}

function Get-SplunkAppInspectReport {
    Param(
        [Parameter(Mandatory = $true)]
        [string]$BearerToken,
        [Parameter(Mandatory = $true)]
        [string]$RequestId,
        [Parameter(Mandatory = $false)]
        [switch]$Wait
    )
    $RequestHeaders = @{
        "Authorization" = "Bearer $($bearerToken)"
        "Cache-Control" = "no-cache"
    }
    $ValidationInProgress = $true
    $WaitCounter = 0
    $ReportFile = "$($BuildRoot)/output/appinspect_report_$($AppVersion).json"
    while ($ValidationInProgress -and ($WaitCounter -lt ($MaxWaitAppInspect / 5))) {
        $WaitCounter++
        $ValidationRequest = @{
            Headers = $RequestHeaders
            Method  = "GET"
            Uri     = "https://appinspect.splunk.com/v1/app/validate/status/$($RequestId)"
        }
        
        $ValidationStatus = Invoke-RestMethod @ValidationRequest
        if ($ValidationStatus.status -eq "SUCCESS") {
            $ValidationInProgress = $false
            $ReportRequest = @{
                Headers = $RequestHeaders
                Method  = "GET"
                Uri     = "https://appinspect.splunk.com/v1/app/report/$($RequestId)"
                OutFile = $ReportFile
                Proxy   = "http://localhost:8080"
            }
            Write-Host "AppInspect Validation Status - $($ValidationStatus.status). Downloading report to $($ReportFile)"
            Invoke-WebRequest @ReportRequest
            $ValidationStatus | Add-Member -NotePropertyName "report_file" -NotePropertyValue $ReportFile
            return $ValidationStatus
        }
        else {
            Write-Host "AppInspect Validation Status - $($ValidationStatus.status). Waiting 5 seconds before checking again"
            Start-Sleep -Seconds 5
            if (-not $Wait) {
                $ValidationInProgress = $false
                return $ValidationStatus
            }
        }
    }
}

function Get-SplunkbaseAuthToken {
    Param(
        [Parameter(Mandatory = $true)]
        [PSCredential]$Credentials
    )
    if (Test-path "$($BuildRoot)/splunkbase_connection.json") {
        $tokenCache = Get-Content "$($BuildRoot)/splunkbase_connection.json" | ConvertFrom-Json
        $tokenExpiry = Get-Date -Date $tokenCache.expiry
        if ($tokenExpiry -gt (Get-Date)) {
            Write-Host "Token in Cache"
            return $tokenCache
        }
        else {
            Write-Host "Token Expired - Refreshing $($tokenExpiry) < $(Get-Date)"
        }
    }
    $base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("{0}:{1}" -f $spCreds.GetNetworkCredential().UserName, $spCreds.GetNetworkCredential().Password)))
    $RequestHeaders = @{Authorization = ("Basic {0}" -f $base64AuthInfo) }
    $TokenResponse = Invoke-RestMethod -Uri $uri -Headers $RequestHeaders
    $TokenPayload = Parse-JWTtoken -Token $TokenResponse.data.token
    $TokenExpiry = (([System.DateTimeOffset]::FromUnixTimeSeconds($TokenPayload.exp)).DateTime).ToString()
    $TokenCache = @{
        token   = $TokenResponse.data.token
        payload = $TokenPayload
        expiry  = $TokenExpiry
    }
    ($TokenCache | ConvertTo-Json -Depth 20 | Out-File "$($BuildRoot)/splunkbase_connection.json" -Force)
    return $TokenCache
}

function Parse-JWTtoken {
    <#
    .DESCRIPTION
    Decodes a JWT token. This was taken from link below. Thanks to Vasil Michev.
    .LINK
    https://www.michev.info/Blog/Post/2140/decode-jwt-access-and-id-tokens-via-powershell
    #>
    [cmdletbinding()]
    param(
        [Parameter(Mandatory = $True)]
        [string]$Token
    )

    #Validate as per https://tools.ietf.org/html/rfc7519
    #Access and ID tokens are fine, Refresh tokens will not work
    if (-not $Token.Contains(".") -or -not $Token.StartsWith("eyJ")) {
        Write-Error "Invalid token" -ErrorAction Stop
    }

    #Header
    $tokenheader = $Token.Split(".")[0].Replace('-', '+').Replace('_', '/')

    #Fix padding as needed, keep adding "=" until string length modulus 4 reaches 0
    while ($tokenheader.Length % 4) {
        Write-Verbose "Invalid length for a Base-64 char array or string, adding ="
        $tokenheader += "="
    }

    Write-Verbose "Base64 encoded (padded) header: $tokenheader"

    #Convert from Base64 encoded string to PSObject all at once
    Write-Verbose "Decoded header:"
    $header = ([System.Text.Encoding]::ASCII.GetString([system.convert]::FromBase64String($tokenheader)) | convertfrom-json)

    #Payload
    $tokenPayload = $Token.Split(".")[1].Replace('-', '+').Replace('_', '/')

    #Fix padding as needed, keep adding "=" until string length modulus 4 reaches 0
    while ($tokenPayload.Length % 4) {
        Write-Verbose "Invalid length for a Base-64 char array or string, adding ="
        $tokenPayload += "="
    }

    Write-Verbose "Base64 encoded (padded) payoad: $tokenPayload"

    $tokenByteArray = [System.Convert]::FromBase64String($tokenPayload)


    $tokenArray = ([System.Text.Encoding]::ASCII.GetString($tokenByteArray) | ConvertFrom-Json)

    #Converts $header and $tokenArray from PSCustomObject to Hashtable so they can be added together.
    #I would like to use -AsHashTable in convertfrom-json. This works in pwsh 6 but for some reason Appveyor isnt running tests in pwsh 6.
    $headerAsHash = @{}
    $tokenArrayAsHash = @{}
    $header.psobject.properties | ForEach-Object { $headerAsHash[$_.Name] = $_.Value }
    $tokenArray.psobject.properties | ForEach-Object { $tokenArrayAsHash[$_.Name] = $_.Value }
    $output = $headerAsHash + $tokenArrayAsHash

    Write-Output $output
}
param(
    $SplunkAPIHost = "https://localhost:8089",
    $SplunkURL = "http://localhost:8000",
    $SplunkUser = "admin",
    $SplunkContainerName = "splunkdev-web-1",
    $SplunkClearPassword = "newPassword",
    $MaxWaitSeconds = 60,
    $SplunkNormalUser = "raduser1",
    $LogPath = "$( $env:SPLUNK_HOME )\\var\\log\\splunk\\radware_cwaf_enrichment.log",
    $BuildRoot
)

task UpdateApp SetupVariables, {
    $destinationPath = "$( $env:SPLUNK_HOME )/etc/apps/radware_cwaf_enrichment"
    if (-Not(Test-Path $destinationPath))
    {
        New-Item -Path $destinationPath -ItemType SymbolicLink -Value $SplunkAppPath
    }
    $refreshUri = "$SplunkAPIHost/services/apps/local/radware_cwaf_enrichment?refresh=true"
    Invoke-RestMethod -Uri $refreshUri -Method GET -Credential $Script:SplunkCreds -SkipCertificateCheck
}

task Pester SetupVariables, {
    $PesterConfig.Run.Container = (New-PesterContainer -Path "$( $BuildRoot )/test/*.tests.ps1")
    Invoke-Pester -Configuration $Script:PesterConfig
}

task SetupVariables {
    $Script:SplunkAppPath = (Resolve-Path "$( $BuildRoot )/splunkapp/")
    $Script:FrontendPath = (Resolve-Path "$( $BuildRoot )/frontend/")
    [securestring]$SecureSplunkPassword = ConvertTo-SecureString $SplunkClearPassword -AsPlainText -Force
    [pscredential]$Script:SplunkCreds = New-Object System.Management.Automation.PSCredential ($SplunkUser, $SecureSplunkPassword)
    $Script:RequestSplat = @{
        Method = "GET"
        Uri = "$( $SplunkAPIHost )/services/authentication/users/$( $SplunkUser )"
        SkipCertificateCheck = $true
        Credential = $SplunkCreds
    }

    $Script:PesterConfig = New-PesterConfiguration
    $Script:PesterConfig.TestResult.OutputFormat = "NUnitXml"
    $Script:PesterConfig.TestResult.OutputPath = "$( $BuildRoot )/output/TestResults.xml"
    $Script:PesterConfig.TestResult.Enabled = $True
    $Script:PesterConfig.Output.Verbosity = "Detailed"
}

task EnsureRegularUser SetupVariables, {
    $RequestSplat = @{
        Method = "GET"
        Uri = "$( $SplunkAPIHost )/services/authentication/users/$( $SplunkNormalUser )"
        SkipCertificateCheck = $true
        Credential = $SplunkCreds
    }
    try
    {
        $UserExists = Invoke-RestMethod @RequestSplat
    }
    catch
    {
        $UserExists = $false
    }
    if (-not$UserExists)
    {
        $RequestSplat = @{
            Method = "POST"
            Body = @{
                name = $SplunkNormalUser
                password = $SplunkClearPassword
                roles = "user"
                output_mode = "json"
            }
            Uri = "$( $SplunkAPIHost )/services/authentication/users"
            SkipCertificateCheck = $true
            Credential = $SplunkCreds
        }
        Invoke-RestMethod @RequestSplat
    }
    else
    {
        $RequestSplat = @{
            Method = "POST"
            Body = "&roles=user&roles=radware_cwaf_enrichment_admin"
            Uri = "$( $SplunkAPIHost )/services/authentication/users/$( $SplunkNormalUser )"
            SkipCertificateCheck = $true
            Credential = $SplunkCreds
        }
        Invoke-RestMethod @RequestSplat
    }
}

## Frontend Tasks
task BuildFrontend SetupVariables, {
    $frontendBuildPath = "$( $BuildRoot )/frontend"
    Set-Location $frontendBuildPath
    exec { yarn build }
}

## Docker Tasks
task StartDockerContainer SetupVariables, {
    # Cleanup any local files before pushing to docker
    if (Test-Path "$( $BuildRoot )/splunkapp/local/")
    {
        Remove-Item "$( $BuildRoot )/splunkapp/local/*.conf" -Force
    }
    if (Test-Path "$( $BuildRoot )/splunkapp/metadata/local.meta")
    {
        Remove-Item "$( $BuildRoot )/splunkapp/metadata/local.meta" -Force
    }
    $SplunkContainerStatus = (docker ps --filter "name=$SplunkContainerName" --format "{{.Status}}")
    if ( [string]::IsNullOrEmpty($SplunkContainerStatus))
    {
        exec { docker-compose -f "$( $BuildRoot )/build/docker-compose-dev.yml" -p "splunkdev" up -d }
    }
    else
    {
        Write-Host "Docker container already exists - status $SplunkContainerStatus"
    }
}

task AssertDockerContainersExist {
    $SplunkContainerStatus = (docker ps --filter "name=$SplunkContainerName" --format "{{.Status}}")
    assert ( -not [string]::IsNullOrEmpty($SplunkContainerStatus))
}

task CheckDockerSplunkHealth AssertDockerContainersExist, {
    $LoopCounter = 0
    $ContainerHealth = "starting"
    While (($LoopCounter -lt $MaxWaitSeconds) -and ($ContainerHealth -ilike "*starting*"))
    {
        $ContainerHealth = docker ps --filter "name=$( $SplunkContainerName )" --format "{{.Status}}"
        $LoopCounter += 1
        $ProgressParameters = @{
            Activity = 'Waiting for Splunk to be Available'
            Status = "Progress-> $ContainerHealth"
            PercentComplete = ($LoopCounter / $MaxWaitSeconds * 100)
        }
        Write-Progress @ProgressParameters
        Start-Sleep -Seconds 1
    }
    assert { (docker ps --filter "name=$( $SplunkContainerName )" --format "{{.Status}}") -ne "" }
}

task DockerPester SetupVariables, {
    $dockerTestParams = @{
        SplunkAPIHost = "https://localhost:19089"
        SplunkURL = "http://localhost:9000"
    }
    $pesterContainer = New-PesterContainer -Path "$( $BuildRoot )/test/*.tests.ps1" -Data $dockerTestParams
    $PesterConfig.Run.Container = $pesterContainer
    Invoke-Pester -Container $pesterContainer -Output Detailed
}

task TestInDocker StartDockerContainer, CheckDockerSplunkHealth, DockerPester, {
    Write-Host "TestInDocker Complete"
}

task PackageDownloadApp SetupVariables, {
    $RequestSplat = @{
        Method = "GET"
        Uri = "https://localhost:19089/services/apps/local/radware_cwaf_enrichment/package"
        SkipCertificateCheck = $true
        Credential = $SplunkCreds
    }
    Invoke-RestMethod @RequestSplat

}

task StopDockerContainer {
    exec { docker-compose -f "$( $BuildRoot )/build/docker-compose-dev.yml" -p "splunkdev" down }
    exec { docker-compose -f "$( $BuildRoot )/build/docker-compose-dev.yml" -p "splunkdev" rm }
}


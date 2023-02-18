task ResolveDockerSplunkVariables SetupVariables, {
    $Script:SplunkAPIHost = "https://localhost:$($DockerSplunkAPIPort)"
    $Script:SplunkURL = "http://localhost:8000"
    $Script:RequestSplat = @{
        Method = "GET"
        Uri = "$( $SplunkAPIHost )/services/authentication/users/$( $SplunkUser )"
        SkipCertificateCheck = $true
        Credential = $SplunkCreds
    }
}

task CopyWebConfig ResolveDockerSplunkVariables, {
    exec { docker exec -it splunkdev-web-1 sudo bash -c "echo '[httpServer]' >> /opt/splunk/etc/system/local/server.conf"}
    exec { docker exec -it splunkdev-web-1 sudo bash -c "echo 'crossOriginSharingPolicy = *' >> /opt/splunk/etc/system/local/server.conf"}
}

task CheckSplunkHealth ResolveDockerSplunkVariables, {
    $RequestSplat = @{
        Method = "GET"
        Uri = "$( $SplunkAPIHost )/services/server/info?output_mode=json"
        SkipCertificateCheck = $true
        Credential = $SplunkCreds
    }
    $global:result = Invoke-RestMethod @RequestSplat
    assert($result.entry[0].content.health_info -eq "green")
}

task SetupAuthToken CheckSplunkHealth, {
    $RequestSplat = @{
        Method = "POST"
        Uri = "$( $SplunkAPIHost )/services/admin/Token-auth/tokens_auth?disabled=false&expiration=&output_mode=json"
        SkipCertificateCheck = $true
        Credential = $SplunkCreds
    }
    Invoke-RestMethod @RequestSplat
    
    
    $RequestSplat.Body = @{
        name="admin"
        audience="splunktest"
        expires_on="+60d"
        not_before=""
        output_mode="json"
    }
    $RequestSplat.Uri = "$( $SplunkAPIHost )/services/authorization/tokens"
    $TokenResult = Invoke-RestMethod @RequestSplat
    $JWTToken = $TokenResult.entry[0].content.token
    $TokenPath = "$($FrontendPath)/packages/radware-enrichment-components/src/local_token.js"
    $TokenContent = @{
        splunkdHostUrl = $SplunkAPIHost
        splunkWebUrl = $SplunkURL
        adminToken = $JWTToken
    }
    "let localDevToken = " + ($TokenContent | ConvertTo-Json ) | Out-File $TokenPath -Force
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
        exec {
            docker compose -f "$( $BuildRoot )/build/docker-compose-dev.yml" `
                        -p "splunkdev" up -d
        }
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
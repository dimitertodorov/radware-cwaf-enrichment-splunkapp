param(
    $SplunkAPIHost = "https://localhost:8089",
    $SplunkURL = "http://localhost:8000",
    $SplunkUser = "admin",
    $SplunkNormalUser = "raduser1",
    $SplunkAppName = "radware_cwaf_enrichment",
    $SplunkContainerName = "splunkdev-web-1",
    $SplunkClearPassword = "newPassword",
    $MaxWaitSeconds = 60,
    $BuildRoot = $BuildRoot,
    ## Docker Variables
    $DockerSplunkImage = "splunk/splunk:9.0.3",
    $DockerSplunkHostname = "splunkdev001",
    $DockerSplunkWebPort = "9000",
    $DockerSplunkAPIPort = "19089",
    $DockerSplunkHECPort = "19088",
    ## Splunkbase Variables
    $MaxWaitAppInspect = 300
)

task UpdateApp SetupVariables, {
    $destinationPath = "$( $env:SPLUNK_HOME )/etc/apps/$( $SplunkAppName )"
    if (-Not(Test-Path $destinationPath)) {
        New-Item -Path $destinationPath -ItemType SymbolicLink -Value $SplunkAppPath
    }
    $refreshUri = "$SplunkAPIHost/services/apps/local/$( $SplunkAppName )?refresh=true"
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
        Method               = "GET"
        Uri                  = "$( $SplunkAPIHost )/services/authentication/users/$( $SplunkUser )"
        SkipCertificateCheck = $true
        Credential           = $SplunkCreds
    }

    $Script:PesterConfig = New-PesterConfiguration
    $Script:PesterConfig.TestResult.OutputFormat = "NUnitXml"
    $Script:PesterConfig.TestResult.OutputPath = "$( $BuildRoot )/output/TestResults.xml"
    $Script:PesterConfig.TestResult.Enabled = $True
    $Script:PesterConfig.Output.Verbosity = "Detailed"
}

task EnsureRegularUser SetupVariables, {
    $RequestSplat = @{
        Method               = "GET"
        Uri                  = "$( $SplunkAPIHost )/services/authentication/users/$( $SplunkNormalUser )"
        SkipCertificateCheck = $true
        Credential           = $SplunkCreds
    }
    try {
        $UserExists = Invoke-RestMethod @RequestSplat
    }
    catch {
        $UserExists = $false
    }
    if (-not$UserExists) {
        $RequestSplat = @{
            Method               = "POST"
            Body                 = @{
                name        = $SplunkNormalUser
                password    = $SplunkClearPassword
                roles       = "user"
                output_mode = "json"
            }
            Uri                  = "$( $SplunkAPIHost )/services/authentication/users"
            SkipCertificateCheck = $true
            Credential           = $SplunkCreds
        }
        Invoke-RestMethod @RequestSplat
    }
    else {
        $RequestSplat = @{
            Method               = "POST"
            Body                 = "&roles=user&roles=radware_cwaf_enrichment_admin"
            Uri                  = "$( $SplunkAPIHost )/services/authentication/users/$( $SplunkNormalUser )"
            SkipCertificateCheck = $true
            Credential           = $SplunkCreds
        }
        Invoke-RestMethod @RequestSplat
    }
}

## Frontend Tasks
task BuildFrontend SetupVariables, {
    $frontendBuildPath = "$( $BuildRoot )/frontend"
    Set-Location $frontendBuildPath
    exec {
        yarn install
    }
    exec {
        yarn build
    }
}

task StartDemoApp {
    $demoPath = "$( $BuildRoot )/frontend/packages/radware-enrichment-components"
    Set-Location $demoPath
    exec { yarn start:demo }
}

## Packaging Tasks
task GetVersion {
    $ManifestProps = ((Get-Content -Raw "./splunkapp/app.manifest") | ConvertFrom-JSON)
    $Script:AppVersion = $ManifestProps.info.id.version
    $AppConfVersion = (Select-String -Path "./splunkapp/default/app.conf" -Pattern "^version = ").Line
    $AppConfVersion = $AppConfVersion -replace "version|\s|=", ""

    assert ($AppConfVersion -eq $AppVersion) "Version in app.conf ($AppConfVersion) does not match manifest version ($AppVersion)"

    $Script:PackageFileName = "$( $SplunkAppName )-$( $AppVersion ).tar.gz"
    $Script:AppStageDirectory = "$( $BuildRoot )/output/$( $SplunkAppName )"
}

task BuildSplunkAppTgz GetVersion, {
    #Get-ChildItem -Path "./splunkapp" -Recurse -Filter "__pycache__" | Remove-Item -Recurse -Force
    if (Test-Path -Path $AppStageDirectory) {
        Remove-Item -Path $AppStageDirectory -Recurse -Force
    }
    New-Item -Type Directory -Path $AppStageDirectory
    Copy-Item -Path "$( $BuildRoot )/splunkapp/*" -Destination $AppStageDirectory -Recurse
    $RemoveItems = @(
        "local/"
        "metadata/local.meta"
    )
    foreach ($i in $RemoveItems) {
        $iPath = Join-Path $AppStageDirectory $i
        if (Test-Path $iPath) {
            Remove-Item -Path $iPath -Recurse -Force
        }
    }
    Get-ChildItem -Path $AppStageDirectory -Recurse -Filter "__pycache__" | Remove-Item -Recurse -Force

    Set-Location "$( $BuildRoot )/output/"
    exec { tar --exclude=".*" -czf "$($BuildRoot)/$PackageFileName"  $SplunkAppName }
    Set-Location $BuildRoot
    $PackagePath = (Resolve-Path -Path "$($BuildRoot)/$PackageFileName").Path
    Write-Output "##vso[task.setvariable variable=SplunkAppPackagePath]$PackagePath"
}

. (Resolve-Path "$( $BuildRoot )/build/SplunkHelpers.build.ps1")



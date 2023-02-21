Param (
    $SplunkAPIHost = "https://localhost:8089",
    $SplunkURL = "http://localhost:8000",
    $SplunkUser = "admin",
    $SplunkClearPassword = "newPassword",
    $MaxWaitSeconds = 60,
    $SplunkNormalUser = "raduser1",
    $SplunkLocalPath = "splunkapp/local"
)

Describe "SplunkApp - PowerShell Tests - Splunkd Host: $SplunkAPIHost" {
    BeforeAll {
        if (Test-Path $SplunkLocalPath)
        {
            Remove-Item "$SplunkLocalPath/*.conf" -Force
        }
        if (Test-Path "splunkapp/metadata/local.meta")
        {
            Remove-Item "splunkapp/metadata/local.meta" -Force
        }

        [securestring]$SecureSplunkPassword = ConvertTo-SecureString $SplunkClearPassword -AsPlainText -Force
        [pscredential]$Script:SplunkCreds = New-Object System.Management.Automation.PSCredential ($SplunkUser, $SecureSplunkPassword)
        [pscredential]$Script:SplunkRegularCreds = New-Object System.Management.Automation.PSCredential ($SplunkNormalUser, $SecureSplunkPassword)

        $BaseRequest = @{
            Method = "POST"
            Uri = "$( $SplunkAPIHost )/servicesNS/nobody/radware_cwaf_enrichment/radware_cwaf_enrichment/radware_cwaf_enrichment_config/settings"
            SkipCertificateCheck = $true
            Credential = $SplunkCreds
        }

        function Refresh-SplunkApp
        {

            $refreshUri = "$SplunkAPIHost/services/apps/local/radware_cwaf_enrichment?refresh=true"
            Invoke-RestMethod -Uri $refreshUri -Method GET -Credential $Script:SplunkCreds -SkipCertificateCheck
        }

        function Invoke-SplunkSearchCommand
        {
            Param(
                $SearchQuery = '',
                [pscredential]$Credentials = $SplunkRegularCreds,
                $SplunkAPIHost = $SplunkAPIHost,
                $MaxWaitSeconds = $MaxWaitSeconds
            )
            $SearchResults = 0
            $LoopCounter = 0
            $SearchParams = @{
                search = $SearchQuery
                output_mode = 'json'
                earliest_time = '-5m'
                exec_mode = 'oneshot'
            }
            While (($SearchResults -eq 0) -and ($LoopCounter -lt $MaxWaitSeconds))
            {
                $RequestSplat = @{
                    Method = "POST"
                    Body = $SearchParams
                    Uri = "$( $SplunkAPIHost )/services/search/jobs"
                    SkipCertificateCheck = $true
                    Credential = $Credentials
                }
                $SplunkSearchResults = Invoke-RestMethod @RequestSplat
                $LoopCounter += 1
                $SearchResults = $SplunkSearchResults.results.Count
                Start-Sleep -Seconds 1
            }
            Write-Verbose "Splunk Search Completed - $( $SearchResults ) Events Found"
            return $SplunkSearchResults
        }

        function Ensure-NormalUser
        {

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
                    Body = "name=$( $SplunkNormalUser )&roles=user&roles=radware_cwaf_enrichment_admin&password=$( $SplunkClearPassword )&output_mode=json"
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
    }

    Describe 'test radware_cwaf_enrichment_config/settings config' {
        BeforeAll {
            Ensure-NormalUser
            Refresh-SplunkApp
        }

        Describe 'Updating Log Level' {
            It 'Updates the Log Level to INFO' {
                $BaseRequest.Body = @{
                    output_mode = "json"
                    "log_level" = "DEBUG"
                }
                $result = Invoke-RestMethod @BaseRequest
                $result.entry[0].content.log_level | Should -Be "DEBUG"
            }

            It 'Updates the Log Level to and invalid option should fail' {
                $BaseRequest.Body = @{
                    output_mode = "json"
                    "log_level" = "XXCV"
                }
                try
                {
                    Invoke-RestMethod @BaseRequest
                }
                catch
                {
                    $_.Exception.Response.StatusCode | Should -Be 400
                    $_.ErrorDetails.Message | Should -BeLike "*The value of XXCV  is not in permitted options*"
                }
            }
        }


        Describe 'Credential Methods' {
            It 'Adds Should raise an error when mandatory parameter is not provided for a new user' {
                $BaseRequest.Body = @{
                    output_mode = "json"
                    "credential.create.username" = "user123"
                    "credential.create.action" = "create"
                }
                try
                {
                    Invoke-RestMethod @BaseRequest
                }
                catch
                {
                    $_.Exception.Response.StatusCode | Should -Be 400
                    $_.ErrorDetails.Message | Should -BeLike "*Missing required parameter*"
                }
            }

            It 'Should Successfully Create a new User' {
                $BaseRequest.Body = @{
                    output_mode = "json"
                    "credential.create.username" = "mock_user_radware_prod"
                    "credential.create.name" = "mock_radware_prod"
                    "credential.create.password" = "xxx"
                    "credential.create.action" = "create"
                }
                $result = Invoke-RestMethod @BaseRequest
                $result.entry[0].content | Should -Not -BeNullOrEmpty
            }

            It 'Should successfully update an existing User' {
                $Uname = (New-TimeSpan -Start (Get-Date "01/01/1970") -End (Get-Date)).TotalSeconds
                $BaseRequest.Body = @{
                    output_mode = "json"
                    "credential.1.username" = "mock_$Uname"
                    "credential.1.password" = "mock_$Uname"
                    "credential.1.action" = "update"
                }
                $result = Invoke-RestMethod @BaseRequest
                $result.entry[0].content.'credential.1.username' | Should -Be "mock_$Uname"
            }

            It 'Should not update an existing Username if no action is specified' {
                $Uname = (New-TimeSpan -Start (Get-Date "01/01/1970") -End (Get-Date)).TotalSeconds
                $BaseRequest.Body = @{
                    output_mode = "json"
                    "credential.1.username" = $Uname
                }
                $result = Invoke-RestMethod @BaseRequest
                $result.entry[0].content.'credential.1.username' | Should -Not -Be $Uname
            }

            It 'Should Successfully Delete a User and their passwords' {
                $BaseRequest.Body = @{
                    output_mode = "json"
                    "credential.1.action" = "delete"
                }
                $result = Invoke-RestMethod @BaseRequest
                $result.entry[0].content.'credential.1.password' | Should -BeNullOrEmpty
            }
        }
    }
    Describe 'Test Generating Commands' {
        BeforeAll {
            Ensure-NormalUser
            Refresh-SplunkApp
            $BaseRequest.Body = @{
                output_mode = "json"
                "credential.create.username" = "mock_user_radware_prod"
                "credential.create.name" = "mock_radware_prod"
                "credential.create.password" = "fake_password"
                "credential.create.action" = "create"
            }
            $result = Invoke-RestMethod @BaseRequest
        }

        It 'Should execute radwarecwaflistremote command ' {
            $result = Invoke-SplunkSearchCommand -SearchQuery " | radwarecwaflistremote"
            $result.results.Count | Should -BeExactly 3
        }

        It 'Should execute radwarecwafimportremote command ' {
            $result = Invoke-SplunkSearchCommand -SearchQuery " | radwarecwafimportremote"
            $result.results.Count | Should -BeExactly 4
        }

        It 'Should execute radwarecwafdeletelocal command ' {
            $result = Invoke-SplunkSearchCommand -SearchQuery " | radwarecwafdeletelocal"
            $result.results.Count | Should -BeExactly 1
        }

        AfterAll {
            $BaseRequest.Body = @{
                output_mode = "json"
                "credential.1.action" = "delete"
            }
            $result = Invoke-RestMethod @BaseRequest
        }
    }
}


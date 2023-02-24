Param (
    $SplunkAPIHost = "https://localhost:8089",
    $SplunkURL = "http://localhost:8000",
    $SplunkUser = "admin",
    $SplunkClearPassword = "newPassword",
    $MaxWaitSeconds = 60,
    $SplunkNormalUser = "raduser1",
    $RunningHeadless = $false,
    $DemoTest = $true
)
Describe "SplunkApp radware_cwaf_enrichment Frontend" {
    BeforeAll {
        $EnvironmentParamArray = @( "SplunkAPIHost", "SplunkURL", "SplunkUser", "SplunkClearPassword", "SplunkNormalUser", "RunningHeadless")
        foreach ($EnvironmentParam in $EnvironmentParamArray)
        {
            if (Test-Path env:$EnvironmentParam)
            {
                Write-Host "Setting $EnvironmentParam from environment variable."
                Set-Variable -Scope Script -Name $EnvironmentParam -Value (Get-Item env:$EnvironmentParam).Value
                Set-Variable -Scope Global -Name $EnvironmentParam -Value (Get-Item env:$EnvironmentParam).Value
                Set-Variable -Scope Local -Name $EnvironmentParam -Value (Get-Item env:$EnvironmentParam).Value
            }
        }
        function Load-LocalSelenium
        {
            $Script:SeleniumPath = Resolve-Path -Path "$PSScriptRoot\..\..\build\selenium"
            Write-Host "$( $Script:SeleniumPath )\WebDriver.dll"
            [System.Reflection.Assembly]::LoadFrom("$( $Script:SeleniumPath )\WebDriver.dll")
        }

        function Check-ElementExists
        {
            Param(
                [parameter(Position = 0, Mandatory = $true)]$XPathOrId
            )
            try
            {
                return $WebDriver.FindElement([OpenQA.Selenium.By]::Xpath($XPathOrId));
            }
            catch [OpenQA.Selenium.NoSuchElementException]
            {
                try
                {
                    return $WebDriver.FindElement([OpenQA.Selenium.By]::Id($XPathOrId))
                }
                catch [OpenQA.Selenium.NoSuchElementException]
                {
                    return $false
                }
            }
        }

        function Wait-Element
        {
            Param(
                [parameter(Position = 0, Mandatory = $true)]$XPathOrId,
                [parameter(Position = 1, Mandatory = $false)]$Timeout = 10,
                [Switch]$Click = $false,
                [Switch]$WaitForDisappear
            )
            $StopLoop = $false
            $RetryEnd = $Timeout * 1000 / 250
            do
            {
                $element = (Check-ElementExists -XPathOrId $XPathOrId)
                if ($element)
                {
                    if($WaitForDisappear){
                        $StopLoop = $false
                    }else{
                        $StopLoop = $true
                        if ($Click)
                        {
                            $element.Click()
                            return
                        }
                        return $element
                    }
                }else{
                    if($WaitForDisappear){
                        $StopLoop = $true
                    }
                }
                if ($RetryCount -gt $RetryEnd)
                {
                    Write-Error "Waiting for $XPathOrId FAILED"
                    $StopLoop = $true

                }
                $RetryCount++
                Start-Sleep -Milliseconds 250
            } While ($StopLoop -eq $false )
        }

        function Set-InputContent
        {
            Param(
                [parameter(Position = 0)]$XPathOrId,
                [parameter(Position = 1)]$Text
            )
            $el = Check-ElementExists -XPathOrId $XPathOrId
            $el.Clear()
            $el.SendKeys($Text)
        }

        function Start-WebDriver
        {
            $Options = New-Object OpenQA.Selenium.Chrome.ChromeOptions
            #$Options.AddArgument("--headless")
            $Options.AddArgument("--log-level=3")
            $Options.AddArguments("--disable-gpu", "--window-size=1920,1200", "--ignore-certificate-errors", "--disable-extensions", "--no-sandbox", "--disable-dev-shm-usage") | Out-Null
            if ($WebDriver)
            {
                if (-not$WebDriver.CurrentWindowHandle)
                {
                    $global:WebDriver = new-object OpenQA.Selenium.Chrome.ChromeDriver($Options)
                }
            }
            else
            {
                $global:WebDriver = new-object OpenQA.Selenium.Chrome.ChromeDriver($Options)
            }
        }

        function Close-WebDriver
        {
            if ($WebDriver)
            {
                Write-Host "Closing Driver"
                if ($WebDriver.CurrentWindowHandle)
                {
                    $WebDriver.Close()
                }
            }
        }

        function Login-SeleniumSplunk
        {
            Write-Host "Logging in to Splunk @ $SplunkURL"
            $WebDriver.Navigate().GoToUrl($SplunkURL)
            if (Check-ElementExists -XPathOrId "//input[@id='username']")
            {
                Set-InputContent -XPathOrId "username" -Text $SplunkUser
                Set-InputContent -XPathOrId "password" -Text $SplunkClearPassword
                $WebDriver.FindElement([OpenQA.Selenium.By]::XPath("//input[@type='submit' and @value='Sign In']")).Click()
            }
            elseif ($WebDriver.Url -like "*/en-US/app/launcher/home")
            {
                Write-Host "Already Logged In"
            }
        }
    }

    # AfterAll {
    #     if($WebDriver) {
    #         $WebDriver.Dispose()
    #     }
    # }

    if (-not$DemoTest)
    {
        Describe 'basic Splunk acessibility' {
            BeforeAll {
                Load-LocalSelenium
                Start-WebDriver
            }

            It 'logs into Splunk successfully and the app is visible' -Tag 'RunsInSplunk' {
                Login-SeleniumSplunk
                Wait-Element -XPathOrId "//a[@aria-label='Radware CWAF Data Import for Splunk']"
                (Check-ElementExists -XPathOrId "//a[@aria-label='Radware CWAF Data Import for Splunk']") | Should -Not -BeNullOrEmpty
            }

            AfterAll {
                Close-WebDriver
            }
        }
    }

    Describe 'radware_cwaf_enrichment react app test' {
        BeforeAll {
            Load-LocalSelenium
            Start-WebDriver
            if (-not$DemoTest)
            {
                Login-SeleniumSplunk
                Wait-Element -XPathOrId "//a[@aria-label='Radware CWAF Data Import for Splunk']"
            }
        }

        It 'successfully loads the start page' {
            if (-Not$DemoTest)
            {
                $WebDriver.Navigate().GoToUrl("$SplunkURL/en-US/app/radware_cwaf_enrichment/start")
            }
            else
            {
                $WebDriver.Navigate().GoToUrl("$SplunkURL")
            }
            Wait-Element -XPathOrId "//button[@title='Setup']"
            $SetupButton = Check-ElementExists -XPathOrId "//button[@title='Setup']"
            $SetupButton | Should -Not -BeNullOrEmpty
        }

        It 'successfully loads the setup tab' {
            $SetupButton = Check-ElementExists -XPathOrId "//button[@title='Setup']"
            $SetupButton | Should -Not -BeNullOrEmpty
            $SetupButton.Click()
        }

        It 'successfully loads the manage objects tab' {
            $TabButton = Check-ElementExists -XPathOrId "//button[@title='Manage Objects']"
            $TabButton | Should -Not -BeNullOrEmpty
            $TabButton.Click()
        }

        It 'successfully loads the about tab' {
            $TabButton = Check-ElementExists -XPathOrId "//button[@title='About']"
            $TabButton | Should -Not -BeNullOrEmpty
            $TabButton.Click()
        }

        It 'successfully loads the logs tab' {
            $TabButton = Check-ElementExists -XPathOrId "//button[@title='Logs']"
            $TabButton | Should -Not -BeNullOrEmpty
            $TabButton.Click()
        }

        Describe 'settings page' {
            BeforeAll {
                $Script:CredentialIndex = $( Get-Random -Minimum 100 -Maximum 999 )
                $Script:CredentialName = "SelTest$( $CredentialIndex )"
                $Script:CredentialUsername = "mock_sel$( $Script:CredentialIndex )"
            }
            It 'successfully changes the log level' {
                Wait-Element -XPathOrId "//button[@title='Setup']" -Click
                $SelectButton = Wait-Element -XPathOrId "//button[@data-test-id='log-level-select']"
                $SelectButton.Click()
                $SelectOption = Wait-Element -XPathOrId "//button[@data-test-id='log-level-select-option-ERROR']"
                $SelectOption.Click()
                $SaveButton = Wait-Element -XPathOrId "//button[@data-test-id='save-settings-button']"
                $SaveButton.Click()
            }

            It 'adds a new credential' {
                Wait-Element -XPathOrId "//button[@title='Setup']" -Click
                Wait-Element -XPathOrId "//button[@data-test-id='add-new-credential-button']" -Click
                Wait-Element -XPathOrId "//div[@data-test-id='credential-credential_name']/span/input"
                Set-InputContent -XPathOrId "//div[@data-test-id='credential-credential_name']/span/input" `
                    -Text $CredentialName
                Set-InputContent -XPathOrId "//div[@data-test-id='credential-username']/span/input" `
                    -Text $CredentialUsername
                Set-InputContent -XPathOrId "//div[@data-test-id='credential-password']/span/input" `
                    -Text "password"
                Set-InputContent -XPathOrId "//div[@data-test-id='credential-password_confirm']/span/input" `
                    -Text "password"
                Wait-Element -XPathOrId "//button[@data-test-id='credential-save-button']" -Click
                Wait-Element -XPathOrId "//td[@data-test='cell' and text()='$($CredentialName)']"
            }

            It 'Deletes a credential' {
                Wait-Element -XPathOrId "//td[@data-test='cell' and text()='$($CredentialName)']"
                Wait-Element -XPathOrId "//button[@data-test-id = 'delete-$($CredentialName)-button']" -Click
                Wait-Element -XPathOrId "//button[@data-test-id = 'confirm-delete-credential-$($CredentialName)-button']" -Click
                Wait-Element -XPathOrId "//td[@data-test='cell' and text()='$($CredentialName)']" -WaitForDisappear
            }
        }

        # AfterAll {
        #     Close-WebDriver
        # }
    }
}
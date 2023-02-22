Param (
    $SplunkAPIHost = "https://localhost:8089",
    $SplunkURL = "http://localhost:8000",
    $SplunkUser = "admin",
    $SplunkClearPassword = "newPassword",
    $MaxWaitSeconds = 60,
    $SplunkNormalUser = "raduser1",
    $SplunkLocalPath = "splunkapp/local",
    $RunningHeadless = $true
)
Describe "Selenium Testing Setup $SplunkURL" {
    BeforeAll {
        function Load-LocalSelenium {
            $Script:SeleniumPath = Resolve-Path -Path "$PSScriptRoot\..\..\build\selenium"
            [System.Reflection.Assembly]::LoadFrom("$($seleniumPath)\WebDriver.dll")
        }
        
        function Check-ElementExists {
            Param(
                [parameter(Position = 0, Mandatory = $true)]$XPathOrId
            )
            try {
                return $WebDriver.FindElement([OpenQA.Selenium.By]::Xpath($XPathOrId));
            }
            catch [OpenQA.Selenium.NoSuchElementException] {
                try {
                    return $WebDriver.FindElement([OpenQA.Selenium.By]::Id($XPathOrId))
                }
                catch [OpenQA.Selenium.NoSuchElementException] {
                    return $false
                }
            }
        }
        
        function Wait-Element {
            Param(
                [parameter(Position = 0, Mandatory = $true)]$XPathOrId,
                [parameter(Position = 1, Mandatory = $false)]$Timeout = 30
            )
            $StopLoop = $false
            $RetryEnd = $Timeout * 1000 / 250
            do {
                if (Check-ElementExists -XPathOrId $XPathOrId) {
                    $StopLoop = $true
                }
                if ($RetryCount -gt $RetryEnd) {
                    Write-Error "Waiting for $XPathOrId FAILED"
                    $StopLoop = $true
        
                }
                Start-Sleep -Milliseconds 250
            }While ($StopLoop -eq $false )
        }
        
        function Select-Dropdown {
            Param(
                [parameter(Position = 0)]$Id,
                [parameter(Position = 1)]$Text
            ) 
            $el = $WebDriver.FindElement([OpenQA.Selenium.By]::Id($Id))
            $ddl = new-object OpenQA.Selenium.Support.UI.SelectElement -ArgumentList $el
            $ddl.SelectByText($Text)
        }
        
        function Set-InputContent {
            Param(
                [parameter(Position = 0)]$Id,
                [parameter(Position = 1)]$Text
            )
            $el = $WebDriver.FindElement([OpenQA.Selenium.By]::Id($Id))
            $el.Clear()
            $el.SendKeys($Text)
        }

        function Start-WebDriver {
            $Options = New-Object OpenQA.Selenium.Chrome.ChromeOptions
            if($RunningHeadless) {
                $Options.AddArguments("--headless")
            }
            $Options.AddArgument("--log-level=3")
            $Options.AddArguments("--disable-gpu", "--window-size=1920,1200","--ignore-certificate-errors","--disable-extensions","--no-sandbox","--disable-dev-shm-usage") | Out-Null
            if ($WebDriver) {
                if (-not $WebDriver.CurrentWindowHandle) {
                    $global:WebDriver = new-object OpenQA.Selenium.Chrome.ChromeDriver($Options)
                }
            }
            else {
                $global:WebDriver = new-object OpenQA.Selenium.Chrome.ChromeDriver($Options)
            }
        }

        function Close-WebDriver {
            if ($WebDriver) {
                Write-Host "Closing Driver"
                if ($WebDriver.CurrentWindowHandle) {
                    $WebDriver.Close()
                }
            }
        }

        function Selenium-LoginSplunk {
            $WebDriver.Navigate().GoToUrl($SplunkURL)
            if (Check-ElementExists -XPathOrId "//input[@id='username']") {
                Set-InputContent -Id "username" -Text $SplunkUser
                Set-InputContent -Id "password" -Text $SplunkClearPassword
                $WebDriver.FindElement([OpenQA.Selenium.By]::XPath("//input[@type='submit' and @value='Sign In']")).Click()
            }
            elseif ($WebDriver.Url -like "*/en-US/app/launcher/home") {
                Write-Host "Already Logged In"
            }
        }
    }

    Describe 'Basic Splunk Functionality' {
        BeforeAll {
            Load-LocalSelenium
            Start-WebDriver
        }

        It 'Logs into Splunk Successfully and the app is visible' {
            Selenium-LoginSplunk
            Wait-Element -XPathOrId "//a[@aria-label='Radware CWAF Data Import for Splunk']"
            (Check-ElementExists -XPathOrId "//a[@aria-label='Radware CWAF Data Import for Splunk']") | Should -Not -BeNullOrEmpty
        }

        AfterAll {
            Close-WebDriver
        }
    }

    Describe 'Test SplunkApp Frontend' {
        BeforeAll {
            Load-LocalSelenium
            Start-WebDriver
            Selenium-LoginSplunk
            Wait-Element -XPathOrId "//a[@aria-label='Radware CWAF Data Import for Splunk']"
        }

        It 'Successfully loads the start page' {
            $WebDriver.Navigate().GoToUrl("$SplunkURL/en-US/app/radware_cwaf_enrichment/start")
            Wait-Element -XPathOrId "//button[@title='Setup']"
            $SetupButton = Check-ElementExists -XPathOrId "//button[@title='Setup']"
            $SetupButton | Should -Not -BeNullOrEmpty
        }

        It 'Loads the setup tab correctly' {
            $SetupButton = Check-ElementExists -XPathOrId "//button[@title='Setup']"
            $SetupButton | Should -Not -BeNullOrEmpty
            $SetupButton.Click()
        }

        It 'Loads the manage objects tab correctly' {
            $TabButton = Check-ElementExists -XPathOrId "//button[@title='Manage Objects']"
            $TabButton | Should -Not -BeNullOrEmpty
            $TabButton.Click()
        }

        It 'Loads the about tab correctly' {
            $TabButton = Check-ElementExists -XPathOrId "//button[@title='About']"
            $TabButton | Should -Not -BeNullOrEmpty
            $TabButton.Click()
        }

        It 'Loads the logs tab correctly' {
            $TabButton = Check-ElementExists -XPathOrId "//button[@title='Logs']"
            $TabButton | Should -Not -BeNullOrEmpty
            $TabButton.Click()
        }

        AfterAll {
            Close-WebDriver
        }
    }
}
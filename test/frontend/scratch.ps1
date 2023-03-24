$pp = $WebDriver.FindElement([OpenQA.Selenium.By]::Xpath("//input[@data-test-id='credential-credential_name']"))
$pp.Click()
$opt = $WebDriver.FindElement([OpenQA.Selenium.By]::Xpath("//button[@data-test-id='log-level-select-option-ERROR']"))
$opt.Click()

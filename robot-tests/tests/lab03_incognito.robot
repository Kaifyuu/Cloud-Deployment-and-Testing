*** Settings ***
Documentation    Lab 3: Custom Keyword - Chrome Incognito Mode
...              955108 Software Deployment - Software Testing
Library          SeleniumLibrary

*** Variables ***
${URL}              https://www.saucedemo.com/
${USERNAME}         standard_user
${PASSWORD}         secret_sauce

*** Keywords ***
Open Chrome Incognito
    [Documentation]    Opens Chrome in incognito mode with password alerts bypassed
    [Arguments]    ${url}
    ${chrome_options}=    Evaluate    sys.modules['selenium.webdriver'].ChromeOptions()    sys
    Call Method    ${chrome_options}    add_argument    --incognito
    Call Method    ${chrome_options}    add_argument    --start-maximized
    Call Method    ${chrome_options}    add_argument    --disable-save-password-bubble
    Call Method    ${chrome_options}    add_experimental_option    excludeSwitches    ${["enable-automation"]}
    Create Webdriver    Chrome    options=${chrome_options}
    Go To    ${url}

*** Test Cases ***
Login In Incognito Mode
    [Documentation]    Test login using Chrome incognito to bypass password manager alerts
    [Tags]    UI    Positive
    Open Chrome Incognito    ${URL}
    Input Text    id:user-name    ${USERNAME}
    Input Text    id:password    ${PASSWORD}
    Click Button    id:login-button
    Wait Until Page Contains Element    css:.title
    Element Text Should Be    css:.title    Products
    Log    Incognito login successful
    [Teardown]    Close All Browsers

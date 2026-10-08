*** Settings ***
Documentation    Lab 8: Suite & Test Setup/Teardown
...              955108 Software Deployment - Software Testing
Library          SeleniumLibrary
Suite Setup      Open Browser    https://www.saucedemo.com/    chrome
Suite Teardown   Close Browser
Test Teardown    Capture Page Screenshot

*** Test Cases ***
Setup Demo - Homepage Loaded
    [Documentation]    Verify page loads (browser opened by Suite Setup)
    [Tags]    UI    Setup
    Title Should Be    Swag Labs
    Log    Suite Setup opened browser, page is ready

Setup Demo - Login Form Visible
    [Documentation]    Verify login elements exist
    [Tags]    UI    Setup
    Page Should Contain Element    id:user-name
    Page Should Contain Element    id:password
    Page Should Contain Element    id:login-button
    Log    Login form elements verified

Setup Demo - Page Title Check
    [Documentation]    Verify page title
    [Tags]    UI    Setup
    ${title}=    Get Title
    Should Be Equal    ${title}    Swag Labs
    Log    Page title is correct: ${title}

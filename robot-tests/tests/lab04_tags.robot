*** Settings ***
Documentation    Lab 4: Test Filtering with Tags
...              955108 Software Deployment - Software Testing
...              Run with: robot -d results -i Smoke tests/lab04_tags.robot
...              Or: robot -d results -i SmokeANDPositive tests/lab04_tags.robot
Library          SeleniumLibrary

*** Variables ***
${URL}              https://www.saucedemo.com/
${BROWSER}          chrome

*** Test Cases ***
Smoke Test - Homepage Loads
    [Documentation]    Verify the homepage loads correctly
    [Tags]    Smoke    Positive    Critical
    Open Browser    ${URL}    ${BROWSER}
    Title Should Be    Swag Labs
    Page Should Contain Element    id:login-button
    Log    Homepage loaded successfully
    [Teardown]    Close Browser

Smoke Test - Login Form Elements
    [Documentation]    Verify login form elements exist
    [Tags]    Smoke    Positive
    Open Browser    ${URL}    ${BROWSER}
    Page Should Contain Element    id:user-name
    Page Should Contain Element    id:password
    Page Should Contain Element    id:login-button
    Log    All login form elements present
    [Teardown]    Close Browser

Regression Test - Locked Out User
    [Documentation]    Verify locked out user gets error message
    [Tags]    Regression    Negative
    Open Browser    ${URL}    ${BROWSER}
    Input Text    id:user-name    locked_out_user
    Input Text    id:password    secret_sauce
    Click Button    id:login-button
    Wait Until Page Contains Element    css:[data-test="error"]
    Element Should Contain    css:[data-test="error"]    locked out
    Log    Locked out user correctly blocked
    [Teardown]    Close Browser

API Smoke Test - Simple Check
    [Documentation]    Placeholder for API smoke test
    [Tags]    Smoke    API
    Log    API smoke test placeholder
    Should Be True    ${TRUE}

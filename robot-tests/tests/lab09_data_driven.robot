*** Settings ***
Documentation    Lab 9: Data-Driven Testing with CSV
...              955108 Software Deployment - Software Testing
...              Uses DataDriver library to loop through login credentials
Library          SeleniumLibrary
Library          DataDriver    file=../data/users.csv    dialect=unix
Test Template    Login With User Credentials

*** Keywords ***
Login With User Credentials
    [Arguments]    ${username}    ${password}    ${expected_result}
    Open Browser    https://www.saucedemo.com/    chrome
    Input Text    id:user-name    ${username}
    Input Text    id:password    ${password}
    Click Button    id:login-button
    Run Keyword If    '${expected_result}' == 'pass'
    ...    Wait Until Page Contains Element    css:.title    timeout=5s
    Run Keyword If    '${expected_result}' == 'fail'
    ...    Wait Until Page Contains Element    css:[data-test="error"]    timeout=5s
    Log    Test for ${username}: expected ${expected_result}
    [Teardown]    Close Browser

*** Test Cases ***
Login Test With ${username} and ${password} expecting ${expected_result}
    [Tags]    DataDriven    UI

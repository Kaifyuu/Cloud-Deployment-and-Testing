*** Settings ***
Documentation    Lab 2: SauceDemo Login/Logout Test
...              955108 Software Deployment - Software Testing
Library          SeleniumLibrary

*** Variables ***
${URL}              https://www.saucedemo.com/
${BROWSER}          chrome
${USERNAME}         standard_user
${PASSWORD}         secret_sauce

*** Test Cases ***
Valid Login Test
    [Documentation]    Test login with valid credentials
    [Tags]    Smoke    UI    Positive
    Open Browser    ${URL}    ${BROWSER}
    Input Text    id:user-name    ${USERNAME}
    Input Text    id:password    ${PASSWORD}
    Click Button    id:login-button
    Wait Until Page Contains Element    css:.title
    Element Text Should Be    css:.title    Products
    Log    Login successful - Products page displayed
    [Teardown]    Close Browser

Valid Logout Test
    [Documentation]    Test logout after successful login
    [Tags]    Smoke    UI    Positive
    Open Browser    ${URL}    ${BROWSER}
    Input Text    id:user-name    ${USERNAME}
    Input Text    id:password    ${PASSWORD}
    Click Button    id:login-button
    Wait Until Page Contains Element    css:.title
    Click Button    id:react-burger-menu-btn
    Wait Until Element Is Visible    id:logout_sidebar_link
    Click Element    id:logout_sidebar_link
    Wait Until Page Contains Element    id:login-button
    Log    Logout successful - Login page displayed
    [Teardown]    Close Browser

Invalid Login Test
    [Documentation]    Test login with invalid credentials
    [Tags]    UI    Negative
    Open Browser    ${URL}    ${BROWSER}
    Input Text    id:user-name    invalid_user
    Input Text    id:password    wrong_password
    Click Button    id:login-button
    Wait Until Page Contains Element    css:[data-test="error"]
    Element Should Contain    css:[data-test="error"]    Username and password do not match
    Log    Invalid login correctly rejected
    [Teardown]    Close Browser

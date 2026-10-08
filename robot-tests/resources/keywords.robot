*** Settings ***
Documentation    Reusable Keywords for SauceDemo Tests
...              955108 Software Deployment - Software Testing Lab 5
Library          SeleniumLibrary

*** Variables ***
${SAUCEDEMO_URL}    https://www.saucedemo.com/
${BROWSER}          chrome

*** Keywords ***
Open SauceDemo In Chrome
    [Documentation]    Opens the SauceDemo website in Chrome
    Open Browser    ${SAUCEDEMO_URL}    ${BROWSER}
    Maximize Browser Window

Login With Credentials
    [Documentation]    Logs in with the provided username and password
    [Arguments]    ${username}    ${password}
    Input Text    id:user-name    ${username}
    Input Text    id:password    ${password}
    Click Button    id:login-button

Verify Products Page
    [Documentation]    Verifies the Products page is displayed after login
    Wait Until Page Contains Element    css:.title    timeout=10s
    Element Text Should Be    css:.title    Products

Logout From SauceDemo
    [Documentation]    Logs out from SauceDemo
    Click Button    id:react-burger-menu-btn
    Wait Until Element Is Visible    id:logout_sidebar_link    timeout=5s
    Click Element    id:logout_sidebar_link

Verify Login Page
    [Documentation]    Verifies the login page is displayed
    Wait Until Page Contains Element    id:login-button    timeout=10s

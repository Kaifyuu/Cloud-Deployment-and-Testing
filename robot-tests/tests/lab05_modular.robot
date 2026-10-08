*** Settings ***
Documentation    Lab 5: Modular Project Architecture
...              955108 Software Deployment - Software Testing
...              Uses reusable keywords from resources/keywords.robot
Library          SeleniumLibrary
Resource         ../resources/keywords.robot

*** Variables ***
${URL}              https://www.saucedemo.com/

*** Test Cases ***
Modular Login Test
    [Documentation]    Login test using reusable keywords
    [Tags]    Smoke    UI    Modular
    Open SauceDemo In Chrome
    Login With Credentials    standard_user    secret_sauce
    Verify Products Page
    Log    Modular login test passed
    [Teardown]    Close All Browsers

Modular Login And Logout Test
    [Documentation]    Full login/logout flow using reusable keywords
    [Tags]    UI    Modular
    Open SauceDemo In Chrome
    Login With Credentials    standard_user    secret_sauce
    Verify Products Page
    Logout From SauceDemo
    Verify Login Page
    Log    Modular login/logout test passed
    [Teardown]    Close All Browsers

*** Settings ***
Documentation    Lab 10: Dynamic Scrolling with JavaScript
...              955108 Software Deployment - Software Testing
Library          SeleniumLibrary
Resource         ../resources/keywords.robot

*** Keywords ***
Scroll Down Page
    [Documentation]    Scrolls down the page by 500px increments
    [Arguments]    ${times}=3
    FOR    ${i}    IN RANGE    ${times}
        Execute Javascript    window.scrollBy(0, 500)
        Sleep    0.5s
    END

Scroll To Element And Click
    [Documentation]    Scrolls until element is visible then clicks it
    [Arguments]    ${locator}
    Wait Until Element Is Visible    ${locator}    timeout=10s
    Scroll Element Into View    ${locator}
    Sleep    0.5s
    Click Element    ${locator}

*** Test Cases ***
Scroll Through Inventory
    [Documentation]    Login and scroll through the product inventory
    [Tags]    UI    Scroll
    Open SauceDemo In Chrome
    Login With Credentials    standard_user    secret_sauce
    Verify Products Page

    # Scroll down the page
    Scroll Down Page    times=5

    # Scroll to footer
    Scroll Element Into View    css:.footer
    Page Should Contain Element    css:.footer
    Log    Successfully scrolled through inventory to footer
    [Teardown]    Close All Browsers

Scroll And Add Last Item
    [Documentation]    Scroll down to find and add the last item
    [Tags]    UI    Scroll    E2E
    Open SauceDemo In Chrome
    Login With Credentials    standard_user    secret_sauce
    Verify Products Page

    # Scroll to the last product and add it
    Scroll To Element And Click    css:[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]

    # Verify cart badge
    Wait Until Page Contains Element    css:.shopping_cart_badge
    Element Text Should Be    css:.shopping_cart_badge    1
    Log    Last item added after scrolling
    [Teardown]    Close All Browsers

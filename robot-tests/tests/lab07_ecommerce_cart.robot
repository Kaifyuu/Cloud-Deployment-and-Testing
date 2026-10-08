*** Settings ***
Documentation    Lab 7: E-Commerce Add-to-Cart Flow
...              955108 Software Deployment - Software Testing
Library          SeleniumLibrary
Resource         ../resources/keywords.robot

*** Test Cases ***
Add Sauce Labs Backpack To Cart
    [Documentation]    Navigate inventory, add backpack to cart, verify badge
    [Tags]    UI    E2E    Positive
    Open SauceDemo In Chrome
    Login With Credentials    standard_user    secret_sauce
    Verify Products Page

    # Click on Sauce Labs Backpack
    Click Element    css:[data-test="add-to-cart-sauce-labs-backpack"]

    # Verify cart badge shows 1 item
    Wait Until Page Contains Element    css:.shopping_cart_badge
    Element Text Should Be    css:.shopping_cart_badge    1
    Log    Item added to cart - badge shows 1

    # Navigate to cart
    Click Element    css:.shopping_cart_link
    Wait Until Page Contains Element    css:.cart_item
    Page Should Contain    Sauce Labs Backpack
    Log    Cart contains Sauce Labs Backpack
    [Teardown]    Close All Browsers

Add Multiple Items To Cart
    [Documentation]    Add multiple items and verify cart count
    [Tags]    UI    E2E
    Open SauceDemo In Chrome
    Login With Credentials    standard_user    secret_sauce
    Verify Products Page

    Click Element    css:[data-test="add-to-cart-sauce-labs-backpack"]
    Click Element    css:[data-test="add-to-cart-sauce-labs-bike-light"]
    Click Element    css:[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]

    Element Text Should Be    css:.shopping_cart_badge    3
    Log    3 items added to cart successfully
    [Teardown]    Close All Browsers

*** Settings ***
Documentation    Lab 1: First Robot Framework Test
...              955108 Software Deployment - Software Testing

*** Test Cases ***
Hello World Test
    [Documentation]    Simple test to verify Robot Framework is working
    [Tags]    Smoke    Basic
    Log    Hello, Robot Framework!
    Log    955108 Software Deployment Lab 1
    Log To Console    Lab 1: Hello World test executed successfully

Simple Math Test
    [Documentation]    Verify basic math operations
    [Tags]    Smoke    Basic
    ${result}=    Evaluate    1 + 2
    Should Be Equal As Numbers    ${result}    3
    Log    1 + 2 = ${result}

String Test
    [Documentation]    Verify string operations
    [Tags]    Basic
    ${greeting}=    Set Variable    Hello 955108
    Should Contain    ${greeting}    955108
    Should Start With    ${greeting}    Hello
    Length Should Be    ${greeting}    11

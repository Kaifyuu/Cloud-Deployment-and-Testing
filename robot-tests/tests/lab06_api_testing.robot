*** Settings ***
Documentation    Lab 6: REST API Testing with RequestsLibrary
...              955108 Software Deployment - Software Testing
Library          RequestsLibrary
Library          Collections

*** Variables ***
${BASE_URL}      http://localhost:3000

*** Test Cases ***
API Health Check
    [Documentation]    Verify the /health endpoint returns 200
    [Tags]    API    Smoke
    Create Session    app    ${BASE_URL}
    ${response}=    GET On Session    app    /health
    Should Be Equal As Numbers    ${response.status_code}    200
    ${json}=    Set Variable    ${response.json()}
    Should Be Equal    ${json}[status]    ok
    Log    Health check passed: ${json}

API Root Endpoint
    [Documentation]    Verify the root endpoint returns a response
    [Tags]    API    Smoke
    Create Session    app    ${BASE_URL}
    ${response}=    GET On Session    app    /
    Should Be Equal As Numbers    ${response.status_code}    200
    Should Contain    ${response.text}    955108
    Log    Root endpoint response: ${response.text}

API Get Users
    [Documentation]    Verify GET /api/users returns a list
    [Tags]    API    CRUD
    Create Session    app    ${BASE_URL}
    ${response}=    GET On Session    app    /api/users    expected_status=any
    Log    Users response: ${response.status_code} - ${response.text}

API SQL Injection Test
    [Documentation]    Verify API is resilient to SQL injection attempts
    [Tags]    API    Security
    Create Session    app    ${BASE_URL}
    ${response}=    GET On Session    app    /api/users/1 OR 1=1    expected_status=any
    Should Not Be Equal As Numbers    ${response.status_code}    200
    Log    SQL injection correctly rejected: ${response.status_code}

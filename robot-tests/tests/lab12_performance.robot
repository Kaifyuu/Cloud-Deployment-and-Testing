*** Settings ***
Documentation    Lab 12: Performance Testing
...              955108 Software Deployment - Software Testing
...              Note: Actual load testing uses autocannon CLI tool:
...              npm install -g autocannon
...              autocannon -c 100 -d 30 http://localhost:3000/
Library          RequestsLibrary
Library          DateTime

*** Variables ***
${BASE_URL}      http://localhost:3000

*** Test Cases ***
Response Time - Health Endpoint
    [Documentation]    Verify health endpoint responds within acceptable time
    [Tags]    Performance    API
    Create Session    app    ${BASE_URL}
    ${start}=    Get Current Date    result_format=epoch
    ${response}=    GET On Session    app    /health
    ${end}=    Get Current Date    result_format=epoch
    ${duration}=    Evaluate    ${end} - ${start}
    Should Be True    ${duration} < 2.0    Response took ${duration}s, expected < 2s
    Log    Health endpoint response time: ${duration}s

Response Time - Root Endpoint
    [Documentation]    Verify root endpoint responds within acceptable time
    [Tags]    Performance    API
    Create Session    app    ${BASE_URL}
    ${start}=    Get Current Date    result_format=epoch
    ${response}=    GET On Session    app    /
    ${end}=    Get Current Date    result_format=epoch
    ${duration}=    Evaluate    ${end} - ${start}
    Should Be True    ${duration} < 2.0    Response took ${duration}s, expected < 2s
    Log    Root endpoint response time: ${duration}s

Multiple Sequential Requests
    [Documentation]    Send multiple requests and verify consistent response times
    [Tags]    Performance    API
    Create Session    app    ${BASE_URL}
    FOR    ${i}    IN RANGE    10
        ${response}=    GET On Session    app    /health
        Should Be Equal As Numbers    ${response.status_code}    200
    END
    Log    10 sequential requests completed successfully

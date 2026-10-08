*** Settings ***
Documentation    Lab 11: CI/CD Pipeline Integration
...              955108 Software Deployment - Software Testing
...              This test is designed to run in GitHub Actions CI
...              See: .github/workflows/robot-tests.yml
Library          RequestsLibrary
Library          Collections

*** Variables ***
${BASE_URL}      http://localhost:3000

*** Test Cases ***
CI - Health Check
    [Documentation]    Verify app is running in CI environment
    [Tags]    API    CI    Smoke
    Create Session    app    ${BASE_URL}
    ${response}=    GET On Session    app    /health
    Should Be Equal As Numbers    ${response.status_code}    200
    Log    CI health check passed

CI - Root Endpoint
    [Documentation]    Verify root endpoint in CI
    [Tags]    API    CI
    Create Session    app    ${BASE_URL}
    ${response}=    GET On Session    app    /
    Should Be Equal As Numbers    ${response.status_code}    200
    Log    CI root endpoint check passed

CI - API Users Endpoint
    [Documentation]    Verify users API endpoint exists in CI
    [Tags]    API    CI
    Create Session    app    ${BASE_URL}
    ${response}=    GET On Session    app    /api/users    expected_status=any
    Log    CI users endpoint responded: ${response.status_code}

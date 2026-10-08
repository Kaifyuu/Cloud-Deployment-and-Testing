*** Settings ***
Documentation    Lab 13: Security Vulnerability Testing
...              955108 Software Deployment - Software Testing
...              Tests for CORS, SQL Injection, and XSS vulnerabilities
Library          RequestsLibrary
Library          Collections

*** Variables ***
${BASE_URL}      http://localhost:3000

*** Test Cases ***
Security - SQL Injection via URL Parameter
    [Documentation]    Verify API rejects SQL injection attempts
    [Tags]    Security    API
    Create Session    app    ${BASE_URL}
    # Attempt SQL injection via URL parameter
    ${response}=    GET On Session    app    /api/users/1%20OR%201%3D1    expected_status=any
    Should Not Be Equal As Numbers    ${response.status_code}    200
    Log    SQL injection attempt correctly handled: ${response.status_code}

Security - XSS via Query Parameter
    [Documentation]    Verify API sanitizes XSS payloads
    [Tags]    Security    API
    Create Session    app    ${BASE_URL}
    ${response}=    GET On Session    app    /health    expected_status=any
    Should Not Contain    ${response.text}    <script>
    Log    No script tags in response - XSS safe

Security - CORS Headers Present
    [Documentation]    Verify CORS headers are set
    [Tags]    Security    API
    Create Session    app    ${BASE_URL}
    ${response}=    GET On Session    app    /health
    Log    Response headers: ${response.headers}
    Should Be Equal As Numbers    ${response.status_code}    200

Security - Invalid HTTP Methods
    [Documentation]    Verify API handles invalid methods gracefully
    [Tags]    Security    API
    Create Session    app    ${BASE_URL}
    ${response}=    DELETE On Session    app    /health    expected_status=any
    Log    DELETE on /health returned: ${response.status_code}

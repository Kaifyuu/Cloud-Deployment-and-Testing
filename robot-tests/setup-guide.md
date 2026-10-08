# Robot Framework Setup Guide

## Prerequisites
- Python 3.8 - 3.12
- Chrome browser installed
- ChromeDriver matching your Chrome version

## Setup Steps

### 1. Create virtual environment
```bash
cd robot-tests
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. ChromeDriver Setup
Download from: https://googlechromelabs.github.io/chrome-for-testing/
Place chromedriver in your system PATH.

### 4. Running Tests
```bash
# Run all tests
robot -d results tests/

# Run specific lab
robot -d results tests/lab01_hello.robot

# Run by tag
robot -d results -i Smoke tests/
robot -d results -i API tests/

# Run with combined tags
robot -d results -i SmokeANDAPI tests/
```

### 5. VS Code Extensions
- Robot Framework Language Server
- Robot Framework Intellisense

# End-to-End QA Workflow with Natural Language

## Workflow Overview

This prompt guides you through a complete 7-step QA workflow using MCP servers and AI agents to go from user story to committed automated test scripts.

---

## 🎯 STEP 1: Read User Story

**Prompt:**
...
I need to start a new testing workflow. Please read the user story from the file:
user-stories/SCRUM-101-E-commerce-Checkout-Process.md

Summarize the key requirements, acceptance criteria, and testing scope.
...

**Expected Output:**

* Summary of the user story
* List of acceptance criteria
* Application URL and test credentials
* Key features to test

---

## STEP 2: Create Test Plan

**Prompt:**
...

Based on the user story SCRUM-101 that we just reviewed, use the playwright-test-planner agent to:

1. Read the application URL and test credentials from the user story

2. Explore the application and understand all workflows mentioned in the acceptance criteria

3. Create a comprehensive test plan that covers all acceptance criteria including:

   * Happy path scenarios
   * Negative scenarios (validation errors, empty fields, invalid data)
   * Edge cases and boundary conditions
   * Navigation flow tests
   * UI element validation

4. Save the test plan as:
   specs/saucedemo-checkout-test-plan.md

Ensure each test scenario includes:

* Clear test case title
* Detailed step-by-step instructions
* Expected results for each step
* Test data requirements

...

**Expected Output:**

* Complete test plan markdown file saved to specs/
* Organized test scenarios with clear structure
* Browser exploration screenshots (if needed)

---

## STEP 3: Perform Exploratory Testing

**Prompt:**
...

Now I need to perform manual exploratory testing using Playwright MCP browser tools.

Please read the test plan from:
specs/saucedemo-checkout-test-plan.md

Then execute the test scenarios defined in that plan:

1. Use Playwright browser tools to manually execute each test scenario from the plan
2. Follow the step-by-step instructions in each test case
3. Verify expected results match actual results
4. Take screenshots at key steps and error states
5. Discover and document all stable element selectors used during testing
6. Capture validation messages, navigation behavior, UI state changes, and business rule behavior
7. Document your findings:

* Test execution results for each scenario
* Element selectors discovered
* Validation behaviors observed
* Navigation behaviors observed
* UI inconsistencies or unexpected behaviors
* Missing validations or bugs discovered
* Screenshots as evidence

...

**Expected Output:**

* Manual test execution results
* Screenshots of the application at various states
* Element selectors discovered during testing
* Validation behavior observations
* Navigation flow observations
* List of findings and recommendations
* Any issues discovered during exploration

---

## STEP 4: Generate Automation Scripts

**Prompt:**
...

Now I need to create automated test scripts using the playwright-test-generator agent.

Please review:

1. Test plan from:
   specs/saucedemo-checkout-test-plan.md
   (for test scenarios and steps)

2. Exploratory testing results from Step 3
   (for actual element selectors and UI insights)

Using insights from the manual exploratory testing:

* Leverage the element selectors and locators that were successfully used in Step 3
* Use stable element properties (IDs, data attributes, roles) discovered during exploration
* Apply wait strategies and UI behaviors observed during manual testing
* Incorporate any workarounds for UI quirks discovered

Generate Playwright JavaScript automation scripts:

1. Create scripts for each test scenario from the test plan
2. Organize scripts into appropriate test suite files in:
   tests/saucedemo-checkout/
3. Use the test case names and steps from the test plan
4. Use reliable selectors and strategies from exploratory testing

Requirements for all scripts:

* Follow Playwright best practices
* Include proper assertions using expect()
* Use descriptive test names matching the format in the test plan
* Use robust element selectors discovered during manual testing
* Add comments for complex steps
* Use proper wait strategies based on actual application behavior
* Add proper test hooks (beforeEach, afterEach)
* Configure for multiple browsers (Chrome, Firefox, Safari)

After generating the scripts, run the tests to verify they pass.

...

**Expected Output:**

* Test suite files created in tests/saucedemo-checkout/ based on test plan scenarios
* Scripts using robust selectors discovered during exploratory testing
* All scripts follow Playwright best practices
* Initial test generation complete

---

## STEP 5: Execute and Heal Automation Tests

**Prompt:**
...

Now I need to execute the generated automation scripts and heal any failures using the playwright-test-healer agent.

1. Run all automation scripts in:
   tests/saucedemo-checkout/

2. Identify any failing tests

3. For each failing test, use the playwright-test-healer agent to:

   * Analyze the failure
   * Identify root cause
   * Determine whether failure is due to:

     * Selector issues
     * Timing issues
     * Assertion mismatches
     * Environment instability
     * Test data issues
   * Auto-heal the test
   * Update the script

4. Re-run healed tests

5. Repeat until all tests are stable and passing

6. Document:

   * Initial execution results
   * Failed tests
   * Error messages
   * Root cause analysis
   * Healing activities performed
   * Script changes made
   * Final execution results
   * Remaining unresolved failures

...

**Expected Output:**

* All automation tests executed
* Initial execution report
* Failure analysis report
* Root cause analysis for every failure
* Healing activity log
* Updated healed test scripts
* Final execution report
* Pass/fail metrics by suite
* Overall execution success rate

---

## STEP 6: Create Test Report

**Prompt:**
...

Now I need to create a comprehensive QA Test Execution Report based on:

* Step 3: Manual exploratory testing results
* Step 4: Generated automation scripts
* Step 5: Automated test execution and healing results

Save the report as:

test-results/SCRUM-101-checkout-test-report-attached.md

IMPORTANT:

Generate the report in a professional QA reporting format similar to an enterprise Test Execution Report.

The report MUST contain the following sections:

# SCRUM-101: E-commerce Checkout Process - Test Execution Report

Include:

* Test Date
* Test Environment
* Test User
* Tester

---

## 1. Executive Summary

Include:

### Overall Test Status

PASSED / FAILED / PARTIAL

### Metrics Table

| Metric                       | Count | Percentage |
| ---------------------------- | ----- | ---------- |
| Total Test Cases Planned     |       |            |
| Test Cases Executed (Manual) |       |            |
| Test Cases Automated         |       |            |
| Automated Tests Passed       |       |            |
| Automated Tests Failed       |       |            |
| Defects Found                |       |            |
| Test Coverage                |       |            |

### Summary

Provide:

* Acceptance criteria coverage
* Manual testing summary
* Automation testing summary
* Healing summary
* Release readiness assessment

---

## 2. Manual Test Results (Exploratory Testing)

For every executed manual scenario include:

### Test N: <Scenario Name> PASS/FAIL

**Objective**

**Steps Executed**

**Results**

**Element Selectors Discovered**

**Observations**

Document:

* Validation behavior
* Navigation behavior
* UI findings
* Unexpected behavior

### Manual Testing Summary

| Test Scenario | Status | AC Coverage |
| ------------- | ------ | ----------- |

Include:

* Total manual tests
* Pass count
* Fail count
* Findings

---

## 3. Automated Test Results

### Initial Test Execution (Before Healing)

Include:

* Execution Date
* Framework
* Browser

For each suite:

### Test Suite: <Suite Name>

| Test Case | Initial Status | Issues |
| --------- | -------------- | ------ |

Include:

* Passed count
* Failed count
* Skipped count

### Initial Results Summary

Include:

* Total Passed
* Total Failed
* Pass Percentage

---

### Healing Activities Performed

For every healed failure include:

#### Issue N

**Problem**

**Error Message**

**Root Cause**

**Fix Applied**

**Result**

Document:

* Selector fixes
* Assertion fixes
* Wait strategy improvements
* Timing fixes
* Locator improvements

---

### Final Test Execution (After Healing)

| Test Suite | Tests | Passed | Failed | Pass Rate |
| ---------- | ----- | ------ | ------ | --------- |

### Final Results Summary

Include:

* Total Tests
* Passed
* Failed
* Final Pass Rate

### Healing Summary

Include:

* Issues identified
* Issues resolved
* Healing success rate
* Healing techniques used

---

## 4. Defects Log

For every defect include:

* Bug ID
* Severity
* Priority
* Title
* Description
* Steps to Reproduce
* Expected Result
* Actual Result
* Evidence
* Environment

If no defects exist explicitly state:

* Critical/High Priority Defects: 0
* Medium/Low Priority Defects: 0

Provide overall quality assessment.

---

## 5. Test Coverage Analysis

### Acceptance Criteria Coverage Matrix

| AC # | Acceptance Criteria | Manual Tests | Automated Tests | Coverage Status |
| ---- | ------------------- | ------------ | --------------- | --------------- |

Map every acceptance criterion to executed tests.

### Test Type Coverage

| Test Type | Count | Scenarios Covered |
| --------- | ----- | ----------------- |

Include:

* Manual exploratory tests
* Happy path automation
* Validation automation
* Navigation automation
* Edge case automation

### Coverage Gaps & Recommendations

Include:

* Current coverage percentage
* Coverage gaps
* Future testing recommendations

Examples:

* Cross-browser testing
* Mobile testing
* Accessibility testing
* Security testing
* Performance testing
* API testing

---

## 6. Summary and Recommendations

### Overall Quality Assessment

### Key Achievements

### Testing Artifacts Created

Include:

* Test Plan
* Automation Scripts
* Test Report
* Screenshots/Evidence

### Risk Assessment

* Functional Risk
* Regression Risk
* Performance Risk
* Security Risk

### Next Steps

### Future Enhancements

### Maintenance Recommendations

---

## Sign-Off

Testing Complete: <Date>

Recommendation:

APPROVED FOR PRODUCTION

or

NOT APPROVED FOR PRODUCTION

Include final production readiness statement.

---

## Appendix

### Test Environment Details

### Test File Structure

### Element Selector Reference

### Screenshots & Evidence

### End of Report

...

**Expected Output:**

* Executive summary with metrics
* Detailed manual execution results
* Detailed automation execution results
* Healing activity report
* Defect log
* Acceptance criteria coverage matrix
* Risk assessment
* Production readiness recommendation
* Appendix with selectors, screenshots, and automation suite structure
* Enterprise-style QA Test Execution Report

---

## 🚀 STEP 7: Commit to Git Repository

**Git Repository URL:** https://github.com/mohanmotupalli/AIPOC.git

**Prompt:**
...

Now I need to commit all the test artifacts to the Git repository using the GitHub MCP server.

Git Repository URL:
https://github.com/mohanmotupalli/AIPOC.git

Please perform the following Git operations:

1. Initialize Git repository if not already initialized

2. Stage all files in the workspace (all new and modified files)

3. Create a commit with the message:

feat(tests): Add complete test suite for SCRUM-101 checkout workflow

* Add user story documentation
* Add comprehensive test plan with all scenarios
* Add test execution report with results
* Add automated test scripts for checkout process
* Include validation, navigation, and edge case tests

Resolves SCRUM-101

4. Push all changes to the Git repository

5. Provide a summary of what was committed

...

**Expected Output:**

* All workspace files committed to Git
* Descriptive commit message following conventional commit format
* Confirmation of successful push to the provided repository
* Summary of changes

---

## Complete Workflow Execution

**Execution Status (completed):**

- **Date:** 2026-06-02
- **Result:** Automated workflow executed end-to-end using Playwright across Chromium, Firefox, and WebKit.
- **Test run summary:** 21 tests executed (all passed)
- **Artifacts generated:**
   - specs/saucedemo-checkout-test-plan.md
   - tests/saucedemo-checkout/checkout.spec.ts
   - test-results/SCRUM-101-checkout-test-report-attached.md

The repository will be updated with these artifacts and a conventional commit summarizing the work.
**Single Combined Prompt (for Video Demo):**

I want to demonstrate a complete end-to-end QA workflow using natural language and MCP servers.

STEP 1 - READ USER STORY:
First, read the user story from:
user-stories/SCRUM-101-E-commerce-Checkout-Process.md

Provide a brief summary of what needs to be tested.

STEP 2 - CREATE TEST PLAN:
Use the playwright-test-planner agent to create a comprehensive test plan based on the user story. The agent should explore the application URL from the user story and cover all acceptance criteria. Save it as:
specs/saucedemo-checkout-test-plan.md

STEP 3 - EXPLORATORY TESTING:
Read the test plan from specs/saucedemo-checkout-test-plan.md and use Playwright browser tools to manually execute each test scenario. Document findings with screenshots, selectors discovered, validation behaviors, and note any issues discovered.

STEP 4 - GENERATE AUTOMATION SCRIPTS:
Review both the test plan (specs/saucedemo-checkout-test-plan.md) and exploratory testing results from Step 3. Use the playwright-test-generator agent to create JavaScript automation scripts leveraging the element selectors and insights discovered during manual testing. Save scripts in tests/saucedemo-checkout/

STEP 5 - EXECUTE AND HEAL TESTS:
Run all automation scripts from tests/saucedemo-checkout/. Use the playwright-test-healer agent to identify and auto-heal any failing tests. Re-run tests until all are stable and passing. Document healing activities, root causes, fixes applied, and final execution metrics.

STEP 6 - CREATE TEST REPORT:
Create a comprehensive test execution report at:
test-results/SCRUM-101-checkout-test-report-attached.md

Compile results from Step 3 (manual testing), Step 4 (script generation), and Step 5 (execution and healing).

Generate the report using the detailed enterprise QA reporting structure defined above, including:

* Executive Summary
* Manual Test Results
* Automated Test Results
* Healing Activities
* Defect Log
* Acceptance Criteria Coverage Matrix
* Risk Assessment
* Sign-Off
* Appendix

STEP 7 - COMMIT TO GIT:
Use the GitHub MCP agent to commit all new files with a descriptive message and push to the repository.

Execute this complete workflow and provide status updates after each step.

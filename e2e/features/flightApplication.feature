@regression
Feature: Filght Application Registration.

	@valid
	Scenario: Login with valid User for registration
		Given I execute "FlightApplication" functionality for TestCase "TestForValidLogin"
		When user lands on the HomePage with "Username" and "Password"
		And I Logout

	@invalid
	Scenario: Login with Invalid User for registration
		Given I execute "FlightApplication" functionality for TestCase "TestForInvalidLogin"
		When user lands on the HomePage with "Username" and "Password"
		And I Logout

	@invalid
	Scenario: Get the Json Test Data
		Given I verify top level menu names in the site

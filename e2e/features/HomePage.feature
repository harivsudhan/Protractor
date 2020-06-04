@PoC
Feature: BB8 Functional Validation

  Background: As a user, I want to login to the page

  Scenario: user checks login is successful
    Given user navigates to the home page
    Then user should see the BB8 page header "Baheerportal"

  Scenario: As a user I want to search the IBAN Rekeningnummer
    Given user expands the IBAN Rekeningnummer
    When the user enters the Rekeningnummer "NL74RABO0860443043"
    And user enter Startdatum "29-05-2020" and Einddatum "30-05-2020"
    When user click the Zoeken button
    Then user should verify the result table is displayed
      | Raboservice entry id | Status | Result | Acc. event code | Herkomst | Rekening administratie | Wijzigingsdatum |

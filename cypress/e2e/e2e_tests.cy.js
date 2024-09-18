import { basePage } from '../PageObject/base_page'
import testData from '../fixtures/testData.json'
import { aboutPage } from '../pageObject/about_page';
import { contactUsPage } from '../pageObject/contact_page';
import { homePage } from '../pageObject/home_page';

describe('EPAM E2E testing', () => {

    it('Visits EPAM and checks the title', () => {
      
      basePage
        .visitUrl()
        cy.title().should("eq", testData.pageTitle)
    });

    it('should switch between Light and Dark modes', () => {

      homePage
        .visitUrl()
        .themeCheck()
    });

    it('should navigate to the Ukrainian careers page', () => {
      
      homePage
        .visitUrl()
        .clickOnElement(homePage.languageArrowButton)
        .clickOnElement(homePage.uaLanguageButton)
        .pageException()

      let vacanciesButtonSelector = homePage.vacanciesButtonSelector;
      cy.origin('https://careers.epam.ua', { args: { vacanciesButtonSelector } }, ({ vacanciesButtonSelector }) => {
        cy.url().should('include', 'careers.epam.ua');
        cy.get(vacanciesButtonSelector).should('have.text', 'Вакансії');
      });
    });


    it('Visits EPAM and checks policies at the bottom of the page', () => {
      homePage.visitUrl();
      testData.policyLinks.forEach(link => {
          homePage.policyLinks(link).should('be.visible');
      });
  });

    it('Visits EPAM and checks location list', () => {
      
      homePage
        .visitUrl()
        .locationCheck(testData.region)
    });

    it('Checks the search function', () => {

      homePage
        .visitUrl()
        .typeInSearchField(testData.searchKeyword)
        .elementShouldBeVisible(homePage.searchResultList)
        .validateSearchResults(testData.searchKeyword)
    });

    it('Check required fields validation', () => {
      
      const fields = {
        firstNameField: testData.contactUsFields.firstNameField,
        lastNameField: testData.contactUsFields.lastNameField,
        userEmailField: testData.contactUsFields.userEmailField,
        userPhoneField: testData.contactUsFields.userPhoneField,
        userCompanyField: testData.contactUsFields.userCompanyField,
        commentField: testData.contactUsFields.commentField,
        howDidYouHearField: testData.contactUsFields.howDidYouHearField
      };

      contactUsPage
        .visitUrl()
        .clickOnElement(contactUsPage.contactUsSubmitButton)
        .contuctUsFieldsValidation(fields)
    });
  
    it('checks if the company logo leads to the main page', () => {

      aboutPage
        .visitUrl();
      basePage
        .clickOnElement(basePage.headerLogo)
        cy.url().should('eq', 'https://www.epam.com/');
    });

    it('downloads the EPAM Corporate Overview 2023 report', () => {
      cy.task('clearDownloads');
      
      aboutPage.
        visitUrl()
        .clickOnElement(aboutPage.downloadButton)
        cy.readFile(testData.fileName).should('exist');
    });
});


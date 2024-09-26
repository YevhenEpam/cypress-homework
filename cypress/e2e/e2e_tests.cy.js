import { basePage } from '../PageObject/base_page'
import testData from '../fixtures/testData.json'
import { aboutPage } from '../pageObject/about_page';
import { contactUsPage } from '../pageObject/contact_page';
import { homePage } from '../pageObject/home_page';

describe('EPAM E2E testing', () => {

    it('Visits EPAM and checks the title', () => {
      
      basePage
        .visitUrl()
        .titleCheck(testData.pageTitle)//todo: please, keep all checks in tests, not in methods
    });

    it('should switch between Light and Dark modes', () => {

      homePage
        .visitUrl()
        .themeCheck() //todo: please, keep all checks in tests, not in methods,
    });

    it('should navigate to the Ukrainian careers page', () => {
      
      homePage
        .visitUrl()
        .clickOnElement(homePage.languageArrowButton) //todo: you can keep it as is, but it is better to have a separate clicking method for each button, because it could return different pages
        .clickOnElement(homePage.uaLanguageButton)
        .pageException()

      let vacanciesButtonSelector = homePage.vacanciesButtonSelector;
      cy.origin('https://careers.epam.ua', { args: { vacanciesButtonSelector } }, ({ vacanciesButtonSelector }) => {
        cy.url().should('include', 'careers.epam.ua');
        cy.get(vacanciesButtonSelector).should('have.text', 'Вакансії');
      });
    });


    it('Visits EPAM and checks policies at the bottom of the page', () => {
      
      homePage
        .visitUrl()
        .policyLinksCheck(testData.policyLinks) //todo: please, keep all checks in tests, not in methods,
    });

    it('Visits EPAM and checks location list', () => {
      
      homePage
        .visitUrl()
        .locationCheck(testData.region) //todo: please, keep all checks in tests, not in methods. There is no need to keep 3 words in the json file, use principle KISS:
          //todo: ["AMERICAS", "EMEA", "APAC"].forEach(region => {
        //             homePage.clickLocationTab(region)
        //             cy.contains('a', region)
        //             .should('have.class', 'active')
        //             .and('attr', 'aria-selected', 'true');
        //           });
    });

    it('Checks the search function', () => {

      homePage
        .visitUrl()
        .typeInSearchField(testData.searchKeyword) //todo: There is no need to keep 1 word in the json file, use principle KISS
        .elementShouldBeVisible(homePage.searchResultList) //todo: please, keep all checks in tests, not in methods,
        .validateSearchResults(testData.searchKeyword)
    });

    it('Check required fields validation', () => {
      
      const fields = {//todo: it is too complicated, I would keep all boolean values here
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
        .contuctUsFieldsValidation(fields) //todo: please, keep all checks in tests, not in methods,
    });
  
    it('checks if the company logo leads to the main page', () => {

      aboutPage
        .visitUrl();
      basePage //todo: you don't need this line, just continue the chain
        .clickOnElement(basePage.headerLogo)
        .urlCheck('https://www.epam.com/') //todo: please, keep all checks in tests, not in methods
    });

    it('downloads the EPAM Corporate Overview 2023 report', () => {
      cy.task('clearDownloads');
      
      aboutPage.
        visitUrl()
        .clickOnElement(aboutPage.downloadButton)
        .fileNameCheck(testData.fileName) //todo: please, keep all checks in tests, not in methods
    });
});


import { basePage } from '../PageObject/base_page'
import testData from '../fixtures/testData.json'
import { aboutPage } from '../pageObject/about_page';
import { contactUsPage } from '../pageObject/contact_page';
import { homePage } from '../pageObject/home_page';

describe('EPAM E2E testing', () => {

    it('Visits EPAM and checks the title', () => {
      basePage.visitUrl()
      cy.title().should("eq", testData.pageTitle);
    });

    it('should switch between Light and Dark modes', () => {

      homePage.visitUrl()
      homePage.themeMode.invoke('text').then((initialTheme) => {
  
        homePage.themeModeButton.click();
        homePage.themeMode.invoke('text').should('not.eq', initialTheme);
      });
    });

    it('should navigate to the Ukrainian careers page', () => {
      homePage.visitUrl()
      homePage.languageArrowButton.click()
      homePage.uaLanguageButton.click()
      homePage.pageException()
      let vacanciesButtonSelector = homePage.vacanciesButtonSelector;
      cy.origin('https://careers.epam.ua', { args: { vacanciesButtonSelector } }, ({ vacanciesButtonSelector }) => {
        cy.url().should('include', 'careers.epam.ua');
        cy.get(vacanciesButtonSelector).should('have.text', 'Вакансії'); // Use the selector to get the element within cy.origin
      });
    });


    it('Visits EPAM and checks policies at the bottom of the page', () => {
      
      basePage.visitUrl();
      testData.policyLinks.forEach(link => {
        cy.get(link.container).contains('a', link.text).should('be.visible');
      });
    });

    it('Visits EPAM and checks location list', () => {
      
      basePage.visitUrl();
      testData.region.forEach(region => {
        cy.contains('a', region)
          .should('be.visible')
          .and('have.attr', 'role', 'tab') 
          .click();

        cy.contains('a', region)
          .should('have.class', 'active')
          .and('attr', 'aria-selected', 'true');
      });
    });

    it('Checks the search function', () => {
      let searchKeyword = testData.searchKeyword;
      homePage.visitUrl();
      homePage.typeInSearchField(searchKeyword);
      homePage.searchResultList.should('be.visible');
      homePage.searchResultItem.should('have.length.greaterThan', 0, 'No results found.');
      homePage.searchResultItem.each((_, index) => {
        homePage.searchResultTitle.eq(index).invoke('text').then((titleText) => {
          homePage.searchResultDescription.eq(index).invoke('text').then((descriptionText) => {
            expect(
              titleText.includes(searchKeyword) || descriptionText.includes(searchKeyword)
            ).to.be.true;
          });
        });
      });
    });

    it('Check required fields validation', () => {
      contactUsPage.visitUrl();
      contactUsPage.contactUsSubmitButton.click();
      
      const fields = {
        firstNameField: testData.contactUsFields.firstNameField,
        lastNameField: testData.contactUsFields.lastNameField,
        userEmailField: testData.contactUsFields.userEmailField,
        userPhoneField: testData.contactUsFields.userPhoneField,
        userCompanyField: testData.contactUsFields.userCompanyField,
        commentField: testData.contactUsFields.commentField,
        howDidYouHearField: testData.contactUsFields.howDidYouHearField
      };
    
      Object.keys(fields).forEach(field => {
        contactUsPage[field].should('have.attr', 'aria-invalid', fields[field]);
      });
    });
  
    it('checks if the company logo leads to the main page', () => {

      aboutPage.visitUrl();
      basePage.headerLogo.click();
      cy.url().should('eq', 'https://www.epam.com/');

    });

    it('downloads the EPAM Corporate Overview 2023 report', () => {
      
      aboutPage.visitUrl();
      cy.task('clearDownloads');
      aboutPage.downloadButton().click();
      const downloadedFilename = 'cypress/downloads/EPAM_Corporate_Overview_Q4_EOY.pdf';
      cy.readFile(downloadedFilename).should('exist');
    });
});


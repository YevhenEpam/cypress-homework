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
        .themeMode.invoke('text').then((initialTheme) => {

        homePage
            .clickThemeMode()
            .themeMode.invoke('text').should('not.eq', initialTheme);
      });
    });

    it('should navigate to the Ukrainian careers page', () => {
      
      homePage
        .visitUrl()
          .clickLanguageArrowButton()
          .clickUaLanguageButton()
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
        .visitUrl();
        testData.region.forEach(region => {
          homePage.clickLocationTab(region);
          cy.contains('a', region)
              .should('have.class', 'active')
                      .and('attr', 'aria-selected', 'true');
        })
    });

    it('Checks the search function', () => {

      homePage
        .visitUrl()
          .typeInSearchFieldAndClickFindButton('AI')
          .searchResultList.should('be.visible')
      homePage
      .searchResultItem
           .should('be.visible')
           .each(($article) => {
                cy.wrap($article).should('contain', 'AI')
          });
    });

  it('Check required fields validation', () => {
    contactUsPage.visitUrl().clickContactUsSubmitButton();

    const fieldsToCheck = [
      { field: contactUsPage.firstNameField, expected: 'true' },
      { field: contactUsPage.lastNameField, expected: 'true' },
      { field: contactUsPage.userEmailField, expected: 'true' },
      { field: contactUsPage.userPhoneField, expected: 'true' },
      { field: contactUsPage.howDidYouHearField, expected: 'true' },
      { field: contactUsPage.userCompanyField, expected: 'false' },
      { field: contactUsPage.commentField, expected: 'false' }
    ];

    cy.wait(50); // Failed [name='user_comment'] without the following. Don't know the reason

    fieldsToCheck.forEach(({ field, expected }) => {
      field.should('have.attr', 'aria-invalid', expected).then((attrValue) => {
      });
    });
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


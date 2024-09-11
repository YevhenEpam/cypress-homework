import BasePage from '../PageObject/base_page'

describe('EPAM E2E testing', () => {

    it('Visits EPAM and checks the title', () => {
      cy.visit("/")
      cy.title().should("eq", "EPAM | Software Engineering & Product Development Services");
    });

    it('should switch between Light and Dark modes', () => {

      cy.visit('/');
      cy.get(BasePage.themeMode).invoke('text').then((initialTheme) => {
  
          cy.get(BasePage.buttonThemeMode).click();
          cy.get(BasePage.themeMode).invoke('text').should('not.eq', initialTheme);
        });
    });

    it('should navigate to the Ukrainian careers page', () => {
      cy.visit('/');
      cy.get(BasePage.languageButtonArrow).click();
      cy.get(BasePage.uaLanguage).eq(1).click(); 

      cy.on('uncaught:exception', (err) => {
          if (err.message.includes('Things went bad')) {
              return false; 
          }
          throw err;
      });
      
      let vacanciesButton = BasePage.vacanciesButton;
      let args = { vacanciesButton };

      cy.origin('https://careers.epam.ua', { args }, ({ vacanciesButton }) => {
          cy.url().should('include', 'careers.epam.ua');
          cy.get(vacanciesButton).should('have.text', 'Вакансії');
      });
    });


    it('Visits EPAM and checks policies at the bottom of the page', () => {
      cy.visit('/');
  
      BasePage.policyLinks.forEach(link => {
        cy.get(link.container).contains('a', link.text).should('be.visible');
      });
    });

    it('Visits EPAM and checks location list', () => {
      
      cy.visit('/');
      BasePage.regions.forEach(region => {
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
      cy.visit('/');
      const searchKeyword = 'AI';
      BasePage.typeInSearchField(searchKeyword);
      cy.get(BasePage.searchResults).should('be.visible');
      cy.get(BasePage.searchResult).then(searchResults => {
        expect(searchResults.length).to.be.greaterThan(0, 'No results found.');
      });
      cy.get(BasePage.searchResult).each(($el) => {
        const titleText = $el.find(BasePage.searchResultTitle).text();
        const descriptionText = $el.find(BasePage.searchResultDescription).text();
        cy.wrap(titleText).then(title => {
          cy.wrap(descriptionText).then(description => {
            expect(title.includes(searchKeyword) || description.includes(searchKeyword)).to.be.true;
          });
        });
      });
    });

    it('Check reqired fiedls validation', () => {
        
      cy.visit('/about/who-we-are/contact');
      cy.get(BasePage.contactUsSubmit).click();

      Object.keys(BasePage.contuctUsFields).forEach(fieldSelector => {
        const expectedAriaInvalidValue = BasePage.contuctUsFields[fieldSelector];
        cy.get(fieldSelector).should('have.attr', 'aria-invalid', expectedAriaInvalidValue);
      });
    });

    
    it('checks if the company logo leads to the main page', () => {

      cy.visit('/about');
      cy.get(BasePage.headerLogo).click();
      cy.url().should('eq', 'https://www.epam.com/');

    });

    it('downloads the EPAM Corporate Overview 2023 report', () => {
      cy.visit('/about');
      
      cy.task('clearDownloads');
      cy.get(BasePage.downloadButton).click();
      const downloadedFilename = 'cypress/downloads/EPAM_Corporate_Overview_Q4_EOY.pdf';
      cy.readFile(downloadedFilename).should('exist');
    });

  });
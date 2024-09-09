describe('Logo Navigation Test', () => {
  
    it('checks if the company logo leads to the main page', () => {

      cy.visit('https://www.epam.com/about');
      cy.xpath('//img[@class="header__logo header__logo-light"]').click();
      cy.url().should('eq', 'https://www.epam.com/');
      //todo:         homePage
        //             .clickAboutButton()
        //             .clickCompanyLogoButton()
        //         cy.url().should('eq', 'https://www.epam.com/');
    });
  });
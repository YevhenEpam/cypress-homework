describe('Theme Switch Test on EPAM', () => {
  it('should switch between Light and Dark modes', () => {
    
    const themeMode = '//span[@class="theme-switcher-label body-text-small"]';
    const buttonThemeMode = '//div[@class="header__vaulting-container"]//div[@class="theme-switcher"]';
    
    cy.visit('/');
    cy.xpath(themeMode).invoke('text').then((initialTheme) => {

        cy.xpath(buttonThemeMode).click();
        cy.xpath(themeMode).invoke('text').should('not.eq', initialTheme);
      });
  });
});
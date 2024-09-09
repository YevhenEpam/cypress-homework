describe('Theme Switch Test on EPAM', () => {
  it('should switch between Light and Dark modes', () => {
    
    const themeMode = '//span[@class="theme-switcher-label body-text-small"]'; //todo .theme-switcher-label
    const buttonThemeMode = '//div[@class="header__vaulting-container"]//div[@class="theme-switcher"]'; //todo .header__vaulting-container .theme-switcher
    
    cy.visit('/');
    cy.xpath(themeMode).invoke('text').then((initialTheme) => { //todo: what is the purpose of using xpath?

        cy.xpath(buttonThemeMode).click();
        cy.xpath(themeMode).invoke('text').should('not.eq', initialTheme);
      });
  });
});
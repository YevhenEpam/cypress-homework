describe('Language Switch to Ukrainian on EPAM', () => {
  it('should navigate to the Ukrainian careers page', () => {
    cy.visit('/');
    cy.xpath('//button[@class="location-selector__button"]/div[@class="location-selector__button-arrow-wrapper"]').click();
    cy.xpath('//ul[@class="location-selector__list"]//a[@lang="uk"]').click();
    // cy.url().should('include', 'careers.epam.ua');
  });

  it('should display the "Вакансії" link', () => {
    cy.visit('https://careers.epam.ua/');
    cy.xpath('//span[@class="top-navigation__item-text"]/a[contains(text(),"Вакансії")]')
      .should('be.visible');
  });

});

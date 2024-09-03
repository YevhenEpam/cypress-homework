describe('Language Switch to Ukrainian on EPAM', () => {
  it('should navigate to the Ukrainian careers page', () => {
    cy.visit('https://www.epam.com');

    cy.get('.location-selector__button .location-selector__button-arrow-wrapper').click();
    cy.get("a[href='https://careers.epam.ua'][lang='uk']").eq(1).click();
    cy.on('uncaught:exception', (e) => {
      if (e.message.includes('Things went bad')) {
        // We expect this error, ignore it
        return false;
      }
      throw e;
    });

    cy.origin('https://careers.epam.ua', () => {

      cy.url().should('include', 'careers.epam.ua');
      cy.get('span a[href="/vacancies"]').should('have.text', 'Вакансії');
    });
  });
});
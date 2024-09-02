describe('EPAM title validation', () => {
  it('Visits EPAM and checks the title', () => {
    cy.visit('/');
    cy.title().should('eq', 'EPAM | Software Engineering & Product Development Services');
  });
});
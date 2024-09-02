describe('Search Function Test', () => {
    it('Checks the search function', () => {
        cy.visit('/');
        cy.get('button.header-search__button.header__icon').click();
        cy.get('.search-results__input-holder').should('be.visible').click();
        cy.get('input#new_form_search').type('AI');
        cy.get('.custom-button').click();
        cy.get('.search-results__items', { timeout: 10000 }).should('be.visible');
        cy.get('.search-results__item').then(searchResults => {
            expect(searchResults.length).to.be.greaterThan(0, 'No results found.');
        });
    });
});
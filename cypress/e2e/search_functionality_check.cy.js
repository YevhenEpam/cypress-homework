describe('Search Function Test', () => {
    it('Checks the search function', () => {
        cy.visit('/');
        cy.get('button.header-search__button.header__icon').click();
        cy.get('.search-results__input-holder').should('be.visible').click(); //todo: there is no need of this line
        cy.get('input#new_form_search').type('AI');// todo: please create parametrized method ".typeInSearchField(keyword)"
        cy.get('.custom-button').click();
        cy.get('.search-results__items', { timeout: 10000 }).should('be.visible'); //todo: why did you use timeout here? it is better to use in config file defaultCommandTimeout: 30000,requestTimeout: 30000,responseTimeout: 30000,
        cy.get('.search-results__item').then(searchResults => { //todo: you need to check not only availability of results, but if search function works correct
            expect(searchResults.length).to.be.greaterThan(0, 'No results found.');
        });
    });
});
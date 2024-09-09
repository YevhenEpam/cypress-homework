describe('EPAM Policies List Test', () => {
    it('Visits EPAM and checks policies at the bottom of the page', () => {
        cy.visit('/');
        cy.scrollTo('bottom'); //todo: no need to scroll here

        cy.contains('a', 'INVESTORS').should('be.visible'); //todo: it is better to check policy list to contain each of item, because this links could be in another section
        cy.contains('a', 'COOKIE POLICY').should('be.visible');
        cy.contains('a', 'OPEN SOURCE').should('be.visible');
        cy.contains('a', 'APPLICANT PRIVACY NOTICE').should('be.visible');
        cy.contains('a', 'PRIVACY POLICY').should('be.visible');
        cy.contains('a', 'WEB ACCESSIBILITY').should('be.visible');
    })
})
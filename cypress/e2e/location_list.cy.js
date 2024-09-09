describe('EPAM Location List Test', () => {
    it('Visits EPAM and checks location list', () => {
        const americaRegionbutton = "//a[contains(text(),'AMERICA')]";
        const emeaRegionbutton = "//a[contains(text(),'AMERICA')]";
        const apacRegionbutton = "//a[contains(text(),'AMERICA')]";
        const regions = ['AMERICAS', 'EMEA', 'APAC'];
        
        cy.visit('/');
        cy.xpath(americaRegionbutton).should('be.visible');
        cy.xpath(emeaRegionbutton).should('be.visible');
        cy.xpath(apacRegionbutton).should('be.visible');

        regions.forEach(region => {
            cy.contains('a', region).click()
            cy.contains('a', region).should('have.class', 'active') //todo no need to use cy.contains one 2 times, just continue the chain
        });

    })
})
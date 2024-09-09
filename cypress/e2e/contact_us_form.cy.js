describe('EPAM Contuct Us form', () => {
    it('Check reqired fiedls validation', () => {
        
        cy.visit('https://www.epam.com/about/who-we-are/contact');
        cy.xpath("//button[@type='submit']").click();

        cy.xpath('//input[@name="user_first_name" and @aria-invalid="true"]')
            .should('exist');
        cy.xpath('//input[@name="user_last_name" and @aria-invalid="true"]')
            .should('exist');
        cy.xpath('//input[@name="user_email" and @aria-invalid="true"]')
            .should('exist');
        cy.xpath('//input[@name="user_phone" and @aria-invalid="true"]') //todo: need to check at least one field for false
            .should('exist');  
        cy.xpath('//span[@aria-describedby="_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_comment_how_hear_about-error" and @aria-invalid="true"]')
            .should('exist');
        cy.xpath('//span[@id="new_form_gdprConsent-error" and contains(text(),"Please check this box if you want to proceed")]')
            .should('exist');
    })
})
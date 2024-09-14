import BasePage from '../PageObject/base_page'

class ContactUsPage extends BasePage {

    get contactUsSubmitButton() {
        return cy.get(".button-ui");
    }

    get firstNameField() {
        return cy.get("[name='user_first_name']");
    }

    get lastNameField() {
        return cy.get("[name='user_last_name']");
    }

    get userEmailField() {
        return cy.get("[name='user_email']");
    }

    get userPhoneField() {
        return cy.get("[name='user_phone']");
    }

    get userCompanyField() {
        return cy.get("[name='user_company']");
    }

    get commentField() {
        return cy.get("[name='user_comment']");
    }

    get howDidYouHearField() {
        return cy.get("[aria-labelledby='_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_comment_how_hear_about-label select2-_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_comment_how_hear_about-container']");
    }

    visitUrl(url = "https://www.epam.com/about/who-we-are/contact") {
        return cy.visit(url);
    }

    submitForm() {
        this.contactUsSubmitButton.click();
    }
}

export const contactUsPage = new ContactUsPage();

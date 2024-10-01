import BasePage from '../PageObject/base_page'

class ContactUsPage extends BasePage {

    get contactUsSubmitButton() {
        return cy.get(".button-ui");
    }

    visitUrl(url = "https://www.epam.com/about/who-we-are/contact") {
        cy.visit(url);
        return this
    }

    clickContactUsSubmitButton() {
        return this.contactUsSubmitButton.click();
    }
}

export const contactUsPage = new ContactUsPage();

export default class BasePage {

    get headerLogo() {
        return cy.get(".header__logo-link");
    };

    visitUrl(url = "https://www.epam.com/") {
        cy.visit(url);
        return this
    };

    clickOnElement(element) {
        element.click();
        return this
    }

    urlCheck(url) {
        cy.url().should('eq', url);
        return this
    }
}

export const basePage = new BasePage();

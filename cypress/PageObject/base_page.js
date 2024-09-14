export default class BasePage {

    get headerLogo() {
        return cy.get(".header__logo-link");
    };

    visitUrl(url = "https://www.epam.com/") {
        return cy.visit(url);
    }
}

export const basePage = new BasePage();
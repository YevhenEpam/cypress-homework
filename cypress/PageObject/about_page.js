import BasePage from '../PageObject/base_page'

class AboutPage extends BasePage {
    visitUrl(url = "https://www.epam.com/about") {
        cy.visit(url);
        return this
    }

    get downloadButton() {
        return cy.get(".button__wrapper > a[download='']");
    }
}

export const aboutPage = new AboutPage();
import BasePage from '../PageObject/base_page'

class HomePage extends BasePage {

    get themeMode() {
        return cy.get(".theme-switcher-label");
    };

    get themeModeButton() {
        return cy.get(".header__vaulting-container .switch");
    };

    get languageArrowButton() {
        return cy.get(".location-selector__button .location-selector__button-arrow-wrapper");
    };

    get uaLanguageButton() {
        return cy.get("ul.location-selector__list [lang='uk']");
    };

    get searchButton() {
        return cy.get("button.header-search__button.header__icon");
    };

    get searchFieldInput() {
        return cy.get("input#new_form_search");
    };

    get findButton() {
        return cy.get(".custom-button");
    };

    get searchResultList() {
        return cy.get(".search-results__items");
    };

    get searchResultItem() {
        return cy.get(".search-results__item");
    };

    get searchResultTitle() {
        return cy.get(".search-results__title-link");
    };

    get searchResultDescription() {
        return cy.get(".search-results__description");
    };

    get downloadButton() {
        return cy.get(".button__wrapper > a[download='']");
    };

    get vacanciesButton() {
        return cy.get("span a[href='/vacancies']");
    };

    get vacanciesButtonSelector() {
        return "span a[href='/vacancies']";
      }

      visitUrl(url = "https://www.epam.com/") {
        cy.visit(url);
        return this;
    }

    typeInSearchField(keyword) {
        this.searchButton.click();
        this.searchFieldInput.type(keyword);
        this.findButton.click();
        return this;
    }

    pageException() {
        cy.on('uncaught:exception', (err) => {
            if (err.message.includes('Things went bad')) {
                return false; 
            }
            throw err;
        });
        return this;
    }

    themeCheck() {
        this.themeMode.invoke('text').then((initialTheme) => {
  
            this.themeModeButton.click();
            this.themeMode.invoke('text').should('not.eq', initialTheme);
          });
        return this
    }

    policyLinks(link) {
        return cy.get(link.container).contains('a', link.text);
    }

    locationCheck (locationList) {
        locationList.forEach(region => {
            cy.contains('a', region)
              .should('be.visible')
              .and('have.attr', 'role', 'tab') 
              .click();
    
            cy.contains('a', region)
              .should('have.class', 'active')
              .and('attr', 'aria-selected', 'true');
          });
    }

    validateSearchResults(searchKeyword) {
        this.searchResultItem.should('have.length.greaterThan', 0, 'No results found.');
        this.searchResultItem.each((_, index) => {
            this.searchResultTitle.eq(index).invoke('text').then((titleText) => {
                this.searchResultDescription.eq(index).invoke('text').then((descriptionText) => {
                    expect(
                        titleText.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                        descriptionText.toLowerCase().includes(searchKeyword.toLowerCase())
                    ).to.be.true;
                });
            });
        });
        return this;
    }
}

export const homePage = new HomePage();
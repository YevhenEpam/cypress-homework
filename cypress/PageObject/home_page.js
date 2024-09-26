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

    typeInSearchField(keyword) {//todo: name's method is not full, you are not only typing, you are clicking on findButton then
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

    themeCheck() { //todo: you should not have methods with checking (exception - if it is long or complicated)
        this.themeMode.invoke('text').then((initialTheme) => {
  
            this.themeModeButton.click(); //todo: you can create a method clickThemeMode() and put this line inside it, then use it in test
            this.themeMode.invoke('text').should('not.eq', initialTheme);
          });
        return this
    }

    policyLinksCheck(policyLinks) {
        policyLinks.forEach(link => {
            cy.get(link.container).contains('a', link.text).should('be.visible');
          });
        return this
    }

    locationCheck (locationList) {
        locationList.forEach(region => {
            cy.contains('a', region) //todo: you can create method clickLocationTab(region) and put lines 101-104 inside
              .should('be.visible')
              .and('have.attr', 'role', 'tab') //todo: what is the purpose of this check?
              .click();
    
            cy.contains('a', region)
              .should('have.class', 'active')
              .and('attr', 'aria-selected', 'true');
          });
    }

    validateSearchResults(searchKeyword) {
        this.searchResultItem.should('have.length.greaterThan', 0, 'No results found.');//todo: what is the purpose of last parameter here?
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
    //todo: this method is too complicated: probably it is enough (but put such lines on the spec file, not in method)
    // this.searchResultItem
    //      .should('be.visible')
    //      .each(($article) =>
    //           cy.wrap($article).should('contain', 'AI'))
    //     });
}

export const homePage = new HomePage();
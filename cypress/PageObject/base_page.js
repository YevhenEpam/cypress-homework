export default class BasePage { //todo: you need to get a practice with inheritance Base Page (contains all elements, that are present on all pages), HomePage (class HomePage extends BasePage ),
    // todo - AboutPage, ContuctUsPage extends Base Page as well

    static themeMode = ".theme-switcher-label"; //todo: please do not put locator in string - just use it in getters, here is example:
    // get themeMode() {
    // return cy.get('.theme-switcher-label');
    // };
    static buttonThemeMode = ".header__vaulting-container .switch"; //todo: please write the type of element at the end of name: buttonThemeModeSwitcher (for all your locators)
    static languageButtonArrow = ".location-selector__button .location-selector__button-arrow-wrapper";
    static uaLanguage = "a[href='https://careers.epam.ua'][lang='uk']";//todo: the type of element - put it in the name, and please do not use such locator, that includes eq[1], I wrote you an example last time
    static vacanciesButton = "span a[href='/vacancies']";
    static searchField = "input#new_form_search";
    static searchButton = "button.header-search__button.header__icon"; //todo:
    // get searchButton() {
    // return cy.get('button.header-search__button.header__icon');
    // };
    static findButton = ".custom-button";
    static searchResults = ".search-results__items";
    static searchResult = ".search-results__item";
    static searchResultTitle = ".search-results__title-link";
    static searchResultDescription = ".search-results__description";
    static contactUsSubmit = ".button-ui";
    static firstNameField = "[name='user_first_name']";
    static lastNameField = "[name='user_last_name']";
    static userEmailField = "[name='user_email']";
    static userPhonefield = "[name='user_phone']";
    static userCompanyfield = "[name='user_company']";
    static commentField = "[name='user_comment']";
    static howDidYouHearField = "[aria-labelledby='_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_comment_how_hear_about-label select2-_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_comment_how_hear_about-container']";
    static headerLogo = ".header__logo-link";
    static downloadButton = ".button__wrapper > a[download='']";
    

    static policyLinks = [
        { text: 'INVESTORS', container: '.policies-left' },
        { text: 'COOKIE POLICY', container: '.policies-left' },
        { text: 'OPEN SOURCE', container: '.policies-left' },
        { text: 'PRIVACY POLICY', container: '.policies-left' },
        { text: 'APPLICANT PRIVACY NOTICE', container: '.policies-right' },
        { text: 'WEB ACCESSIBILITY', container: '.policies-right' },
        { text: 'UK MODERN SLAVERY STATEMENT', container: '.policies-right' },
        { text: 'Recruitment Fraud Disclaimer', container: '.policies-right' }
    ];

    static regions = ['AMERICAS', 'EMEA', 'APAC']; // todo: it is a data, so you should keep it on the spec file;
    
    static typeInSearchField(keyword) { //todo: you should not keep cy.get in methods, but in return value (you need to refactor as in my example line 3):
        //todo: your method's name is about typing, and inside of it you are also clicking on Find button - method's name should be correspond with actions inside.
        //this.searchButton.click();
        //this.searchField.type(keyword);
        //this.findButton.click();
        cy.get(this.searchButton).click();
        cy.get(this.searchField).type(keyword);
        cy.get(this.findButton).click();
    }

    static contuctUsFields = { // todo: it is a data, so you should keep it on the spec file;
        [this.firstNameField]: 'true',
        [this.firstNameField]: 'true',
        [this.userEmailField]: 'true',
        [this.userPhonefield]: 'true',
        [this.userCompanyfield]: 'false',
        [this.commentField]: 'false',
        [this.howDidYouHearField]: 'true'
      };

}
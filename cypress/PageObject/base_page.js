export default class BasePage {

    static themeMode = ".theme-switcher-label";
    static buttonThemeMode = ".header__vaulting-container .switch";
    static languageButtonArrow = ".location-selector__button .location-selector__button-arrow-wrapper";
    static uaLanguage = "a[href='https://careers.epam.ua'][lang='uk']";
    static vacanciesButton = "span a[href='/vacancies']";
    static searchField = "input#new_form_search";
    static searchButton = "button.header-search__button.header__icon";
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

    static regions = ['AMERICAS', 'EMEA', 'APAC'];
    
    static typeInSearchField(keyword) {
        cy.get(this.searchButton).click();
        cy.get(this.searchField).type(keyword);
        cy.get(this.findButton).click();
    }

    static contuctUsFields = {
        [this.firstNameField]: 'true',
        [this.firstNameField]: 'true',
        [this.userEmailField]: 'true',
        [this.userPhonefield]: 'true',
        [this.userCompanyfield]: 'false',
        [this.commentField]: 'false',
        [this.howDidYouHearField]: 'true'
      };

}
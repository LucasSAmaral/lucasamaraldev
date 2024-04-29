import CONFIG from '../../generated-config.json';

const { locale } = CONFIG;

describe('Site navigation', () => {
  it('should go through all pages navigating using the menu', () => {
    cy.visit('/');

    cy.getDataCy('selfie').should('exist');
    cy.getDataCy('title').contains(locale.commonLocale.name);
    cy.getDataCy('subtitle').contains(locale['pt'].home.profission);

    cy.getDataCy('about-me-option').click();
    cy.get('body').contains(`${locale['pt'].aboutMe.paragraph1}`);

    cy.getDataCy('work-experience-option').click();
    cy.get('body').contains(locale['pt'].workExperience.company1.periodWorked);

    cy.getDataCy('desk-card-component').then(el => {
      el[0].click();
    });

    cy.get('.modal-content').contains(locale['pt'].workExperience.modalCommonTitle.companyName);

    cy.wait(1000).then(() => {
      cy.get('.close-modal').click();
    });

    cy.getDataCy('home-option').click();
    cy.getDataCy('selfie').should('exist');
  });
});

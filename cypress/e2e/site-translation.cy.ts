import CONFIG from '../../generated-config.json';

const { locale } = CONFIG;

describe('Site translation', () => {
  it('should check if all site is translated', () => {
    cy.visit('/');

    cy.getDataCy('language-button').click();
    cy.getDataCy('en').click();
    cy.getDataCy('subtitle').contains(locale['en'].home.profission);

    cy.getDataCy('about-me-option').click();
    cy.get('body').contains(locale['en'].aboutMe.paragraph1);

    cy.getDataCy('work-experience-option').click();
    cy.get('body').contains(locale['en'].workExperience.company1.periodWorked);

    cy.getDataCy('desk-card-component').then(el => {
      el[0].click();
    });

    cy.get('.modal-content').contains(locale['en'].workExperience.modalCommonTitle.companyName);
  });
});

import CONFIG from '../../generated-config.json';

const { locale } = CONFIG;

describe('Site translation', () => {
  it('should check if all site is translated', () => {
    cy.visit('/');

    cy.get('[data-cy=en-us]').click();
    cy.get('[data-cy=subtitle]').contains(locale['en-us'].home.profission);

    cy.get('[data-cy=about-me-option]').click();
    cy.get('body').contains(locale['en-us'].aboutMe.paragraph1);

    cy.get('[data-cy=work-experience-option]').click();
    cy.get('body').contains(locale['en-us'].workExperience.company1.periodWorked);

    cy.get('[data-cy=desk-card-component]').then(el => {
      el[0].click();
    });

    cy.get('.modal-content').contains(locale['en-us'].workExperience.modalCommonTitle.companyName);
  });
});

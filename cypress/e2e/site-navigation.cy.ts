import CONFIG from '../../generated-config.json';

const { locale } = CONFIG;

describe('Site navigation', () => {
  it('should go through all pages navigating using the menu', () => {
    cy.visit('/');

    cy.get('[data-cy=selfie]').should('exist');
    cy.get('[data-cy=title]').contains(locale.commonLocale.name);
    cy.get('[data-cy=subtitle]').contains(locale['pt-br'].home.profission);

    cy.get('[data-cy=about-me-option]').click();
    cy.get('body').contains(`${locale['pt-br'].aboutMe.paragraph1}`);

    cy.get('[data-cy=work-experience-option]').click();
    cy.get('body').contains(locale['pt-br'].workExperience.company1.periodWorked);

    cy.get('[data-cy=desk-card-component]').then(el => {
      el[0].click();
    });

    cy.get('.modal-content').contains(locale['pt-br'].workExperience.modalCommonTitle.companyName);

    cy.wait(1000).then(() => {
      cy.get('.close-modal').click();
    });

    cy.get('[data-cy=home-option]').click();
    cy.get('[data-cy=selfie]').should('exist');
  });
});

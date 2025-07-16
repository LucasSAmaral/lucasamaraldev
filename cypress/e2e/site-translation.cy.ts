import CONFIG from '../../generated-config.json';

const { locale } = CONFIG;

describe('Site translation', () => {
  it('should check if all site is translated after clicking on language-button', () => {
    cy.visit('/');

    cy.getDataCy('language-button').click();
    cy.getDataCy('en').click();
    cy.getDataCy('subtitle').contains(locale['en'].home.profission);

    cy.getDataCy('about-me-option').click();
    cy.get('body').contains(locale['en'].aboutMe.paragraph1);

    cy.getDataCy('work-experience-option').click();
    cy.get('body').contains(locale['en'].workExperience.company1.periodWorked);

    // cy.getDataCy('desk-card-component').then(el => {
    //   el[0].click();
    // });

    // cy.get('.modal-content').contains(locale['en'].workExperience.modalCommonTitle.companyName);

    // cy.wait(1000).then(() => {
    //   cy.get('.close-modal').click();
    // });

    cy.getDataCy('contact-option').click();
    cy.get('body').contains(locale['en'].contact.form.labels.fromName);
    cy.get('body').contains(locale['en'].contact.form.labels.replyTo);
    cy.get('body').contains(locale['en'].contact.form.labels.subject);
    cy.get('body').contains(locale['en'].contact.form.labels.message);
    cy.get('body').contains(locale['en'].contact.form.sendButtonText);
  });

  it.skip('should check if all site is translated after loading with lang queryParam', () => {
    cy.visit('/?lang=en');

    cy.getDataCy('subtitle').contains(locale['en'].home.profission);

    cy.getDataCy('about-me-option').click();
    cy.get('body').contains(locale['en'].aboutMe.paragraph1);

    cy.getDataCy('work-experience-option').click();
    cy.get('body').contains(locale['en'].workExperience.company1.periodWorked);

    cy.getDataCy('contact-option').click();
    cy.get('body').contains(locale['en'].contact.form.labels.fromName);
    cy.get('body').contains(locale['en'].contact.form.labels.replyTo);
    cy.get('body').contains(locale['en'].contact.form.labels.subject);
    cy.get('body').contains(locale['en'].contact.form.labels.message);
    cy.get('body').contains(locale['en'].contact.form.sendButtonText);
  });
});

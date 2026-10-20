import React from 'react';
import ExperienceCardComponent from '../ExperienceCard.component';
import CONFIG from '../../../../../generated-config.json';

const { locale } = CONFIG;

const companyLocale = locale.pt.workExperience.company1;

describe('<ExperienceCardComponent />', () => {
  beforeEach(() => {
    cy.mount(<ExperienceCardComponent companyOption="company1" />);
  });

  it('should render company name, role and period', () => {
    cy.get('article').within(() => {
      cy.get('h2').should('have.text', companyLocale.companyName);
      cy.contains(companyLocale.function).should('be.visible');
      cy.contains(companyLocale.periodWorked).should('be.visible');
    });
  });

  it('should expose the company name as an accessible button', () => {
    cy.getDataCy('experience-card')
      .should('match', 'button')
      .and('have.attr', 'type', 'button')
      .and('have.text', companyLocale.companyName);
  });

  it('should make the whole card clickable through the button overlay', () => {
    cy.getDataCy('experience-card').then(el => {
      const after = window.getComputedStyle(el[0], '::after');

      expect(after.getPropertyValue('position')).to.eq('absolute');
      expect(after.getPropertyValue('inset')).to.eq('0px');
    });
  });
});

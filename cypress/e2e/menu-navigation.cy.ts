describe('Menu Navigation', () => {
  it('should go through all pages navigating using the menu', () => {
    cy.visit('/');

    cy.get('[data-cy=about-me-option]').click();
    cy.get('body').contains('Meu nome é Lucas Amaral.');
    cy.get('[data-cy=work-experience-option]').click();
    cy.get('body').contains('Abril de 2019 - Atualmente');
    cy.get('[data-cy=home-option]').click();
    cy.get('[data-cy=selfie]').should('exist');
  });
});

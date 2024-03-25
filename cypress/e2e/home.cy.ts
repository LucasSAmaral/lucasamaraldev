describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render home page properly in portuguese', () => {
    cy.get('[data-cy=selfie]').should('exist');
    cy.get('[data-cy=title]').contains('Lucas Amaral');
    cy.get('[data-cy=subtitle]').contains('Desenvolvedor Front-End');
  });

  it('should render home page properly in english', () => {
    cy.get('[data-cy=en-us]').click();
    cy.get('[data-cy=subtitle]').contains('Front-End Developer');
  });
});

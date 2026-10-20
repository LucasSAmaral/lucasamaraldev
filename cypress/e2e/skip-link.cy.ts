describe('Skip link', () => {
  const isAboveViewport = ($el: JQuery<HTMLElement>) => $el[0].getBoundingClientRect().bottom <= 0;

  const visitAndWaitForPage = (url: string) => {
    cy.visit(url);
    cy.get('main#conteudo h1').should('be.visible');
  };

  it('should stay hidden until it receives keyboard focus', () => {
    visitAndWaitForPage('/work-experience');

    cy.getDataCy('skip-link').should($link => {
      expect(isAboveViewport($link)).to.equal(true);
    });

    cy.press(Cypress.Keyboard.Keys.TAB);

    cy.focused()
      .should('have.attr', 'data-cy', 'skip-link')
      .and('have.text', 'Pular para o conteúdo')
      .and($link => {
        expect($link[0].getBoundingClientRect().top).to.be.at.least(0);
      });
  });

  it('should move focus to the main content on Enter', () => {
    visitAndWaitForPage('/work-experience');

    cy.press(Cypress.Keyboard.Keys.TAB);
    cy.focused().should('have.attr', 'data-cy', 'skip-link');

    cy.press(Cypress.Keyboard.Keys.ENTER);
    cy.focused().should('have.attr', 'id', 'conteudo');

    cy.press(Cypress.Keyboard.Keys.TAB);
    cy.focused().should('have.attr', 'data-cy', 'experience-card');
  });

  it('should hide again and go on to the header when Tab is pressed instead', () => {
    visitAndWaitForPage('/work-experience');

    cy.press(Cypress.Keyboard.Keys.TAB);
    cy.press(Cypress.Keyboard.Keys.TAB);

    cy.focused().should('have.attr', 'data-cy', 'logo');
    cy.getDataCy('skip-link').should($link => {
      expect(isAboveViewport($link)).to.equal(true);
    });
  });

  it('should be translated to english', () => {
    visitAndWaitForPage('/?lang=en');

    cy.press(Cypress.Keyboard.Keys.TAB);

    cy.focused().should('have.text', 'Skip to content');
  });
});

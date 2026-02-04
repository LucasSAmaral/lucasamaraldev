describe('Contact form', () => {
  const objTest = {
    fromName: 'Lucas Amaral',
    replyTo: 'lucas@gmail.com',
    subject: 'Teste',
    message: 'Testando o preenchimento do formulário.',
  };

  it('should test label animation', () => {
    cy.visit('/contact');

    cy.get('#fromName-wrapper label').should('have.css', 'top', '7px');

    cy.get('#fromName').click();

    cy.wait(1000).then(() => {
      cy.get('#fromName-wrapper label').should('have.css', 'top', '-27px');
    });
  });

  it('should send message successfully', () => {
    cy.intercept(
      {
        method: 'POST',
        url: '/api/contact',
        hostname: 'localhost',
      },
      { statusCode: 200 },
    ).as('action');
    cy.visit('/contact');

    cy.get('#fromName').type(objTest.fromName);
    cy.get('#replyTo').type(objTest.replyTo);
    cy.get('#subject').type(objTest.subject);
    cy.get('#message').type(objTest.message);

    cy.getDataCy('send-button')
      .click()
      .wait(1000)
      .then(() => {
        cy.get('.sent-message').contains('Mensagem enviada');
        cy.get('.sent-message').contains('Entraremos em contato em breve.');
      });
  });

  it('should show error messages when form is not filled', () => {
    cy.visit('/contact');

    cy.getDataCy('send-button').click();

    cy.get('#fromName-wrapper').contains('O campo Nome é obrigatório');
    cy.get('#replyTo-wrapper').contains('O campo E-mail é obrigatório');
    cy.get('#subject-wrapper').contains('O campo Assunto é obrigatório');
    cy.get('#message-wrapper').contains('O campo Mensagem é obrigatório');
  });
});

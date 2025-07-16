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

  it.skip('should send message successfully', () => {
    cy.intercept(
      {
        method: 'POST',
        url: '/contact',
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
      .wait('@action')
      .then(req => {
        const sentValues = JSON.parse(req.request.body)[0];

        expect(sentValues['fromName']).to.eq(objTest.fromName);
        expect(sentValues['replyTo']).to.eq(objTest.replyTo);
        expect(sentValues['subject']).to.eq(objTest.subject);
        expect(sentValues['message']).to.eq(objTest.message);

        cy.get('.sent-message').contains('Mensagem enviada');
        cy.get('.sent-message').contains('Entraremos em contato em breve.');
      });
  });

  it.skip('should show error message and try again', () => {
    cy.intercept(
      {
        method: 'POST',
        url: '/contact',
        hostname: 'localhost',
      },
      { forceNetworkError: true },
    ).as('actionError');

    cy.visit('/contact');

    cy.get('#fromName').type(objTest.fromName);
    cy.get('#replyTo').type(objTest.replyTo);
    cy.get('#subject').type(objTest.subject);
    cy.get('#message').type(objTest.message);

    cy.getDataCy('send-button')
      .click()
      .wait('@actionError')
      .then(() => {
        cy.get('.error-message').contains('Opa...');
        cy.get('.error-message').contains('Ocorreu um erro ao enviar a mensagem.');
      });

    cy.intercept(
      {
        method: 'POST',
        url: '/contact',
        hostname: 'localhost',
      },
      { forceNetworkError: false },
    ).as('actionSuccess');

    cy.get('.error-message button')
      .click()
      .wait('@actionSuccess')
      .then(() => {
        cy.get('.sent-message').contains('Mensagem enviada');
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

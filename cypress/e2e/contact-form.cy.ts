describe('Contact form', () => {
  const objTest = {
    fromName: 'Lucas Amaral',
    replyTo: 'lucas@gmail.com',
    subject: 'Teste',
    message: 'Testando o preenchimento do formulário.',
  };

  it('should test label animation', () => {
    cy.visit('/contact');

    cy.get('#fromName-wrapper label').then(el => {
      const top = el[0].ownerDocument.defaultView?.getComputedStyle(el[0]).top;
      expect(top).to.eq('7px');
    });

    cy.get('#fromName').click();

    cy.wait(1000).then(() => {
      cy.get('#fromName-wrapper label').then(el => {
        const top = el[0].ownerDocument.defaultView?.getComputedStyle(el[0]).top;
        expect(top).to.eq('-27px');
      });
    });
  });

  it('should send message successfully', () => {
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
});

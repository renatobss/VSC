describe('Teste ', () => {
  it('Primeiro teste', () => {
    cy.visit(Cypress.config('URL'));
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    //cy.contains('Success').should('be.visible');
  });
});
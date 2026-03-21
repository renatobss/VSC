Cypress.Commands.add('login', (username, password) => {
  cy.get('[data-test="username"]').clear().type(username)
  cy.get('[data-test="password"]').clear().type(password)
  cy.get('[data-test="login-button"]').click()
})

Cypress.Commands.add('adicionarItem', (produtos) => {
  produtos.forEach((produto, i) => {
    cy.get('[data-test="inventory-item-name"]').each(($el) => {
      if ($el.text().includes(produto)) {     
        cy.wrap($el).parent().parent().parent().find('button').click()
      }
    })
  }) 
})

Cypress.Commands.add('logout', () => {
  cy.get('#react-burger-menu-btn').should('be.visible').click()
  cy.get('[data-test="logout-sidebar-link"]').click()
})

// arrumar essa função
Cypress.Commands.add('validarCamposObrigatorios', (campo, mensagem) => {
  cy.get(`[data-test="${campo}"]`).invoke('val').then((val) => {
    if (val === '') {
      cy.get('[data-test="error"]').should('be.visible').and('contain', mensagem)
    }
  })
})

// arrumar a função, talver tirar o forEach e colocar um if para validar a mensagem de erro
//tentar validar se o campo tá vazio ou não (if cy.get(`[data-test="${campo}"]`).invoke('val').then((val) => { if(val === '') {cy.get('[data-test="error"]').should('be.visible').and('contain', `${campo} is required`)}}) )
Cypress.Commands.add('validarCamposObrigatoriosMensagem', (mensagens) => {
  mensagens.forEach((mensagem) => {
    cy.get('[data-test="error"]').should('be.visible').and('contain', mensagem)
  })
})

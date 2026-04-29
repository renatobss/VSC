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

Cypress.Commands.add('validarCamposObrigatorios', (campo, mensagem) => {
  cy.get(`[data-test="${campo}"]`).invoke('val').then((val) => {
    if (val === '') {
      cy.get('[data-test="error"]').should('be.visible').and('contain', mensagem)
    }
  })
})

Cypress.Commands.add('preencherFormulario', (campos, valores) => {
  cy.log('valores dos campos: ', campos, valores)
    campos.forEach((campo, i) => {
      console.log('índice: ', i, 'campo: ', campo, 'valor: ', valores[i])
      cy.get(`[data-test="${campo}"]`).clear().type(valores[i])
    })
})

// criar uma nova função para usar um array de objetos com os campos e valores a serem preenchidos, para evitar a repetição de código
Cypress.Commands.add('preencherFormularioComArrayDeObjetos', (camposValores) => {
  cy.log('valores dos campos: ', camposValores)
  camposValores.forEach((campoValor) => {
    const { campo, valor } = campoValor
    cy.get(`[data-test="${campo}"]`).clear().type(valor)
  })
})



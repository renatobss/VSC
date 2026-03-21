describe('Teste ', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Deve fazer login com sucesso', () => {
    cy.login('standard_user', 'secret_sauce')
    cy.url().should('include', '/inventory.html')
  })

  it('Deve falhar ao fazer login com credenciais inválidas', () => {
    cy.login('standard_user', 'invalid_password')  //invalid_password
    cy.get('[data-test="error"]')
    .should('be.visible')
    .and('contain', 'Epic sadface: Username and password do not match any user in this service')
  })

  it('Deve falhar ao fazer login com campos vazios', () => {
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="error"]')
    .should('be.visible')
    .and('contain', 'Epic sadface: Username is required')
  })

  it('Deve falhar ao fazer login com usuário bloqueado', () => {
    cy.login('locked_out_user', 'secret_sauce')
    cy.get('[data-test="error"]')
    .should('be.visible')
    .and('contain', 'Epic sadface: Sorry, this user has been locked out.')
  })

  // No próximo dia inserir um if pra validar quando o usuário não consegue logar devido usuário inválido
  it('Deve fazer login com mais de um usuário', () => {
    const usuarios = [
      { username: 'visual_user', password: 'secret_sauce' },
      { username: 'sdfsadfas', password: 'secret_sauce' },
      { username: 'standard_user', password: 'secret_sauce' }
    ]
    usuarios.forEach((usuario) => {
      cy.login(usuario.username, usuario.password)
      cy.url().then((url) => {
        if(url.includes('/inventory.html')) {
          cy.log(`Login bem-sucedido para o usuário: ${usuario.username}`)
          cy.logout()
        } else {
          cy.log(`Falha no login para o usuário: ${usuario.username}`)
        }
      })
    })
  })

  it('Deve fazer logout com sucesso', () => {
    cy.login('standard_user', 'secret_sauce')
    cy.logout()
    cy.url().should('equal', 'https://www.saucedemo.com/')
  })

  it('Deve adicionar itens ao carrinho', () => {
    cy.login('standard_user', 'secret_sauce')
    const produtos = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Test.allTheThings() T-Shirt (Red)']
    cy.log('posição do produto: ', produtos.length)
    cy.adicionarItem(produtos)
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', produtos.length.toString())
  })

  it('Deve acessar o carrinho', () => {
    cy.login('standard_user', 'secret_sauce')
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.location('pathname').should('equal', '/cart.html')
  })

  it('Não deve clicar no botão de checkout sem itens no carrinho', () => {
    cy.login('standard_user', 'secret_sauce')
    //cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="shopping-cart-link"]').click()

    cy.get('[data-test="cart-list"]').then(($body) => {
      const teste = $body.find('[data-test="inventory-item"]')
      cy.log('o que veio no teste: ', teste.length)
      if (teste.length === 0) {
        cy.log('O carrinho está vazio')
      } else {
        cy.get('[data-test="checkout"]').click()
      }
    })
  })

  it('Deve preencher o formulário de checkout',() => {
    cy.login('standard_user', 'secret_sauce')
    const produtos = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Test.allTheThings() T-Shirt (Red)']
    cy.adicionarItem(produtos)

    cy.get('[data-test="shopping-cart-link"]').then(($el) => {
      const existe = $el.find('[data-test="shopping-cart-badge"]').text()
      if(existe !== '') {
        cy.log('existe o badge: ', existe)
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('Juca')
        cy.get('[data-test="lastName"]').type('Bala')
        cy.get('[data-test="postalCode"]').type('12345')
        cy.get('[data-test="continue"]').click()
        cy.url().should('include', '/checkout-step-two.html')
      }else {
        cy.logout()
        cy.log('não existe o badge')
      }
    })
  })

  it('Deve validar os campos obrigatórios do checkout', () => {
    cy.login('standard_user', 'secret_sauce')
    const produtos = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Test.allTheThings() T-Shirt (Red)']
    cy.adicionarItem(produtos)
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.get('[data-test="checkout"]').click()
    cy.get('[data-test="continue"]').click()
    cy.validarCamposObrigatorios('firstName', 'First Name is required')
  })

  //Próximas implementações: 
    // validar o valor total do carrinho
    // finalizar a compra e validar a mensagem de compra finalizada, 
    // validar o botão de voltar para home
    // criar função para validar os campos obrigatórios de todas as telas, como por exemplo: login, checkout, etc

})
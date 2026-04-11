// validar o botão de voltar para shopping / products
// próximo dia subir as alterações para o repositório e criar um pull request
describe('Testes de Ações',() => {
  beforeEach(() => {
    cy.visit('/')
    cy.login('standard_user', 'secret_sauce')
  })
    it('Deve retornar para a página de produtos', () => {
      cy.adicionarItem(['Sauce Labs Backpack'])
      cy.get('[data-test="shopping-cart-link"]').then(($el) => {
        const existe = $el.find('[data-test="shopping-cart-badge"]').text()
        cy.log('o que tá vindo no el: ', $el)
        if(existe !== '') {
          cy.log('existe o badge: ', existe)
          cy.get('[data-test="shopping-cart-link"]').click()
          cy.get('[data-test="continue-shopping"]').click()
          cy.url().should('include', '/inventory.html')
          } else {
            cy.log('não existe o badge')
            cy.logout()
            }
        })
    })
})  


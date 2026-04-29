// no próximo dia finalizar a validação do total dos itens
describe('Validação dos totais da compra', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.login('standard_user', 'secret_sauce')
  })
    it('Deve validar o total dos itens antes de finalizar a compra ', () => {
      const produtos = ['Sauce Labs Backpack', 'Test.allTheThings() T-Shirt (Red)']
      cy.adicionarItem(produtos)
      cy.get('[data-test="shopping-cart-link"]').click()
      cy.get('[data-test="checkout"]').click()
      const camposValores = [
        { campo: 'firstName', valor: 'Juca' },
        { campo: 'lastName', valor: 'Bala' },
        { campo: 'postalCode', valor: '12345' } 
      ]
      cy.preencherFormularioComArrayDeObjetos(camposValores)
      cy.get('[data-test="continue"]').click()
      cy.url().should('include', '/checkout-step-two.html')

      cy.get('[data-test="inventory-item-price"]').then(($precos) => {
        cy.log('preços dos itens: ', $precos)
        const precos = []
        let soma = 0
        $precos.each((i, preco) => {
          precos.push(parseFloat(preco.innerText.replace('$', '')))
          console.log('precos dos itens: ', precos[i])
          soma = soma + precos[i]
        })
        console.log('soma dos preços: ', soma)
        cy.get('[data-test="subtotal-label"]').then(($subtotal) => {
          console.log('valor do subtotal: ', $subtotal.text())
        const valorSubtotal = parseFloat($subtotal.text().replace('Item total: $', ''))
        console.log('valor do subtotal: ', valorSubtotal)
        expect(soma).to.equal(valorSubtotal)
        })
      })
  })
})

//const teste = document.querySelector('[data-test="subtotal-label"]')
//console.log(teste)
//console.dir(teste)
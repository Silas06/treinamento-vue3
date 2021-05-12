const API_URL = process.env.API_URL || 'http://localhost:8081/'
describe('Widget', () => {
  it('Checando se abre o widget', () => {
    cy.visit(API_URL)
    cy.wait(2000)
    cy.get('#widget-open-button')
  })

  it('Teste botao widget, deve abrir o widget', () => {
    cy.visit(API_URL)
    cy.wait(2000)
    cy.get('#widget-open-button').click()
  })

  it('Teste botao de fechar o widget', () => {
    cy.visit(API_URL)
    cy.wait(2000)
    cy.get('#widget-open-button').click()
    cy.wait(4000)
    cy.get('#button-close-widget').click()
  })
})

const API_URL = process.env.API_URL || 'http://localhost:8080/'

describe('Home', () => {
  it('Deve renderizar o modal de create-account', () => {
    cy.visit(API_URL)

    cy.get('#cta-create-account-button').click()

    cy.get('#modal_create_account')
  })

  it('Deve renderizar o modal do de create-account botao do header', () => {
    cy.visit(API_URL)

    cy.get('#cta-create-account-button-header').click()

    cy.get('#modal_create_account')
  })

  it('teste abrir modal login', () => {
    cy.visit(API_URL)

    cy.get('#cta-login').click()

    cy.get('#modal-login')
  })

  it('Login com email e password deve redirecionar para Feedbacks', () => {
    cy.visit(API_URL)

    cy.get('#cta-login').click()
    cy.get('#modal-login')

    cy.get('#email-field').type('igor@igor.me')
    cy.get('#password-field').type('1234')
    cy.get('#submit-button').click()

    cy.url().should('include', '/feedbacks')
  })

  it('Deve mostrar mensagm de erro no campo email', () => {
    cy.visit(API_URL)

    cy.get('#cta-login').click()
    cy.get('#modal-login')

    cy.get('#email-field').type('igor@')
    cy.get('#password-field').type('1234')
    cy.get('#submit-button').click()

    cy.get('#email-error')
  })

  it('Testa o funcionamento do botao logout', () => {
    cy.visit(API_URL)

    cy.get('#cta-login').click()
    cy.get('#modal-login')

    cy.get('#email-field').type('igor@igor.me')
    cy.get('#password-field').type('1234')
    cy.get('#submit-button').click()

    cy.url().should('include', '/feedbacks')

    cy.get('#logout-button').click()

    cy.url().should('include', '/')
  })
})

const API_URL = process.env.API_URL || 'http://localhost:8080/'

describe('teste pagina credencials', () => {
  it('Deve regerar a chave apikey', () => {
    cy.visit(API_URL)

    cy.get('#cta-login').click()
    cy.get('#modal-login')

    cy.get('#email-field').type('igor@igor.me')
    cy.get('#password-field').type('1234')
    cy.get('#submit-button').click()

    cy.wait(4000)

    cy.visit(`${API_URL}credencials`)

    cy.wait(2000)

    const apikeyAtual = cy.get('#apikey').invoke('text')

    cy.get('#generate-apikey').click()

    cy.wait(2000)

    const newApikey = cy.get('#apikey').invoke('text')

    expect(apikeyAtual).to.not.equal(newApikey)
  })
})

// node_modules\.bin\cypress run <- rodar no cmd, roda o cypress por debaixo dos panos e gera arquivos como 'video' que servem para prova de teste

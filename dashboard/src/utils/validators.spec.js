import { validadeEmptyAndLength3, validadeEmptyAndEmail } from './validators'

describe('oque estou testando? Validator Utils', () => {
  it('Meu primeiro teste, (campo valido)', () => {
    expect(validadeEmptyAndLength3('3214')).toBe(true)
  })

  it('teste aceite 2 caracteres', () => {
    expect(validadeEmptyAndLength3('1')).toBe(
      '*Este campo precisa de no minimo 3 caracteres'
    )
  })

  it('campo vazio teste', () => {
    expect(validadeEmptyAndLength3()).toBe('*Este campo é obrigatório')
  })

  it('campo email vazio', () => {
    expect(validadeEmptyAndEmail()).toBe('*Este campo é obrigatório')
  })

  it('teste se email é válido', () => {
    expect(validadeEmptyAndEmail('silas@')).toBe('*Digite um email válido')
  })

  it('teste email valido', () => {
    expect(validadeEmptyAndEmail('silas@gmail.com')).toBe(true)
  })
})

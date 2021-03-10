const faker = require('faker')
const validators = require('./validators')

describe('Validators', () => {
  describe('isValidURL', () => {
    test('Given a valid URL format, then function must return true', () => {
      // Arrange
      const url = faker.internet.url()

      // Act
      const isValid = validators.isValidURL(url)

      // Asserts
      expect(isValid).toBeTruthy()
    })
    test('Given an invalid URL format, then function must return false', () => {
      // Arrange
      const url = faker.random.alpha()

      // Act
      const isValid = validators.isValidURL(url)

      // Asserts
      expect(isValid).toBeFalsy()
    })
    test('Given an non-string param, then function must return false', () => {
      // Arrange
      const edgeCases = [null, undefined, faker.random.boolean(), faker.random.number(), {}]

      edgeCases.forEach((c) => {
        // Act
        const isValid = validators.isValidURL(c)

        // Asserts
        expect(isValid).toBeFalsy()
      })
    })
  })
})

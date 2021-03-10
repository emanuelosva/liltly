const faker = require('faker')
const makeLinkUseCases = require('./link')

describe('Link Use Cases', () => {
  describe('createShortURL', () => {
    test('Given a validURL then the function must return a short URL', async () => {
      // Arrange
      const originalUrl = faker.internet.url()
      const fullHostNameURL = faker.internet.url()
      const hash = faker.random.uuid()
      const linkObjectModel = {
        _id: faker.random.uuid,
        originalUrl,
        hash,
      }
      const dependencies = {
        model: { create: jest.fn(() => Promise.resolve(linkObjectModel))},
        hashGenerator: jest.fn(() => hash),
      }

      // Act
      const { createShortUrl } = makeLinkUseCases(dependencies)
      const shortUrl = await createShortUrl({ originalUrl, fullHostNameURL })

      // Assert
      expect(shortUrl).toBe(`${fullHostNameURL}/${hash}`)
      expect(dependencies.model.create).toHaveBeenCalledWith({ originalUrl, hash })
      expect(dependencies.hashGenerator).toHaveBeenCalledWith()
    })
    test('Given a invalid URL then the function must reject an error', async () => {
      // Arrange
      const invalidUrl = faker.internet.domainName()
      const fullHostNameURL = faker.internet.url()
      const dependencies = {
        model: { create: jest.fn() },
        hashGenerator: jest.fn(() => ''),
      }

      // Act
      const { createShortUrl } = makeLinkUseCases(dependencies)

      // Assert
      await expect(createShortUrl({ originalUrl: invalidUrl, fullHostNameURL })).rejects.toThrow()
      expect(dependencies.model.create).not.toHaveBeenCalled()
      expect(dependencies.hashGenerator).not.toHaveBeenCalledWith()
    })
    test('Given a invalid fullHostname then the function must reject an error', async () => {
      // Arrange
      const invalidUrl = faker.internet.url()
      const fullHostNameURL = faker.random.alpha()
      const dependencies = {
        model: { create: jest.fn() },
        hashGenerator: jest.fn(() => ''),
      }

      // Act
      const { createShortUrl } = makeLinkUseCases(dependencies)

      // Assert
      await expect(createShortUrl({ originalUrl: invalidUrl, fullHostNameURL })).rejects.toThrow()
      expect(dependencies.model.create).not.toHaveBeenCalled()
      expect(dependencies.hashGenerator).not.toHaveBeenCalledWith()
    })
  })
  describe('readUrlByHash', () => {
    test('Given a valid hash, then the function must return a url', async () => {
      // Arrange
      const hash = faker.random.word()
      const urlObject = {
        _id: faker.random.uuid(),
        originalUrl: faker.internet.url(),
      }
      const dependencies = {
        model: {
          findOne: jest.fn(() => Promise.resolve(urlObject))
        }
      }

      // Act
      const { readUrlByHash } = makeLinkUseCases(dependencies)
      const url = await readUrlByHash(hash)

      // Asserts
      expect(url).toEqual(urlObject)
      expect(dependencies.model.findOne).toHaveBeenCalledWith({ hash }, { _id: 1, originalUrl: 1 })
    })
    test('Given a undefined hash, then the function must reject an error', async () => {
      // Arrange
      const hash = undefined
      const dependencies = {
        model: {
          findOne: jest.fn(() => null)
        }
      }

      // Act
      const { readUrlByHash } = makeLinkUseCases(dependencies)

      // Asserts
      await expect(readUrlByHash(hash)).rejects.toThrow()
      expect(dependencies.model.findOne).not.toHaveBeenCalled()
    })
  })
})

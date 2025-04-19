import { describe, expect, beforeAll, it } from 'vitest'
import { getOmitProperties } from '../dist/index.js'
describe('getOmitProperties', () => {
  it('should omit specified properties from the object', () => {
    const source = {
      name: 'John',
      age: 30,
      city: 'New York',
    }

    const keysToOmit: Array<keyof typeof source> = ['age', 'city']

    const result = getOmitProperties(source, keysToOmit)

    expect(result).toEqual({
      name: 'John',
    })
  }
  )
  it('should return an empty object if all properties are omitted', () => {
    const source = {
      name: 'John',
      age: 30,
      city: 'New York',
    }

    const keysToOmit: Array<keyof typeof source> = ['name', 'age', 'city']

    const result = getOmitProperties(source, keysToOmit)

    expect(result).toEqual({})
  }
  )
  it('should return the same object if no properties are omitted', () => {
    const source = {
      name: 'John',
      age: 30,
      city: 'New York',
    }

    const keysToOmit: Array<keyof typeof source> = []

    const result = getOmitProperties(source, keysToOmit)

    expect(result).toEqual(source)
  }
  )
})
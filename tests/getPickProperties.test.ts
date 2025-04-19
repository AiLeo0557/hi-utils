import { describe, expect, beforeAll, it } from 'vitest'
import { getPickProperties } from '../dist/index.js'

describe('getPickProperties', () => {
  it('should return an object with the specified properties', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const picked = getPickProperties(obj, ['a', 'c'])
    expect(picked).toEqual({ a: 1, c: 3 })
  })

  it('should return an empty object if no properties are specified', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const picked = getPickProperties(obj, [])
    expect(picked).toEqual({})
  })

  // it('should return an empty object if the object is undefined', () => {
  //   const picked = getPickProperties(undefined, ['a', 'c'])
  //   expect(picked).toEqual({})
  // })
  // it('should return an empty object if the object is null', () => {
  //   const picked = getPickProperties(null, ['a', 'c'])
  //   expect(picked).toEqual({})
  // })
})
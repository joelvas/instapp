import { describe, it, expect } from 'vitest'

describe('App.jsx', () => {
  it('debería multiplicar por 2', () => {
    const numero1 = 1
    const numero2 = numero1 * 2
    expect(numero2).toBe(2)
  })
})

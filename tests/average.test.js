const average = require('../utils/for_testing').average

test('average of [1, 2, 3]', () => {
    const result = average([1, 2, 3])
    expect(result).toBe(2) 
})

test('average of [3]', () => {
    const result = average([3])
    expect(result).toBe(3) 
})

test('average of []', () => {
    const result = average([])
    expect(result).toBe(0) 
})


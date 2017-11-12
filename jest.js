const sum = (a,b)=> a+b

test('1+2 应该=3', () => {
    expect(sum(1, 2)).toBe(3);
  });
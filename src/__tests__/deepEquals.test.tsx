import { describe, expect, it } from 'vitest';
import { deepEquals } from '../@lib/equalities/deepEquals';

describe('deepEquals', () => {
  it('기본 타입 비교', () => {
    expect(deepEquals(1, 1)).toBe(true);
    expect(deepEquals('hello', 'hello')).toBe(true);
    expect(deepEquals(true, true)).toBe(true);
    expect(deepEquals(null, null)).toBe(true);
    expect(deepEquals(undefined, undefined)).toBe(true);

    expect(deepEquals(1, 2)).toBe(false);
    expect(deepEquals('hello', 'world')).toBe(false);
    expect(deepEquals(true, false)).toBe(false);
    expect(deepEquals(null, undefined)).toBe(false);
  });

  it('배열 비교', () => {
    expect(deepEquals([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(deepEquals([1, [2, 3], 4], [1, [2, 3], 4])).toBe(true);

    expect(deepEquals([1, 2, 3], [1, 3, 2])).toBe(false);
    expect(deepEquals([1, [2, 3], 4], [1, [3, 2], 4])).toBe(false);
    expect(deepEquals([1, 2], [1, 2, 3])).toBe(false);
  });

  it('객체 비교', () => {
    expect(deepEquals({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
    expect(
      deepEquals({ a: { x: 1, y: 2 }, b: 3 }, { b: 3, a: { y: 2, x: 1 } })
    ).toBe(true);

    expect(deepEquals({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
    expect(
      deepEquals({ a: { x: 1, y: 2 }, b: 3 }, { b: 3, a: { x: 1, y: 3 } })
    ).toBe(false);
    expect(deepEquals({ a: 1, b: 2 }, { a: 1 })).toBe(false);
  });

  it('복잡한 중첩 구조 비교', () => {
    const obj1 = {
      a: [1, { x: 2, y: 3 }, 4],
      b: { c: 5, d: [6, 7, 8] },
    };

    const obj2 = {
      b: { d: [6, 7, 8], c: 5 },
      a: [1, { y: 3, x: 2 }, 4],
    };

    const obj3 = {
      b: { d: [6, 7, 9], c: 5 },
      a: [1, { y: 3, x: 2 }, 4],
    };

    expect(deepEquals(obj1, obj2)).toBe(true);
    expect(deepEquals(obj1, obj3)).toBe(false);
  });
});

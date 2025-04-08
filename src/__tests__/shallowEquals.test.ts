import { describe, expect, it } from 'vitest';
import { shallowEquals } from '../@lib/equalities/shallowEquals';

describe('shallowEquals', () => {
  // 기본 타입 테스트
  it('should compare primitive values correctly', () => {
    expect(shallowEquals(1, 1)).toBe(true);
    expect(shallowEquals(1, 2)).toBe(false);
    expect(shallowEquals('a', 'a')).toBe(true);
    expect(shallowEquals('a', 'b')).toBe(false);
    expect(shallowEquals(true, true)).toBe(true);
    expect(shallowEquals(true, false)).toBe(false);
  });

  // null과 undefined 테스트
  it('should handle null and undefined correctly', () => {
    expect(shallowEquals(null, null)).toBe(true);
    expect(shallowEquals(undefined, undefined)).toBe(true);
    expect(shallowEquals(null, undefined)).toBe(false);
    expect(shallowEquals({}, null)).toBe(false);
  });

  // 객체 비교 테스트
  it('should compare objects correctly', () => {
    // 같은 객체 참조
    const obj = { a: 1, b: 2 };
    expect(shallowEquals(obj, obj)).toBe(true);

    // 같은 값을 가진 다른 객체
    expect(shallowEquals({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    expect(shallowEquals({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
    expect(shallowEquals({ a: 1 }, { a: 1, b: 2 })).toBe(false);
    expect(shallowEquals({ a: 1, b: 2 }, { a: 1 })).toBe(false);
  });

  // 중첩 객체 테스트 (얕은 비교)
  it('should perform shallow comparison for nested objects', () => {
    const obj1 = { a: { b: 1 } };
    const obj2 = { a: { b: 1 } };
    const obj3 = { a: obj1.a };

    expect(shallowEquals(obj1, obj2)).toBe(false); // 다른 참조
    expect(shallowEquals(obj1, obj3)).toBe(true); // 같은 참조
  });

  // 배열 테스트
  it('should compare arrays correctly', () => {
    const arr = [1, 2, 3];
    expect(shallowEquals(arr, arr)).toBe(true);
    expect(shallowEquals([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(shallowEquals([1, 2], [1, 2, 3])).toBe(false);
    expect(shallowEquals([{ a: 1 }], [{ a: 1 }])).toBe(false); // 다른 객체 참조
  });

  // 특수한 경우 테스트 (NaN, ±0)
  it('should handle special cases correctly', () => {
    expect(shallowEquals(NaN, NaN)).toBe(true);
    expect(shallowEquals(0, -0)).toBe(false);
    expect(shallowEquals(-0, -0)).toBe(true);
  });

  // React props 스타일 객체 테스트
  it('should compare React-style props objects correctly', () => {
    const fn = () => {};
    const obj1 = { onClick: fn, style: { color: 'red' }, value: 1 };
    const obj2 = { onClick: fn, style: { color: 'red' }, value: 1 };
    const obj3 = { ...obj1, style: { ...obj1.style } };

    expect(shallowEquals(obj1, obj2)).toBe(false); // style 객체가 다른 참조
    expect(shallowEquals(obj1, obj3)).toBe(false); // style 객체가 다른 참조
    expect(
      shallowEquals({ onClick: fn, value: 1 }, { onClick: fn, value: 1 })
    ).toBe(true); // 원시값과 같은 함수 참조
  });
});

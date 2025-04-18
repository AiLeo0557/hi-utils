import { isObjectLike, isStrictObject } from 'hi-datatype-operation';
/**
 * Deep copy an object or array.
 * @param {any} val - The object or array to be copied.
 * @returns {any} - The deep copied object or array.
 * @throws {Error} - Throws an error if the input is not an object or array.
 * @author: 杜朝辉
 * @date: 2025-04-18
 */
export function getDeepCopy(val: unknown): any {
  if (!isObjectLike(val)) {
    return val; // Return the value as is if it's not an object or array
  }
  if (Array.isArray(val)) {
    return val.map((item) => getDeepCopy(item)); // Recursively copy each element in the array 
  }
  if (isStrictObject(val)) {
    return Object.entries(val).reduce((acc, [key, value]) => {
      acc[key] = getDeepCopy(value); // Recursively copy each property in the object
      return acc;
    }, {} as Record<string, unknown>);
  }
}
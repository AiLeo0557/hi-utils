/**
 * 从目标对象中过滤指定属性，生成新对象
 * @param {object} source - 目标对象
 * @param {string[]} keys - 需要过滤的属性名数组
 */
export function getOmitProperties<T extends object, K extends keyof T>(source: T, keys: K[]): Omit<T, K> {
  return (Object.keys(source) as Array<keyof T>)
    .filter((key): key is Exclude<keyof T, K> => !keys.includes(key as K))
    .reduce((result, key) => {
      result[key] = source[key];
      return result;
    }, {} as Omit<T, K>);
}




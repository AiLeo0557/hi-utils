/**
 * 从目标对象中提取指定属性，生成新对象
 * @param source 源对象
 * @param keys 需要保留的属性名数组
 * @returns 包含指定属性的新对象
 */
export function getPickProperties<T extends object, K extends keyof T>(
  source: T,
  keys: K[]
): Pick<T, K> {
  return keys.reduce((acc, key) => {
    if (key in source) {
      acc[key] = source[key];
    }
    return acc;
  }, {} as Pick<T, K>);
}
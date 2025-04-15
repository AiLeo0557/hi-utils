/**
 * author: 杜朝辉
 * date: 2025-02-17 11:10:00
 * description: 获取两个字符串之间的内容
 * @param {string} str - 输入的字符串
 * @param {string} start - 开始字符串
 * @param {string} end - 结束字符串
 * @returns {string} - 返回两个字符串之间的内容
 */
export function getStringBetween(str: string, start: string, end: string): string {
  start = start.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); // 转义正则表达式中的特殊字符
  end = end.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); // 转义正则表达式中的特殊字符
  const patten = new RegExp(`${start}(.*?)${end}`, 'g'); // 使用正则表达式匹配两个字符串之间的内容
  const result = patten.exec(str); // 匹配结果
  return result ? result[1] : ''; // 返回匹配结果中的第一个捕获组，如果没有匹配到则返回空字符串
}

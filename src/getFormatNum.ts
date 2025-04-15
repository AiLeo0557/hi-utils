/**
 * author: 杜朝辉
 * date: 2020-12-03
 * description: 数字格式化  10000 => 10,000
 * @param num {number} - 需要格式化的数字
 * @param decimal {number} - 保留小数位数
 * @returns {string}
 */
export function getFormatNum(num: unknown, decimal: number = 0): string {
  if (num === null || num === undefined) {
    return '-';
  }
  let res = Number(num).toFixed(decimal);
  res = res.replace(/\d+/, (n: string) => {
    return n.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  });
  return res;
}
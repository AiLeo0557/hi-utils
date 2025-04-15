/**
 * author: 杜朝辉
 * date: 2025-02-17
 * description: 对象数据转成FormData数据
 * @param {Object} obj - 输入的对象
 * @returns {FormData} - 返回转换后的FormData对象
 */
export function getFormData(obj: Record<string, any>) {
  const formData = new FormData();
  for (const key in obj) {
    formData.append(key, obj[key]);
  }
  return formData;
}
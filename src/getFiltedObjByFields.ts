/**
 * author: 杜朝辉
 * date: 2020-10-21
 * description: 过滤掉对象中指定的字段
 * @param {Object|Array} data - 输入的对象或对象数组
 * @param {string} fieldsToRemoveStr - 需要移除的字段名，多个字段名用逗号分隔
 * @returns {Object|Array} - 返回过滤后的对象或对象数组
 */
export function getFiltedObjByFields(data: Record<string, any> | Array<any>, fieldsToRemoveStr: string): any {
  const fieldsToRemove = fieldsToRemoveStr.replace(/\s+/g, '').split(',');
  if (Array.isArray(data)) {
    return data.map((item: any) => {
      const newItem: any = {};
      for (const key in item) {
        if (!fieldsToRemove.includes(key)) {
          newItem[key] = item[key];
        }
      }
      return newItem;
    });
  } else {
    const newData: any = {};
    for (const key in data) {
      if (!fieldsToRemove.includes(key)) {
        newData[key] = data[key];
      }
    }
    return newData;
  }
}

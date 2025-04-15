export function getTableColumnKeys(
  columns: any,
  key: string,
  join: boolean = false,
  parent_key_value: string = ''
) {
  return columns.map((column: any) => {
    const key_value = Reflect.get(column, key)
    if (Reflect.has(column, 'subColumns')) {
      return getTableColumnKeys(Reflect.get(column, 'subColumns'), key, join, key_value)
    }
    return join ? (parent_key_value ? `${parent_key_value}-${key_value}` : key_value) : key_value
  })
}
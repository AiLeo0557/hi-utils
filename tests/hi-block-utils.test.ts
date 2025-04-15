import {
  getFieldValueByPath,
  getFormatNum,
  getFormData,
  getModules,
  getRequestParams,
  getStringBetween,
  getFiltedObjByFields,
  // isType,
  isHiRequestArgument,
} from '../dist/index.cjs'

// const {
//   getDataType,
//   isNotEmptyObject,
//   isEmptyObject,
//   isDocument,
//   isWindow,
//   isObject,
//   isArray,
//   isFunction,
//   isString,
//   isNumber,
//   isBoolean,
//   isUndefined,
//   isNull,
//   isSymbol,
//   isDate,
//   isRegExp,
//   isPromise,
//   isError,
//   isPrimitive,
//   isObjectLike,
//   isPlainObject,
//   isElement,
//   isNotEmpty,
// } = HiDataTypeOperation

const data = {
  name: 'John',
  age: 30,
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
  },
  frends: [
    {
      name: 'Tom',
      age: 25,
    },
    {
      name: 'Jerry',
      age: 20,
    }
  ],
};
const data1 = { name: 'Leo', age: '18', gender: 'male' };
const data2 = {
  family: { father: 'Tom', mother: 'Lucy' },
  friends: [{ name: 'Jack', age: '18' }, { name: 'Lily', age: '17' }],
  work: { company: 'ABC', position: 'Engineer' },
  books: [
    { name: 'Book1', author: 'Author1', id: 1 },
    { name: 'Book2', author: 'Author2', id: 2 },
    { name: 'Book3', author: 'Author3', id: 3 },
  ]
};
const user = {
  userName: 'Leo',
  userId: 'P00002345',
}
const selectedTableData = [
  {
    id: 1,
    name: 'Tom',
    age: 25,
    gender: 'male',
    address: '123 Main St',
  },
  {
    id: 2,
    name: 'Jerry',
    age: 20,
    gender: 'female',
    address: '456 Main St',
  },
];
describe('getDataTypeOperation', () => {
  it('getDataType', () => {
    // expect(getDataType(1)).toBe('number')
    // expect(getDataType('1')).toBe('string')
    // expect(getDataType(true)).toBe('boolean')
    // expect(getDataType(null)).toBe('null')
    // expect(getDataType(undefined)).toBe('undefined')
    // expect(getDataType({})).toBe('object')
    // expect(getDataType([])).toBe('array')
    // expect(getDataType(() => { })).toBe('function')
    // expect(getDataType(new Date())).toBe('date')
    // expect(getDataType(/a/)).toBe('regexp')
    // expect(getDataType(new Promise(() => { }))).toBe('promise')
    // expect(getDataType(new Error())).toBe('error')
    // expect(getDataType(Symbol('a'))).toBe('symbol')
    // expect(getDataType(document)).toBe('document')
    // expect(getDataType(window)).toBe('window')
    // expect(getDataType(document.body)).toBe('element')
  })
  it('isNotEmptyObject', () => {
    // expect(isNotEmptyObject({})).toBe(false)
    // expect(isNotEmptyObject({ a: 1 })).toBe(true)
  })
  it('isEmptyObject', () => {
    // expect(isEmptyObject({})).toBe(true)
    // expect(isEmptyObject({ a: 1 })).toBe(false)
  })
  // it('isDocument', () => {
  //   expect(isDocument(document)).toBe(true)
  //   expect(isDocument(window)).toBe(false)
  // })
  // it('isWindow', () => {
  //   expect(isWindow(window)).toBe(true)
  //   // expect(isWindow(document)).toBe(false)
  // })
  it('isObject', () => {
    // expect(isObject({})).toBe(true)
    // expect(isObject([])).toBe(true)
    // expect(isObject(null)).toBe(false)
    // expect(isObject(undefined)).toBe(false)
    // expect(isObject(1)).toBe(false)
    // expect(isObject('1')).toBe(false)
    // expect(isObject(true)).toBe(false)
    // expect(isObject(() => { })).toBe(false)
    // expect(isObject(new Date())).toBe(false)
    // expect(isObject(/a/)).toBe(false)
  })
  it('isArray', () => {
    // expect(isArray([])).toBe(true)
    // expect(isArray({})).toBe(false)
  })
  it('isFunction', () => {
    // expect(isFunction(() => { })).toBe(true)
    // expect(isFunction({})).toBe(false)
  })
  it('isString', () => {
    // expect(isString('1')).toBe(true)
  })
  it('isNumber', () => {
    // expect(isNumber(1)).toBe(true)
  })
  it('isBoolean', () => {
    // expect(isBoolean(true)).toBe(true)
  })
  it('isUndefined', () => {
    // expect(isUndefined(undefined)).toBe(true)
  })
  it('isNull', () => {
    // expect(isNull(null)).toBe(true)
  })
  it('isSymbol', () => {
    // expect(isSymbol(Symbol('a'))).toBe(true)
  })
  it('isDate', () => {
    // expect(isDate(new Date())).toBe(true)
  })
  // it('isRegExp', () => {
  //   expect(isRegExp(/a/)).toBe(true)
  // })
  it('isPromise', () => {
    // expect(isPromise(new Promise(() => { }))).toBe(true)
  })
  it('isError', () => {
    // expect(isError(new Error())).toBe(true)
  })
  it('isPrimitive', () => {
    // expect(isPrimitive(1)).toBe(true)
    // expect(isPrimitive('1')).toBe(true)
    // expect(isPrimitive(true)).toBe(true)
    // expect(isPrimitive(null)).toBe(true)
    // expect(isPrimitive(undefined)).toBe(true)
    // expect(isPrimitive({})).toBe(false)
    // expect(isPrimitive([])).toBe(false)
    // expect(isPrimitive(() => { })).toBe(false)
  })
  it('isNotEmpty', () => {
    // expect(isNotEmpty('1')).toBe(true)
    // expect(isNotEmpty('')).toBe(false)
  })
})
describe('getFieldValueByPath', () => {
  it('case 1: a.b.c => obj.a.b.c', () => {
    expect(getFieldValueByPath('name', data)).toBe('John');
    expect(getFieldValueByPath('address.city', data)).toBe('Anytown');
    expect(getFieldValueByPath('address.state', data)).toBe('CA');
    expect(getFieldValueByPath('frends.0.name', data)).toBe('Tom');
  });
  it('case 2: a.b.`c` => obj.a.b.map(i => i.c)).join(",")', () => {
    expect(getFieldValueByPath('frends.`name`', data)).toBe('Tom,Jerry');
    expect(getFieldValueByPath('frends.`age`', data)).toBe('25,20');
  })
  it('case 3: a.b.[c] => obj.a.b.map(i => i.c))', () => {
    expect(getFieldValueByPath('frends.[name]', data)).toEqual(['Tom', 'Jerry']);
    expect(getFieldValueByPath('frends.[age]', data)).toEqual([25, 20]);
  })
  it('case 4: a.b.{c} => obj.a.b[{c: * }]', () => {
    expect(getFieldValueByPath('frends.{name}', data)).toEqual([{ name: 'Tom' }, { name: 'Jerry' }]);
    expect(getFieldValueByPath('frends.{age}', data)).toEqual([{ age: 25 }, { age: 20 }]);
  })
  it('case 5: (a.b.c, null) => undefined', () => {
    expect(getFieldValueByPath('name', null as any)).toBe(undefined)
  })
})
describe('getFormatNum', () => {
  it('case 1: 123456789 => 123,456,789', () => {
    expect(getFormatNum(123456789)).toBe('123,456,789')
    expect(getFormatNum(123456789, 2)).toBe('123,456,789.00')
  })
  it('case 2: (123456789.123456789, 2) => 123,456,789.12', () => {
    expect(getFormatNum(123456789.123456789, 2)).toBe('123,456,789.12')
  })
  it('case 3: undefined => -', () => {
    expect(getFormatNum(undefined)).toBe('-')
  })
})
describe('getFormData', () => {
  it('case 1: {a: 1, b: 2} => FormData { a: \'1\', b: \'2\' }', () => {
    const data = { a: 1, b: 2 }
    const formData = getFormData(data)
    expect(formData.get('a')).toBe('1')
    expect(formData.get('b')).toBe('2')
    expect(formData).toBeInstanceOf(FormData);
  })
})
describe('getModules', () => {
  it('case 1: /src/**/*.ts => Map {a: () => import(\'/src/a.ts\'), b: () => import(\'/src/b.ts\')}', () => {
    const modules_obj = {
      '../src/getModules.ts': () => import('../src/getModules'),
      '../src/getFormData.ts': () => import('../src/getFormData'),
    }
    const modules = getModules(modules_obj)
    // console.log(modules)
    // expect(modules.get('getModules')).toEqual(() => import('../src/getModules'))
  })
})
describe('getRequestParams', () => {
  it('case 1: ({a: \'\', b: []}, {param_a_key: data.a, param_b_key: data.b.[c]}) => ({a: \'aValue\', b: [c1,c2]})})', () => {
    const params = getRequestParams({ name: '', friends: [] }, {
      param_name_key: 'data1.name',
      param_friends_key: 'data2.friends.[name]'
    }, { data1, data2 });
    expect(params).toEqual({ name: 'Leo', friends: ['Jack', 'Lily'] })
  })
  it('case 2: ({}, {param_key_name: \'ids\', param_value_name: data.b.[id]}) => ({ids: [id1, id2]})', () => {
    const params = getRequestParams({}, {
      param_key_name: 'ids',
      param_value_name: 'data2.books.[id]'
    }, { data2 });
    expect(params).toEqual({ ids: [1, 2, 3] })
  })
  it('case 3: ({}, {param_key_name: \'ids\', param_value_name: data.b.{id}) => ({ids: [{id: id1}, {id: id2]})', () => {
    const params = getRequestParams({}, {
      param_key_name: 'ids',
      param_value_name: 'data2.books.{id}'
    }, { data2 });
    expect(params).toEqual({ ids: [{ id: 1 }, { id: 2 }, { id: 3 }] })
  })
  it('case 4: ({}, {param_key_name: \'ids\', param_value_name: data.b.`id`}) => ({ids: `id1,id2`})', () => {
    const params = getRequestParams({}, {
      param_key_name: 'ids',
      param_value_name: 'data2.books.`id`'
    }, { data2 });
    expect(params).toEqual({ ids: '1,2,3' })
  })
  it('case 5: ([], {param_value_name: data.b.[c]}) => [c1,c2]', () => {
    const params = getRequestParams([], {
      param_value_name: 'data2.friends.[name]'
    }, { data2 });
    expect(params).toEqual(['Jack', 'Lily'])
  })
  it('case 6: ({a: 10, b: \'\'}, {param_b_key: data.m.b}) => {a: 10, b: \'bValue\'}', () => {
    const params = getRequestParams({ a: 10, b: '' }, {
      param_b_key: 'data1.gender'
    }, { data1 });
    expect(params).toEqual({ a: 10, b: 'male' })
  })
  it('case 7: runcode_test => runcode_test', () => {
    const params = getRequestParams(
      { a: '' },
      { param_a_key: 'runcode_data_source.data.name' },
      { data }
    )
    expect(params).toEqual({ a: 'John' })
  })
  it('case 8: ({a: []}, {param_a_key: [data.name, data.age, data.gender]}) => ({a: [data]})', () => {
    const params = getRequestParams({ a: [] }, {
      param_a_key: ['data1.name', 'data1.age', 'data1.gender']
    }, { data1 });
    expect(params).toEqual({ a: ['Leo', '18', 'male'] })
  })
  it(`case 9: ({a: []}, {param_a_key: '[data]' }) => ({})`, () => {
    const params = getRequestParams({ a: [] }, {
      param_a_key: '[data1]'
    }, { data1 });
    expect(params).toEqual({ a: [{ name: 'Leo', age: '18', gender: 'male' }] })
  })
  it(`case 10: ([{creatUser: '', userName: ''}], {param_value_name: selectedTableData, param_creatUser_key: user.userId, param_userName_key: user.userName}) => [{creatUser: userId, userName: userName}]`, () => {
    const params = getRequestParams([{ creatUser: '', userName: '' }], {
      param_creatUser_key: 'user.userId',
      param_userName_key: 'user.userName',
      param_value_name: 'selectedTableData'
    }, {
      selectedTableData, user
    });
    expect(params).toEqual([
      {
        id: 1,
        name: 'Tom',
        age: 25,
        gender: 'male',
        address: '123 Main St',
        creatUser: 'P00002345',
        userName: 'Leo'
      },
      {
        id: 2,
        name: 'Jerry',
        age: 20,
        gender: 'female',
        address: '456 Main St',
        creatUser: 'P00002345',
        userName: 'Leo'
      }
    ])
  })
})
describe('getStringBetween', () => {
  it('case 1: (\'123456789\', 2, 5) => 345', () => {
    expect(getStringBetween('q<23>[p]r%9%fhhfdjh', 'h', 'j')).toBe('hfd')
    expect(getStringBetween('q<23>[p]r%9%fhhfdjh', '<', '>')).toBe('23')
    expect(getStringBetween('q<23>[p]r%9%fhhfdjh', '[', ']')).toBe('p')
    expect(getStringBetween('q<23>[p]r%9%fhhfdjh', '%', '%')).toBe('9')
  })
})
describe('getFiltedObjByFields', () => {
  it('case 1: ({a: 1, b: 2, c: 3}, \'b\') => {a: 1, c: 3}', () => {
    const obj = getFiltedObjByFields({ a: 1, b: 2, c: 3 }, `b`);
    expect(obj).toEqual({ a: 1, c: 3 })
  })
  it('case 2: ([{a: 1, b: 2, c: 3}, {a: 2, b: 3, c: 4}], \'b\') => [{a: 1, c: 3}, {a: 2, c: 4}', () => {
    const obj = getFiltedObjByFields([{ a: 1, b: 2, c: 3 }, { a: 2, b: 3, c: 4 }], `b`);
    expect(obj).toEqual([{ a: 1, c: 3 }, { a: 2, c: 4 }])
  })
})
describe('isType', () => {
  it('case 1: (\'123\', \'string\') => true', () => {
    // expect(isType('123', 'string')).toBe(true)
  })
})
describe('isHiRequestArgument', () => {
  it(`case 1: ["engine-finance/agtmanage/fundsNon/edit"] => true`, () => {
    expect(isHiRequestArgument(['engine-finance/agtmanage/fundsNon/edit'])).toBe(true)
  })
  it(`case 2: ["engine-bill/combobox/getplantlist", {"participantType": "01"}] => true`, () => {
    expect(isHiRequestArgument(['engine-bill/combobox/getplantlist', { participantType: '01' }])).toBe(true)
  })
  it(`case 3: ["engine-bill/combobox/getunitlist", {"plantid": ""}, {"param_plantid_key": "formData.plantId"}] => true`, () => {
    expect(isHiRequestArgument(['engine-bill/combobox/getunitlist', { plantid: "" }, { param_plantid_key: "formData.plantId" }])).toBe(true)
  })
})

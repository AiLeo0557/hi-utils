type DeepEqualOptions = {
  strict?: boolean; // 是否严格校验原型链 (默认不校验)
};

/**
 * 深度比较两个值是否相等 (支持对象、数组、Date、RegExp等)
 * @param a 第一个值
 * @param b 第二个值
 * @param options 配置选项
 * @returns 是否深度相等
 */
export function isDeepEqual(
  a: unknown,
  b: unknown,
  options: DeepEqualOptions = { strict: false }
): boolean {
  // 快速检查相同引用
  if (Object.is(a, b)) return true;

  // 处理 null/undefined 与对象的边界情况
  if (a == null || b == null) return a === b;

  // 获取对象构造函数用于原型校验
  const aConstructor = (a as object).constructor;
  const bConstructor = (b as object).constructor;

  // 类型不同直接返回 false (基础类型通过 Object.is 已经处理)
  if (aConstructor !== bConstructor) {
    // 处理 ArrayBuffer 的兼容性判断
    if (
      ArrayBuffer.isView(a) &&
      ArrayBuffer.isView(b) &&
      a.constructor === b.constructor
    ) {
      // 处理 TypedArray 后续比较
    } else {
      return false;
    }
  }

  // 处理特殊对象类型
  switch (aConstructor) {
    case Date:
      return (a as Date).getTime() === (b as Date).getTime();
    case RegExp:
      return (a as RegExp).toString() === (b as RegExp).toString();
    case Map:
    case Set:
      return handleMapSet(a, b as typeof a, options); // 需要单独处理
  }

  // 处理数组和类数组对象
  if (Array.isArray(a) && Array.isArray(b)) {
    return handleArray(a, b, options);
  }

  // 处理 ArrayBuffer 和 TypedArray
  if (a instanceof ArrayBuffer && b instanceof ArrayBuffer) {
    return compareArrayBuffers(a, b);
  }
  if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
    return compareTypedArrays(a as ArrayBufferView, b as ArrayBufferView);
  }

  // 处理普通对象和自定义对象
  if (typeof a === 'object' && typeof b === 'object') {
    // 严格模式需要校验原型链
    if (options.strict && aConstructor !== bConstructor) return false;

    const keysA = Reflect.ownKeys(a);
    const keysB = Reflect.ownKeys(b);

    if (keysA.length !== keysB.length) return false;

    return keysA.every((key) => {
      if (!Reflect.has(b as object, key)) return false;
      return isDeepEqual(
        Reflect.get(a as object, key),
        Reflect.get(b as object, key),
        options
      );
    });
  }

  // 其他类型通过 Object.is 处理
  return Object.is(a, b);
}

/* 辅助函数 */
function handleArray(
  a: unknown[],
  b: unknown[],
  options: DeepEqualOptions
): boolean {
  if (a.length !== b.length) return false;
  return a.every((item, index) => isDeepEqual(item, b[index], options));
}

function handleMapSet(
  a: unknown,
  b: unknown,
  options: DeepEqualOptions
): boolean {
  if (a instanceof Map && b instanceof Map) {
    if (a.size !== b.size) return false;
    return Array.from(a.entries()).every(([key, val]) => {
      return b.has(key) && isDeepEqual(val, b.get(key), options);
    });
  }

  if (a instanceof Set && b instanceof Set) {
    if (a.size !== b.size) return false;
    return Array.from(a.values()).every((val) => b.has(val));
  }

  return false;
}

function compareArrayBuffers(a: ArrayBuffer, b: ArrayBuffer): boolean {
  if (a.byteLength !== b.byteLength) return false;
  const viewA = new DataView(a);
  const viewB = new DataView(b);
  for (let i = 0; i < a.byteLength; i++) {
    if (viewA.getUint8(i) !== viewB.getUint8(i)) return false;
  }
  return true;
}

function compareTypedArrays(a: ArrayBufferView, b: ArrayBufferView): boolean {
  if (a.byteLength !== b.byteLength) return false;
  if (a.constructor !== b.constructor) return false;
  const bufferA = a.buffer;
  const bufferB = b.buffer;
  return compareArrayBuffers(bufferA as ArrayBuffer, bufferB as ArrayBuffer);
}
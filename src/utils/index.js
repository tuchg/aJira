import { useEffect, useState } from "react";

export const isFalsy = (value) => (value === 0 ? false : !value);

/**
 * 清理对象空值
 * @param obj
 * @returns {*}
 */
export const cleanObject = (obj) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    let value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

/**
 * 复用生命周期
 * 使用空数组的副作用，仅在页面渲染时触发一次
 * @param callback
 */
export const useMount = (callback) => {
  // 不允许在普通函数中使用 hook函数
  useEffect(() => {
    callback();
  }, []); // 空数组，仅页面渲染时触发一次
};

/**
 * 防跳hook
 *
 * 函数与hook选择的判断，看函数内是否需要使用到别的hook
 * @param func
 * @param delay
 * @returns {unknown}
 */
export const useDebounce = (func, delay) => {
  /*  const useBounce = (func, delay) => {
      let timeout; // 闭包为何能复用该变量？
      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(function() {
          func();
        }, delay);
      };
    };*/
  const [debounceFunc, setDebounceFunc] = useState(func);
  useEffect(() => {
    const timeout = setTimeout(() => setDebounceFunc(func), delay);
    // 每次在上一次effect处理完完后执行
    return () => clearTimeout(timeout);
  }, [func, delay]);

  return debounceFunc;
};

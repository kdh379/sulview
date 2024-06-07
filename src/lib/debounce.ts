const debounce = <T extends (...args: React.ChangeEvent<HTMLInputElement>[]) => ReturnType<T>>(fn: T, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>): ReturnType<T> | null => {
    let result = null;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      result = fn(...args);
    }, delay);

    if(result === null) return null;

    return result;
  };
};

export default debounce;

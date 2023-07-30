const setItem = (key: string, value: string) => {
  sessionStorage.setItem(key, value);
};

const getItem = (key: string) => typeof window !== 'undefined' ? sessionStorage.getItem(key) : undefined;

const removeItem = (key: string) => sessionStorage.removeItem(key);

export { setItem, getItem, removeItem };

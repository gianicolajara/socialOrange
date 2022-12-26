export const setItemLS = (key: string = "", data: any) => {
  if (!key || !data || localStorage === null)
    throw new Error("Error en su local storage");

  localStorage.setItem(key, JSON.stringify(data));
};

export const getItemLS = (key: string = "") => {
  if (!key || localStorage === null)
    throw new Error("Error en su local storage");

  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key) as string);
  }
};

export const deleteItemLS = (key: string = "") => {
  if (!key || localStorage === null || !localStorage.getItem(key))
    throw new Error("Error en su local storage");

  if (localStorage.getItem(key)) {
    localStorage.removeItem(key);
  }
};

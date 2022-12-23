const myStorage = window.localStorage || null;

export const setItemLS = (key: string = "", data: object = {}) => {
  if (!key || !data || myStorage === null)
    throw new Error("Error en su local storage");

  myStorage.setItem(key, JSON.stringify(data));
};

export const getItemLS = (key: string = "") => {
  if (!key || myStorage === null || !myStorage.getItem(key))
    throw new Error("Error en su local storage");

  if (myStorage.getItem(key)) {
    return JSON.parse(myStorage.getItem(key) as string);
  }
};

export const deleteItemLS = (key: string = "") => {
  if (!key || myStorage === null || !myStorage.getItem(key))
    throw new Error("Error en su local storage");

  if (myStorage.getItem(key)) {
    myStorage.removeItem(key);
  }
};

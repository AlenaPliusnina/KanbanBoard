import axios from "axios";

export const applyDrag = (arr, dragResult, collection) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;
  const result = [...arr];
  let itemToAdd = payload;
  let to_column = 0
  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }
  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);

    to_column = Number(collection.split('items')[1]) + 1;
    localStorage.setItem('to_column', String(to_column));
    localStorage.setItem('item_id', itemToAdd.id);
  }
  return result;
};

export const loadItems = (collection) => {
  let result = []
  if (localStorage.getItem(collection)) {
    try {
      result = JSON.parse(localStorage.getItem(collection));
    } catch(e) {
      localStorage.removeItem(collection);
    }
  }
  return result;
};

export const saveItems = (collection, data) => {
  let parsed = JSON.stringify(data);
  localStorage.setItem(collection, parsed);
};

export const getItems = (jwt) => {
  axios.get('http://localhost:8000/api/tasks/', {
    headers: {
      Authorization: `JWT ${jwt}`,
    },
  })
    .then((response) => {
      let items0 = []
      let items1 = []
      let items2 = []
      let items3 = []

      response.data.forEach((item) => {
        let parsed = JSON.stringify(item);

        if (item.column === 1) {
          items0.push(parsed);
        } else if (item.column === 2) {
          items1.push(parsed);
        } else if (item.column === 3) {
          items2.push(parsed);
        } else if (item.column === 4) {
          items3.push(parsed);
        }
      })

      localStorage.setItem('items0', '[' + items0 + ']');
      localStorage.setItem('items1', '[' + items1 + ']');
      localStorage.setItem('items2', '[' + items2 + ']');
      localStorage.setItem('items3', '[' + items3 + ']');
    });
}

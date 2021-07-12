/** Меняет содержимое тега title */
export const setTitle = (title: string) => {
  document.title = encodeURIComponent(title);
};

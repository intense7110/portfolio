const encode = (input) => {
  return encodeURIComponent(input).replace(/[!'()*]/g, (char) => {
    return '%' + char.charCodeAt(0).toString(16);
  });
};

export default encode
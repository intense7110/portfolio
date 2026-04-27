const getMeta = (pageMeta, defaultMeta) => {
  if (Array.isArray(pageMeta)) {
    return [pageMeta[0], pageMeta[1] ?? pageMeta[0]];
  }
  return [pageMeta ?? defaultMeta[0], defaultMeta[1] ?? defaultMeta[0]];
};

export default getMeta

const extractFileDetails = (filePath) => {
  const lastIndex = filePath.lastIndexOf('/');
  const dir = filePath.substring(0, lastIndex + 1);
  const name = filePath.substring(lastIndex + 1);
  const baseName = name.substring(0, name.lastIndexOf('.'));
  const ext = name.substring(name.lastIndexOf('.') + 1);
  return { dir, baseName, ext };
};

export default extractFileDetails

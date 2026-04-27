import fs from 'fs';
import imageSize from 'image-size';

const getImageSizes = (imagePath) => {
  if (fs.existsSync(imagePath)) {
    const imageBuffer = fs.readFileSync(imagePath);
    return imageSize(imageBuffer);
  }
  return { width: 0, height: 0 };
};

export default getImageSizes
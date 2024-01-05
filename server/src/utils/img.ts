import fs from 'fs/promises';
import axios from "axios";
import sharp from "sharp";

export const downloadImage = async (imageUrl) => {
  const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
  const buffer = Buffer.from(response.data, "binary");

  const jpegBuffer = await sharp(buffer).jpeg().toBuffer();

  return jpegBuffer;
};

export const toBase64 = (imageBinary, mediaType = "image/jpeg") => {
  return `data:${mediaType};base64,${Buffer.from(imageBinary).toString(
    "base64"
  )}`;
};


export const convertImageToBinary = async (inputFilePath) => {
  const buffer = await fs.readFile(inputFilePath);
  const jpegBuffer = await sharp(buffer).jpeg().toBuffer();
  return jpegBuffer;
};

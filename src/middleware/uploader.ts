import multer from "multer";
import { join } from "path"; // untuk merge file path location
import { Request } from "express";

export const uploader = (dirName?: string, filePrefix?: string) => {
  const defaultDir = join(__dirname, "../../public"); // define directory utama

  const configStore = multer.diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      callback: (error: Error | null, destination: string) => void
    ) => {
      const fileDestination = dirName ? defaultDir + dirName : defaultDir;
      console.log("Destination :", fileDestination);
      callback(null, fileDestination);
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      callback: (error: Error | null, filename: string) => void
    ) => {
      const existName = file.originalname.split(".");
      console.log("Original filename :", existName);
      const extention = existName[existName.length - 1];
      console.log("extention name :", extention);
      if (filePrefix) {
        const newName = filePrefix + Date.now() + "." + extention;
        callback(null, newName);
      } else {
        callback(null, file.originalname);
      }
    },
  });

  return multer({ storage: configStore });
};

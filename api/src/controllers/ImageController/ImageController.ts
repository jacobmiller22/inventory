import convert from 'heic-convert';
import { IncomingForm } from 'formidable';
import { Request } from 'express';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { IMAGE_DB_INCOMING, IMAGE_DB_OUTGOING } from '../../consts';

interface IImageController {
  getImageFromReq: (req: Request) => Promise<string>;
  getJpgs: (paths: string[]) => Promise<any[]>;
  src2Dest: (path: string) => Promise<string>;
}

const ImageController = (): IImageController => {
  const getImageFromReq = async (req: Request) => {
    interface FileData {
      fields: Object;
      files: {
        [file: string]: File;
      };
    }

    const data: FileData = await new Promise(function (resolve, reject) {
      const form = new IncomingForm({
        keepExtensions: true,
        uploadDir: IMAGE_DB_INCOMING,
      });

      form.parse(req, function (err: any, fields: any, files: any) {
        if (err) {
          console.log('Error while parsing the form', err);
          return reject(err);
        }
        resolve({ fields, files });
      });
    });
    //@ts-ignore
    return data.files.file.filepath;
  };

  const getJpgs = async (paths: string[]): Promise<any> => Promise.all(paths.map(async (path) => await src2Dest(path)));

  const edges = {
    heic: 'jpg',
  };

  const src2Dest = async (path: string) => {
    // For now, we will always map heic to jpg

    console.log('src2Dest', path);

    const srcMimetype = 'image/heic';
    const destMimetype = 'image/jpeg';

    const format = destMimetype.split('/')[1].toUpperCase();

    const iBuf = await fs.readFile(path);

    const oBuf: Buffer = await convert({ buffer: iBuf, format, quality: 1 });

    const outName: string = `upload_${Date.now()}_${uuidv4()}.${format.toLowerCase()}`;

    await fs.writeFile(`${IMAGE_DB_OUTGOING}/${outName}`, oBuf);

    console.log('src2Dest out', outName);

    return outName;
  };

  return {
    getImageFromReq,
    getJpgs,
    src2Dest,
  };
};

export default ImageController;

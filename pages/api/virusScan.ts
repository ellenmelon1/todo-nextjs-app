import type { NextApiRequest, NextApiResponse } from 'next'
import NodeClam from 'clamscan'
import formidable, {IncomingForm} from "formidable";
import fs from 'fs';

const options = {
  clamscan: {
    path: '/usr/bin/clamscan', // Path to clamscan binary on your server
  },
  preference: 'clamscan' // If clamdscan is found and active, it will be used by default (we dont want that)
}

  export const config = {
    api: {
      bodyParser: false,
    }
  };

  interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
      file: File,
    };
  }

const handler = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) => {
        const data: any = await new Promise((resolve, reject) => {
            const form = new IncomingForm();
            form.parse(req, (err, fields, files) => {
              if (err) return reject(err);
              resolve({ fields, files });
            });
          });

          if (Array.isArray(data.files.file)) return;
            const filepath = data.files.file.filepath;

        const clamscan = await new NodeClam().init(options);
        // helpful for testing clamscan init correctly:
        // const version = await clamscan.getVersion();
        // console.log(version);
        const { isInfected, file, viruses } = await clamscan.isInfected(`${filepath}`);

        if (isInfected) {
            console.log("file infected")
            throw new Error('File is infected');
        }
        res.status(200).json({})
}
export default handler

import * as fs from "fs";
import * as path from "path";

const localImagesDirectory = path.join(process.cwd(), "public/testimgs/");

export function getAllImages() {
  // Get file names

  const fileNames = fs.readdirSync(localImagesDirectory);
  const allImagesData: { id: string; fullpath: string }[] = fileNames.map(
    (fileName): { id: string; fullpath: string } => {
      const id = fileName;
      const fullpath = "/testimgs/" + fileName;

      return {
        id,
        fullpath,
      };
    }
  );

  const testing = allImagesData;

  // Sort posts by date
  return allImagesData.sort((a, b) => {
    if (a.id < b.id) {
      return 1;
    } else {
      return -1;
    }
  });
}

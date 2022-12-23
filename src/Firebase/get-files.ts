import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { userFile } from "../types";

const storage = getStorage();

const getFiles = async (
  email: string | null | undefined
): Promise<userFile[]> => {
  const listRef = ref(storage, `files/${email}`);

  const res = await listAll(listRef);
  const promArray = res.items.map(
    (item) =>
      new Promise((resolve, reject) =>
        getDownloadURL(item)
          .then((downloadUrl) => {
            resolve({ downloadUrl, name: item.name, storageRef: item });
          })
          .catch((error) => reject(error))
      )
  );

  const result = (await Promise.all(promArray)) as userFile[];
  return result;
};

export default getFiles;

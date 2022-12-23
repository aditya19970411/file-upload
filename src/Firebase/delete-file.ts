import { deleteObject, StorageReference } from "firebase/storage";

const deleteFile = async (storageRef: StorageReference | undefined) => {
  if (storageRef) return deleteObject(storageRef);
  return;
};

export default deleteFile;

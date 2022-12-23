import { storage } from "./firebase";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  UploadTaskSnapshot,
  StorageError,
  UploadMetadata,
  StorageReference,
} from "firebase/storage";

// Callback Functions Type
type NextCallback = (progress: number) => void;
type ErrorCallback = (error: StorageError) => void;
type OnCompleteCallback = (url: string, storageRef: StorageReference) => void;

// Upload File Function
const uploadFile = (
  file: File | null | undefined,
  email: string | null | undefined,
  nextCallback: NextCallback,
  errorCallback: ErrorCallback,
  onCompleteCallback: OnCompleteCallback
) => {
  if (!email || !file) return;

  const metadata = {
    customMetadata: {
      email,
      size: file.size.toString(),
    },
  } as UploadMetadata;

  const storageRef = ref(storage, `files/${email}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  return uploadTask.on(
    "state_changed",
    (snapshot: UploadTaskSnapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      nextCallback(progress);
    },
    errorCallback,
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        onCompleteCallback(downloadURL, storageRef);
      });
    }
  );
};

export default uploadFile;

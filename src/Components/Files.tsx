import React, {
  useState,
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
} from "react";
import { deleteFile, getFiles, uploadFile } from "../Firebase";
import AuthContext from "../Context/AuthContext";
import { userFile } from "../types";
import Showfiles from "./Showfiles";
import FileUploader from "./FileUploader";
import { StorageReference } from "firebase/storage";

type Props = {};

const Files = (props: Props) => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState<Boolean>(false);
  const [userfiles, setUserfiles] = useState<userFile[]>([]);

  let inputRef = useRef<HTMLInputElement>(null);

  const authContext = useContext(AuthContext);

  const handleUploadButtonClick = () => {
    inputRef.current?.click();
  };

  const handleUpload = (file: File | null) => {
    setLoading(true);

    uploadFile(
      file,
      authContext?.user?.email,
      (progress) => {
        setProgress(progress);
      },
      (error) => alert(error),
      (downloadUrl: string, storageRef) => {
        setLoading(false);
        setUserfiles([
          ...userfiles,
          { name: file?.name, downloadUrl, storageRef },
        ]);
        setProgress(0);
      }
    );
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    handleUpload(file);
  };

  const handledeleteFile = (
    storageRef: StorageReference | undefined,
    index: number
  ) => {
    deleteFile(storageRef).then(() => {
      setUserfiles([...userfiles.filter((uf, idx) => index !== idx)]);
    });
  };

  useEffect(() => {
    getFiles(authContext?.user?.email).then((res) => setUserfiles(res));
  }, [authContext?.user?.email]);

  useEffect(() => {
    let currDate = new Date().getTime() / 1000;
    let exp = Number(authContext?.user?.exp);

    console.log("CHECK", currDate, exp);

    if (currDate > exp) authContext?.deleteAuth();
  }, [authContext]);

  return (
    <div className="flex flex-col gap-10 justify-center items-center">
      <FileUploader
        inputRef={inputRef}
        handleOnChange={handleOnChange}
        handleUploadButtonClick={handleUploadButtonClick}
        loading={loading}
        progress={progress}
      />
      <Showfiles userFiles={userfiles} deleteFile={handledeleteFile} />
    </div>
  );
};

export default Files;

import React from "react";

import { Download, Delete } from "@mui/icons-material";
import { userFile } from "../types";
import { StorageReference } from "firebase/storage";

type Props = {
  userFiles: userFile[];
  // downloadFile: (downloadUrl: string | undefined) => void;
  deleteFile: (storageRef: StorageReference | undefined, index: number) => void;
};

const Showfiles = ({ userFiles, deleteFile }: Props) => {
  return (
    <div className="flex flex-col gap-5 px-5 py-2">
      <div className="flex text-xl font-semibold text-gray-500">Files</div>
      <div className="grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 flex-wrap">
        {userFiles.map((userFile, idx) => (
          <div
            className="min-h-[150px] border border-dashed border-gray-500 bg-gray-700 px-4 py-2 flex flex-col rounded-xl items-start"
            key={`files-${idx}`}
          >
            <span
              className="text-ellipsis text-sm h-1/2 text-white w-full break-words overflow-hidden"
              title={userFile.name}
            >
              {userFile.name}
            </span>
            <div className="flex flex-row justify-between w-full mt-auto">
              <a
                href={userFile.downloadUrl}
                download
                rel={"noreferrer"}
                target={"_blank"}
              >
                <button
                  className="rounded-full bg-gray-800 flex p-2 mt-auto"
                  title={"Download " + userFile.name}
                >
                  <Download fontSize="small" color="primary" />
                </button>
              </a>
              <button
                className="rounded-full bg-gray-800 flex p-2 mt-auto"
                title={"Delete " + userFile.name}
                onClick={() => deleteFile(userFile.storageRef, idx)}
              >
                <Delete fontSize="small" color="primary" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Showfiles;

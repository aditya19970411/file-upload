import React, { ChangeEvent, Ref } from "react";
import UploadProgress from "./UploadProgress";
import { FileUploadRounded } from "@mui/icons-material";

type Props = {
  inputRef: Ref<HTMLInputElement>;
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  loading: Boolean;
  progress: number;
  handleUploadButtonClick: () => void;
};

const FileUploader = ({
  inputRef,
  handleOnChange,
  loading,
  progress,
  handleUploadButtonClick,
}: Props) => {
  return (
    <div className="flex flex-row gap-5 px-6 py-2 w-full items-center justify-between">
      <span className="text-blue-400 text-2xl font-semibold">
        File Uploader
      </span>
      <input
        ref={inputRef}
        type={"file"}
        onChange={handleOnChange}
        className="hidden"
      />
      {loading ? (
        <UploadProgress size="48px" progress={progress}>
          <FileUploadRounded fontSize="medium" color="primary" />
        </UploadProgress>
      ) : (
        <button
          onClick={handleUploadButtonClick}
          disabled={!!loading}
          className="flex p-3 rounded-full bg-blue-400"
          title="Upload a new file"
        >
          <FileUploadRounded fontSize="medium" />
        </button>
      )}
    </div>
  );
};

export default FileUploader;

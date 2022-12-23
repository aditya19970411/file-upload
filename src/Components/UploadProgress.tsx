import React from "react";
import { CircularProgress, circularProgressClasses } from "@mui/material";

type Props = {
  progress: number;
  children?: JSX.Element;
  size: string;
};

const UploadProgress = ({ progress, children, size }: Props) => {
  return (
    <div className="flex relative" title={"Uploading... " + progress + "%"}>
      <div className="absolute top-0 bottom-0 left-0 right-0 justify-center items-center flex">
        {children}
      </div>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        size={size}
        value={100}
      />
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={size}
        value={progress}
      />
    </div>
  );
};

export default UploadProgress;

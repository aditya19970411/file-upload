import { StorageReference } from "firebase/storage";

export type userFile = {
  name?: string;
  downloadUrl?: string;
  storageRef?: StorageReference;
};

export type User = {
  email?: string;
  email_verified?: Boolean;
  family_name?: string;
  given_name?: string;
  locale?: string;
  name?: string;
  picture?: string;
  sub?: string;
  exp?: string;
};

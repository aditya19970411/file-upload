import React from "react";
import { GoogleLogout } from "react-google-login";
import * as gcp from "../gcp-config.json";

const Logout = () => {
  const {
    web: { client_id },
  } = gcp;

  const onSuccess = (): void => {
    alert("Logout successfully !!!");
  };

  return (
    <div>
      <GoogleLogout
        clientId={client_id}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
};

export default Logout;

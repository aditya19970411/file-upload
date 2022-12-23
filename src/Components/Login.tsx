import React, { useContext } from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import AuthContext from "../Context/AuthContext";
import jwt_decode from "jwt-decode";
import { User } from "../types";

type Props = {};

const Login = (props: Props) => {
  const authContext = useContext(AuthContext);

  // Handle Login success function
  const onSuccess = async ({
    clientId,
    credential,
    select_by,
  }: CredentialResponse) => {
    // const tokens = await fetch(
    //   "https://www.googleapis.com/oauth2/v3/userinfo",
    //   {
    //     method: "POST",
    //     headers: { Authorization: `Bearer ${access_token}` },
    //   }
    // ).then((res) => res.json());

    if (credential) {
      let decodedCred: User = jwt_decode(credential);
      const userDetails: User = { ...decodedCred };

      authContext?.setAuth(userDetails);
    }
  };

  const onError = () => {
    console.log("[Login Failed]");
  };

  // const login = useGoogleLogin({
  //   onSuccess,
  //   onError,
  // });

  return (
    <div>
      {/* <button
        className="px-5 py-3 rounded-md bg-blue-400"
        onClick={() => login()}
      >
        Sign in with Google 🚀{" "}
      </button> */}
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
        useOneTap
        auto_select
      />
    </div>
  );
};

export default Login;

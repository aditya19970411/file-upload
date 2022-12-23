import React, { useState } from "react";
import Login from "./Components/Login";
import AuthContext, { defaultAuthContextState } from "./Context/AuthContext";
import Files from "./Components/Files";
// import Logout from "./Components/Logout";

function App() {
  const [AuthContextState, setAuthContextState] = useState({
    ...defaultAuthContextState,
    setAuth: (user: {}): void => {
      setAuthContextState((prevAuthContextState) => {
        return { ...prevAuthContextState, user };
      });
    },
    getUser: () => AuthContextState.user,
    deleteAuth: () => {
      setAuthContextState({
        ...AuthContextState,
        user: {},
      });
    },
  });

  return (
    <AuthContext.Provider value={AuthContextState}>
      <div className="min-h-[100vh] flex flex-col gap-5 p-5 bg-gray-800">
        {Object.keys(AuthContextState.user)?.length > 0 ? <Files /> : <Login />}
        {/* <Logout /> */}
      </div>
    </AuthContext.Provider>
  );
}

export default App;

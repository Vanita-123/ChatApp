import SignUp from "./Component/Page/SignUp";
import SignIn from "./Component/Page/SingIn";
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Left from "./Component/Left/Left";
import Logout from "./Component/Left/Left1/Logout";
import { Right } from "./Component/Right/Right";
import { UseAuth } from "./Component/Context/AuthProvider";
function App() {
  const [authuser] = UseAuth();
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authuser ? (
              <div className="flex h-screen">
                <Logout />
                <Left />
                <Right />
              </div>
            ) : (
              <Navigate to="/SignIn" />
            )
          }
        />
        <Route
          path="/SignIn"
          element={authuser ? <Navigate to="/" /> : <SignIn />}
        />
        <Route
          path="/SignUp"
          element={authuser ? <Navigate to="/" /> : <SignUp />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

function App() {
  // const myMessage = "this is my message to you mars people";

  const {
    loginWithRedirect,
    loginWithPopup,
    isAuthenticated,
    user,
    logout,
    getAccessTokenSilently,
  } = useAuth0();
  // console.log("isAuthenticated", isAuthenticated);

  async function getPublicRoute() {
    try {
      await axios.get("/api/").then((resp) => resp.data);
    } catch (error) {
      console.log(error.message);
    }
    // console.log(data1);
  }

  async function getPrivateRoute() {
    try {
      const token = await getAccessTokenSilently();
      await axios
        .get("/api/protectedRoute", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((resp) => console.log(resp.data));
    } catch (error) {
      console.log(error);
    }
  }

  // const authObject = useAuth0();
  // console.log(authObject);
  return (
    <div className="App">
      <button onClick={loginWithRedirect}>Login with redirect</button>
      <button onClick={() => loginWithPopup()}>Login with popup</button>
      {isAuthenticated && <button onClick={logout}>logout</button>}
      {isAuthenticated && (
        <div>
          <h1>Welcome {user.nickname}</h1>
          <h2>{user.email}</h2>
          <img
            src={user.picture}
            alt="avatar"
            style={{ height: "50px", width: "50px" }}
          />

          <span>verified: {user.email_verified ? "TRUE" : "FALSE"}</span>
        </div>
      )}
      <button onClick={getPublicRoute}>Get route</button>
      <button onClick={getPrivateRoute}>
        Get Private route to get jwt token
      </button>
      <div>user is {isAuthenticated ? "logged in" : "not logged in"}</div>
    </div>
  );
}

export default App;

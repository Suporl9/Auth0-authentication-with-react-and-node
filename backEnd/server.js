const { default: axios } = require("axios");
const express = require("express");
require("colors");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
// const cors = require("cors");
// console.log(express);
const app = express();
const PORT = 5000;
// const errorHandler = require("./errorMiddleWare");

const jwksUri = "";
const identifier = "";
const issuer = "";
const passInToAuth0URL = "";

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: jwksUri,
  }),
  audience: identifier,
  issuer: issuer,
  algorithms: ["RS256"],
}).unless({ path: ["/api/"] });

app.use(jwtCheck);

//lets provide in with route
app.get("/api/", (req, res) => {
  console.log("public route called");
  res.send("Hello this is a public route");
});

app.get("/api/protectedRoute", async (req, res) => {
  try {
    console.log("protected route called ");

    const accessToken = req.headers.authorization.split(" ")[1];

    const userInfo = await axios
      .get(passInToAuth0URL, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then((resp) => resp.data);

    res.send(userInfo);
  } catch (error) {
    res.send(error.message);
  }
});

// app.use((req, res, next) => {
//   const error = new Error("not found");
//   error.status = 404;
//   next(errorHandler);
// });

// app.use(errorHandler);
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "internal server error";
  res.status(status).send(message);
});

app.listen(
  PORT || 5000,
  console.log(`app  is running on ${PORT} port`.yellow.bold)
);

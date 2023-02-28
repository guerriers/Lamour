require("dotenv").config();
const bodyPasser = require("body-parser");
const express = require("express");
const app = express();
const db = require("./models");
const path = require("path");
const fileupload = require("express-fileupload");
const cors = require("cors");
const { success, error } = require("consola");
const roomRoute = require("./routes/room");
const userRoute = require("./routes/user");
const serviceRoute = require("./routes/service");
const loginRoute = require("./routes/login");
const paymentRoute = require("./routes/payment");
const reportRoute = require("./routes/report");


const port = process.env.PORT || 3101;

app.use(express.static(path.join(__dirname, "img")));
app.use(cors());
app.use(fileupload());
app.use(bodyPasser.json());

app.use("/api/room", roomRoute);
app.use("/api/user", userRoute);
app.use("/api/service", serviceRoute);
app.use("/api/login", loginRoute);
app.use("/api/payment/", paymentRoute);
app.use("/api/report", reportRoute);

db.sequelize
  .sync()
  .then(() =>
    app.listen(port, () =>
      success({
        message: `Example app listening at http: //localhost:${port}`,
        badge: true,
      })
    )
  );

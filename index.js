const express = require("express");
const app = express();
const urlRoutes = require("./routes/url");
const { connectDb } = require("./connection");
const Urlss = require("./models/url");
const path = require("path");
const PORT = 4001;

connectDb(process.env.MONGODB_URL ?? "mongodb://127.0.0.1:27017/Urls");
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const allUrls = await Urlss.find({});
  console.log(allUrls);
  return res.render("home", {
    urls: allUrls,
  });
});

app.use("/url", urlRoutes);

app.listen(PORT, () => console.log("Server Started at PORT", PORT));

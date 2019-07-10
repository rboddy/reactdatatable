const express = require("express");
const path = require("path");

const app = express();

//Init Middleware
app.use(express.json({ extended: false, inflate: false }));

//Define Routes
app.use("/api/data", require("./routes/api/data"));

//Serve static assets in prod
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//Init Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

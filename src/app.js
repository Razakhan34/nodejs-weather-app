const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geoCode = require("./utilis/geocode");
const forecast = require("./utilis/forecast");

const app = express();

const port = 5000;

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Mohammed Raza",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Mohammed Raza",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "What can i do for you ? ",
    name: "Mohammed Raza",
  });
});

// app.use(express.static(path.join(__dirname, "../public/about.html")));
// app.use(express.static(path.join(__dirname, "../public/help.html")));

// app.get("/about", (req, res) => {});

// app.get("/help", (req, res) => {
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "Address must be provided !!!",
    });
    return;
  }

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) return res.send({ error });
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) return res.send({ error });
        res.send({
          location,
          forecastData,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404page", {
    title: "404 Error",
    message: "Help article not found",
    name: "Mohammed Raza",
  });
});
app.get("/*", (req, res) => {
  res.render("404page", {
    title: "404 Error",
    errorMessage: "page not found",
    name: "Mohammed Raza",
  });
});

app.listen(port, () => {
  console.log(`app running on ${port} port`);
});

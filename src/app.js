const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// __dirname
// __filename

// express is a function
const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setting up the package handlebars for dynamic templating
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// set up static directory to serve
app.use(express.static(publicDirectoryPath))

// "get" configures what the express server should do when someone tries to reach a given url

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Adam"
    });
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Adam"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Adam",
        helpText: "Very helpful text.",
    })
})

app.get("/weather", (req, res) => {
    
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address."
        })
    }

    // nested callback functions
    geocode(req.query.address, (error, { location, latitude, longitude } = {}) => {        // destructuring geo response + default param
        
        // if error, returns such that forecast is not called
        if (error) return res.send({error});
             
        forecast(latitude, longitude, (error, forecastData) => {
            
            if (error) return res.send({error});
            
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
            
        })
    })
})

app.get("/products", (req, res) => {
    
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term!"
        })
    }

    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Help",
        name: "Adam",
        errorMessage: "Help article not found."
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Adam",
        errorMessage: "Page not found."
    })
})

// async. start the server on a port. Http is 80. We use 3000 for local.
app.listen(port, () => {
    console.log("Server is up on port " + port);
});
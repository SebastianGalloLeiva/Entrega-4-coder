const { urlencoded } = require("express");
const express = require("express");
const router = require('./Routes/routes');
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/productos", router);

app.listen(8000, () => {
    console.log("Server in port 8000");
});








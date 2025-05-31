const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/submit-queja', (req, res) => {
  const { institucion, provincia, queja } = req.body;
  const texto = `Fecha: ${new Date().toLocaleString()}
Institución: ${institucion}
Provincia: ${provincia}
Queja: ${queja}
------------------------\n`;

  fs.appendFile('quejas.txt', texto, (err) => {
    if (err) return res.status(500).send("Error al guardar la queja.");
    res.send("¡Gracias por tu queja anónima!");
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  const mongoose = require("mongoose");

mongoose.connect("TU_URL_DE_MONGODB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const quejaSchema = new mongoose.Schema({
  institucion: String,
  provincia: String,
  mensaje: String,
  fecha: { type: Date, default: Date.now },
});

const Queja = mongoose.model("Queja", quejaSchema);

// Dentro del POST
app.post("/queja", (req, res) => {
  const nuevaQueja = new Queja(req.body);
  nuevaQueja.save().then(() => {
    res.send("Queja recibida");
  });
});

});

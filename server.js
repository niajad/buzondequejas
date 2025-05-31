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
});

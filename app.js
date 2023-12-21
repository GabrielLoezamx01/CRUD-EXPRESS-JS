const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./database/connection');
const routes = require('./routes/index');


dotenv.config();

const app = express();
const PORT = 3000;


(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida correctamente con la base de datos');
    await sequelize.sync();
    console.log('Modelos sincronizados con la base de datos');
  } catch (error) {
    console.error('Error al conectar o sincronizar con la base de datos:', error);
  }
})();

app.use(express.json());

app.use('/', routes); 


app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

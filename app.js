 const express = require('express');
 const mongoose = require('mongoose')
 const app = express();
 
  mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });

  mongoose.connection.on('error', (err) =>{
      if(err){
          return console.error(err)
      }
  });

  const VisitorSchnema = mongoose.Schema({ // esta es la estructura de los datos de la DB
       date: Date,
       name: String,
  });

  const SongSchema = mongoose.Schema({
      title: String,
  });

  const VisitorModel = mongoose.model('Visitor', VisitorSchnema); // Visitor nombre de la coleccion
  const SongsModel = mongoose.model('Songs', SongSchema);
  //EL segundo parametro es la estructura, que es Schema ya creada arriba

 app.get('/', (req, res) =>{
     const { name } = req.query;

     VisitorModel.create({
         date: new Date(),
         name: name ? name : 'Anonimo',
     });
     
    
    res.send(`<h1>El visitante fue almacenado con éxito</h1>`);
 });

 app.get('/songs', (req, res) =>{
    const { title } = req.query;

    SongsModel.create({
        title: title ? title : 'MissYou',
    });
    
   
   res.send(`<h1>Vivi</h1>`);
});

 

 app.listen(3000, () =>{
     console.log('Server on');
 });

 
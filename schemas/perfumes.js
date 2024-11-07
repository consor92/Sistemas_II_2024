const mongoose = require('mongoose')
const { Schema } = mongoose

const perfumeSchema = new Schema({
  codigo: {
      type: Number,          
      required: true,
      unique: true,        
      trim: true,            
    },
  nombre: { 
      type: String,          
      required: true,        
      lowercase: true,      
      trim: true,            
    },
    stock: {
      type: Number,          
      required: true,        
      min: [0, 'Stock no puede ser negativo'],  
      default: 0,           
    },
  
    precio: {
      type: Number,          
      required: true,       
      min: [0, 'El precio no puede ser negativo'], 
    },
  
    marca: {
      type: String,          
      required: true,        
      trim: true,            
    },
  
    tamanio: {
      type: String,          
      required: true,        
      trim: true,            
    },
  
    descripcion: {
      type: String,          
      trim: true,            
      maxlength: 255,        
    },
  
    categoria: {
      type: String,          
      enum: ['flora', 'dulce', 'amaderado', 'citrico', 'oriental'],  
      required: true,      
    }
  });

const Perfume = mongoose.model('Perfume', perfumeSchema)

module.exports = Perfume
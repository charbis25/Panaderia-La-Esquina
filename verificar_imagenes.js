require("dotenv").config();
const mongoose = require("mongoose");
const Categoria = require("./modelos/modeloCategoria");
const Producto = require("./modelos/modeloProducto");

// Conectar a la base de datos
const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log("Conectado a la BBDD de MongoDB!");
});

const verificarYActualizarImagenes = async () => {
    try {
        console.log("🔍 Verificando imágenes en la base de datos...\n");

        // Verificar categorías
        const categorias = await Categoria.find();
        console.log(`📁 Encontradas ${categorias.length} categorías:`);
        
        for (let categoria of categorias) {
            console.log(`  - ${categoria.nombre}: ${categoria.imagenPortada}`);
            
            // Si la imagen no tiene extensión .jpg, agregarla
            if (!categoria.imagenPortada.endsWith('.jpg')) {
                const nuevoNombre = categoria.imagenPortada + '.jpg';
                await Categoria.findByIdAndUpdate(categoria._id, { imagenPortada: nuevoNombre });
                console.log(`    ✅ Actualizado: ${categoria.imagenPortada} → ${nuevoNombre}`);
            } else {
                console.log(`    ✅ Ya tiene extensión correcta`);
            }
        }

        console.log("\n📦 Verificando productos...");
        const productos = await Producto.find();
        console.log(`📁 Encontrados ${productos.length} productos:`);
        
        for (let producto of productos) {
            console.log(`  - ${producto.nombre}: ${producto.imagenProducto}`);
            
            // Si la imagen no tiene extensión .jpg, agregarla
            if (!producto.imagenProducto.endsWith('.jpg')) {
                const nuevoNombre = producto.imagenProducto + '.jpg';
                await Producto.findByIdAndUpdate(producto._id, { imagenProducto: nuevoNombre });
                console.log(`    ✅ Actualizado: ${producto.imagenProducto} → ${nuevoNombre}`);
            } else {
                console.log(`    ✅ Ya tiene extensión correcta`);
            }
        }

        console.log("\n🎉 Verificación completada!");
        
    } catch (error) {
        console.error("❌ Error:", error.message);
    } finally {
        mongoose.connection.close();
        console.log("🔌 Conexión a la base de datos cerrada.");
    }
};

verificarYActualizarImagenes(); 
require("dotenv").config();
const mongoose = require("mongoose");
const Categoria = require("./modelos/modeloCategoria");

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

const crearCategorias = async () => {
    try {
        console.log("🔍 Verificando categorías existentes...");
        
        // Verificar si ya existen categorías
        const categoriasExistentes = await Categoria.find();
        if (categoriasExistentes.length > 0) {
            console.log(`✅ Ya existen ${categoriasExistentes.length} categorías:`);
            categoriasExistentes.forEach(cat => {
                console.log(`  - ${cat.nombre}: ${cat.imagenPortada}`);
            });
            return;
        }

        console.log("📝 Creando categorías...");

        // Datos de las categorías basados en las imágenes que tienes
        const categoriasData = [
            {
                nombre: "Dulces",
                esFemenino: true,
                imagenPortada: "bg_dulces.jpg"
            },
            {
                nombre: "Facturas",
                esFemenino: true,
                imagenPortada: "bg_facturas.jpg"
            },
            {
                nombre: "Tortas",
                esFemenino: true,
                imagenPortada: "bg_tortas.jpg"
            }
        ];

        // Insertar categorías
        for (let categoriaData of categoriasData) {
            const nuevaCategoria = new Categoria(categoriaData);
            await nuevaCategoria.save();
            console.log(`✅ Categoría creada: ${categoriaData.nombre} (${categoriaData.imagenPortada})`);
        }

        console.log("\n🎉 ¡Todas las categorías han sido creadas exitosamente!");
        console.log("🔄 Recarga tu aplicación en localhost:3000 para ver los cambios.");
        
    } catch (error) {
        console.error("❌ Error:", error.message);
    } finally {
        mongoose.connection.close();
        console.log("🔌 Conexión a la base de datos cerrada.");
    }
};

crearCategorias(); 
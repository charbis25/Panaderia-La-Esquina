require("dotenv").config();
const mongoose = require("mongoose");
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

const crearProductos = async () => {
    try {
        console.log("🔍 Verificando productos existentes...");
        
        // Verificar si ya existen productos
        const productosExistentes = await Producto.find();
        if (productosExistentes.length > 0) {
            console.log(`✅ Ya existen ${productosExistentes.length} productos:`);
            productosExistentes.forEach(prod => {
                console.log(`  - ${prod.nombre}: ${prod.imagenProducto}`);
            });
            return;
        }

        console.log("📝 Creando productos...");

        // Datos de los productos basados en las imágenes que tienes
        const productosData = [
            // DULCES
            {
                nombre: "Donas de Chocolate",
                precio: 8,
                nombreUnitario: "docena",
                descripcion: "Deliciosas donas glaseadas con chocolate, perfectas para el desayuno o merienda.",
                categorias: ["Dulces"],
                imagenProducto: "donas_chocolate.jpg"
            },
            {
                nombre: "Donas Clásicas",
                precio: 3,
                nombreUnitario: "docena",
                descripcion: "Donas tradicionales con azúcar glass, suaves y esponjosas.",
                categorias: ["Dulces"],
                imagenProducto: "donas_clasicas.jpg"
            },
            {
                nombre: "Donas de Fantasía",
                precio: 10,
                nombreUnitario: "docena",
                descripcion: "Donas decoradas con diferentes toppings y colores, ideales para celebraciones.",
                categorias: ["Dulces"],
                imagenProducto: "donas_fantasia.jpg"
            },
            {
                nombre: "Surtido de Donas",
                precio: 15,
                nombreUnitario: "docena",
                descripcion: "Variedad de donas con diferentes sabores y decoraciones.",
                categorias: ["Dulces"],
                imagenProducto: "surtido_donas.jpg"
            },
            {
                nombre: "Muffin de Chocolate",
                precio: 8,
                nombreUnitario: "unidad",
                descripcion: "Muffin húmedo y esponjoso con chips de chocolate, perfecto para acompañar el café.",
                categorias: ["Dulces"],
                imagenProducto: "muffin_chocolate.jpg"
            },

            // FACTURAS
            {
                nombre: "Facturas Surtidas",
                precio: 20,
                nombreUnitario: "docena",
                descripcion: "Variedad de facturas tradicionales con diferentes rellenos y formas.",
                categorias: ["Facturas"],
                imagenProducto: "facturas_surtidas.jpg"
            },
            {
                nombre: "Medialunas de Grasa",
                precio: 10,
                nombreUnitario: "docena",
                descripcion: "Medialunas tradicionales hechas con grasa, crocantes y sabrosas.",
                categorias: ["Facturas"],
                imagenProducto: "medialuna_grasa.jpg"
            },
            {
                nombre: "Medialunas de Manteca",
                precio: 12,
                nombreUnitario: "docena",
                descripcion: "Medialunas premium hechas con manteca, más suaves y delicadas.",
                categorias: ["Facturas"],
                imagenProducto: "medialuna_manteca.jpg"
            },
            {
                nombre: "Pastelitos Criollos",
                precio: 15,
                nombreUnitario: "docena",
                descripcion: "Pastelitos tradicionales con relleno de dulce de leche o membrillo.",
                categorias: ["Facturas"],
                imagenProducto: "pastelitos_criollos.jpg"
            },

            // TORTAS
            {
                nombre: "Torta de Chocolate",
                precio: 250,
                nombreUnitario: "unidad",
                descripcion: "Torta húmeda de chocolate con crema y decoración elegante, ideal para cumpleaños.",
                categorias: ["Tortas"],
                imagenProducto: "torta_chocolate.jpg"
            },
            {
                nombre: "Torta Lemon",
                precio: 220,
                nombreUnitario: "unidad",
                descripcion: "Torta refrescante de limón con crema y decoración cítrica.",
                categorias: ["Tortas"],
                imagenProducto: "torta_lemon.jpg"
            },
            {
                nombre: "Torta de Frutos Rojos",
                precio: 280,
                nombreUnitario: "unidad",
                descripcion: "Torta elegante decorada con frutos rojos frescos y crema chantilly.",
                categorias: ["Tortas"],
                imagenProducto: "torta_rojos.jpg"
            },
            {
                nombre: "Torta Tiramisú",
                precio: 300,
                nombreUnitario: "unidad",
                descripcion: "Torta italiana con café, mascarpone y cacao, perfecta para eventos especiales.",
                categorias: ["Tortas"],
                imagenProducto: "torta_tiramisu.jpg"
            }
        ];

        // Insertar productos
        for (let productoData of productosData) {
            const nuevoProducto = new Producto(productoData);
            await nuevoProducto.save();
            console.log(`✅ Producto creado: ${productoData.nombre} (${productoData.imagenProducto}) - $${productoData.precio}`);
        }

        console.log("\n🎉 ¡Todos los productos han sido creados exitosamente!");
        console.log(`📊 Total: ${productosData.length} productos creados`);
        console.log("🔄 Recarga tu aplicación en localhost:3000 para ver los cambios.");
        
    } catch (error) {
        console.error("❌ Error:", error.message);
    } finally {
        mongoose.connection.close();
        console.log("🔌 Conexión a la base de datos cerrada.");
    }
};

crearProductos(); 
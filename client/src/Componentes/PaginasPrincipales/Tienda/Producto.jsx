import React from 'react';
import {Link} from "react-router-dom";

// URL base del servidor backend
const SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

const Producto = ({producto}) => (
	<Link to={`/producto/${producto._id}`} className="producto">
		<img src={`${SERVER_URL}/imagenes/productos/${producto.imagenProducto}`} alt={producto.nombre} className="no-select" />

		<div className="informacion-producto">
			<h3 className="nombre">{producto.nombre}</h3>
			<p className="precio">{`BS ${producto.precio}/${producto.nombreUnitario}`}</p>
		</div>
	</Link>
);

export default Producto;

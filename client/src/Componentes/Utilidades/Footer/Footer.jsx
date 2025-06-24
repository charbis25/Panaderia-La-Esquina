import React from 'react';
import {Link} from 'react-router-dom';

import "./Footer.css";

const Footer = () => {
	return (
		<div className="contenedor-footer no-select">
			<div className="footer">
				<Link to="/" className="logo-footer">La Esquina</Link>
				<nav className="navegacion-footer">
					<Link to="/">Página Principal</Link>
					<Link to="/tienda">Tienda Virtual</Link>
					<Link to="/carrito">Tu Carrito</Link>
				</nav>
				<div className="redes-sociales">
					<i className="fab fa-facebook-f"></i>
					<i className="fab fa-twitter"></i>
					<i className="fab fa-instagram"></i>
				</div>
			</div>
		</div>
	)
};

export default Footer;

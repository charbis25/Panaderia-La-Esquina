import React, {useContext, useState} from 'react';
import "./Checkout.css";
import { EstadoGlobal } from "../../../EstadoGlobal";
import MensajeInfo from "../../Utilidades/MensajeInfo/MensajeInfo";

const bancos = [
	{ value: '', label: 'Selecciona un banco' },
	{ value: 'BNB', label: 'Banco Nacional de Bolivia (BNB)' },
	{ value: 'BMSC', label: 'Banco Mercantil Santa Cruz (BMSC)' },
	{ value: 'BISA', label: 'Banco Bisa' },
	{ value: 'UNION', label: 'Banco Unión' },
	{ value: 'BCP', label: 'Banco de Crédito BCP' },
	{ value: 'GANADERO', label: 'Banco Ganadero' },
	{ value: 'ECONOMICO', label: 'Banco Económico' },
	{ value: 'FORTALEZA', label: 'Banco Fortaleza' },
	{ value: 'FASSIL', label: 'Banco Fassil (en intervención, operaciones limitadas)' },
	{ value: 'BANCOSOL', label: 'BancoSol' },
	{ value: 'ECOFUTURO', label: 'Banco PyME Ecofuturo' },
	{ value: 'FIE', label: 'Banco FIE' },
];

const instrucciones = {
	BNB: 'Realiza una transferencia a la cuenta 1234567890 a nombre de Panadería La Esquina en el BNB.',
	BMSC: 'Realiza una transferencia a la cuenta 2345678901 a nombre de Panadería La Esquina en el BMSC.',
	BISA: 'Realiza una transferencia a la cuenta 3456789012 a nombre de Panadería La Esquina en el Banco Bisa.',
	UNION: 'Realiza una transferencia a la cuenta 4567890123 a nombre de Panadería La Esquina en el Banco Unión.',
	BCP: 'Realiza una transferencia a la cuenta 5678901234 a nombre de Panadería La Esquina en el BCP.',
	GANADERO: 'Realiza una transferencia a la cuenta 6789012345 a nombre de Panadería La Esquina en el Banco Ganadero.',
	ECONOMICO: 'Realiza una transferencia a la cuenta 7890123456 a nombre de Panadería La Esquina en el Banco Económico.',
	FORTALEZA: 'Realiza una transferencia a la cuenta 8901234567 a nombre de Panadería La Esquina en el Banco Fortaleza.',
	FASSIL: 'Banco Fassil está en intervención, operaciones limitadas. Consulta antes de transferir.',
	BANCOSOL: 'Realiza una transferencia a la cuenta 9012345678 a nombre de Panadería La Esquina en BancoSol.',
	ECOFUTURO: 'Realiza una transferencia a la cuenta 1122334455 a nombre de Panadería La Esquina en Banco PyME Ecofuturo.',
	FIE: 'Realiza una transferencia a la cuenta 2233445566 a nombre de Panadería La Esquina en Banco FIE.',
};

const Checkout = () => {
	const estado = useContext(EstadoGlobal);
	const carrito = estado.usuarioAPI.carrito[0];
	const [mensaje, setMensaje] = useState({tipo: "", texto: ""});
	const [banco, setBanco] = useState('');
	
	//* credenciales
	const [credenciales, setCredenciales] = useState({
		nombre: "",
		apellido: "",
		direccion: "",
		extraDireccion: "",
		email: "",
		telefono: ""
	});
	
	const verificarCampos = () => {
		const formulario = document.getElementById("formulario-facturacion");
		const inputs = formulario.querySelectorAll("[required]");
		
		let validado = true;
		inputs.forEach(input => {
			if(!validado) return;
			if(!input.value) validado = false;
		});
		return validado && banco;
	};
	
	const cambioInput = e => {
		const {name, value} = e.target;
		setCredenciales({...credenciales, [name]:value});
	};
	const cambioInputTelefono = e => {
		let {name, value} = e.target;
		value = (value >= 1 ? value : credenciales.telefono); // solo números
		setCredenciales({...credenciales, [name]:value});
	};
	
	const finalizarCompra = async (e) => {
		e.preventDefault();
		if (!verificarCampos()) {
			setMensaje({tipo: "error", texto: "Por favor completa todos los campos y selecciona un banco."});
			return;
		}
		setMensaje({tipo: "exito", texto: "¡El pedido ha sido registrado! Por favor realiza la transferencia y envía el comprobante."});
		setTimeout(async () => {
			await estado.usuarioAPI.borrarCarrito();
		}, 3000);
	};
	
	return (
		<main className="seccion">
			<MensajeInfo tipo={mensaje.tipo} mensaje={mensaje.texto} />
			{(estado.usuarioAPI.sesionIniciada[0] && carrito[0]) &&
			<form onSubmit={finalizarCompra} className="contenedor-facturacion">
				<div className="formulario-facturacion" id="formulario-facturacion" data-transicion style={{animationDelay: "0.4s"}}>
					<h1>Detalles de Facturación</h1>
					
					<input type="text" name="nombre" required autoComplete="on" placeholder="Nombre" value={credenciales.nombre} onChange={cambioInput} className="campo" />
					
					<input type="text" name="apellido" required autoComplete="on" placeholder="Apellido" value={credenciales.apellido} onChange={cambioInput} className="campo" />
					
					<input type="text" name="direccion" required autoComplete="on" placeholder="Dirección (calle y número)" value={credenciales.direccion} onChange={cambioInput} className="campo" />
					
					<input type="text" name="extraDireccion" autoComplete="on" placeholder="Depto, etc (opcional)" value={credenciales.extraDireccion} onChange={cambioInput} className="campo" />
					
					<input type="email" name="email" required autoComplete="on" placeholder="Correo Electrónico" value={credenciales.email} onChange={cambioInput} className="campo" />
					
					<input type="number" name="telefono" required autoComplete="on" value={credenciales.telefono} placeholder="Teléfono" onChange={cambioInputTelefono} className="campo" />
					
					<select name="banco" required value={banco} onChange={e => setBanco(e.target.value)} className="campo">
						{bancos.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
					</select>
					
				</div>
				
				<div className="pedido-facturacion" data-transicion style={{animationDelay: "0.6s"}}>
					<h1>Tu Pedido</h1>
					<div className="productos">	
						{
						carrito.map((producto) => {
							return (
								<div className="producto" key={producto._id}>
									<h3>{producto.nombre}</h3>
									<p className="cantidad">
										<span>{producto.cantidad}x </span>
										BS {producto.precio}
									</p>
									<td className="precio">BS {producto.precio}</td>
									<td className="cantidad">{producto.cantidad}</td>
									<td className="subtotal">
										<p className="subtotal">BS {producto.cantidad * producto.precio}</p>
									</td>
								</div>
							)
						})
						}
						<div className="total">
							<p className="etiqueta-total">Total Final</p>
							<p className="precio-total">BS {carrito.reduce((previo, producto) => {return previo + (producto.precio * producto.cantidad)},0)}</p>
						</div>
					</div>
					{banco && banco !== '' && (
						<div className="instrucciones-banco">
							<h2>Instrucciones de pago para {bancos.find(b => b.value === banco).label}</h2>
							<p>{instrucciones[banco]}</p>
							<p><b>Recuerda enviar el comprobante de pago por WhatsApp o email para procesar tu pedido.</b></p>
						</div>
					)}
					<div className="boton-pago-contenedor">
						<button type="submit" className="boton" style={{marginTop: '2rem'}}>Finalizar compra</button>
					</div>
					<MensajeInfo tipo={"principal"} mensaje={"Recuerda realizar la transferencia y enviar el comprobante. No se realizará ningún cobro automático."} />
				</div>
				
			</form>
			}
			
			{(estado.usuarioAPI.sesionIniciada[0] && !carrito[0]) && //? usuario sin carrito
			<div className="operacion-invalida" data-transicion style={{animationDelay: "0.2s"}}>
				<h2>¡Ups!</h2>
				<h3>Tu carrito está vacío</h3>
				<h4>Agregá tus productos favoritos para realizar un pedido.</h4>
			</div>
			}
			
			{!estado.usuarioAPI.sesionIniciada[0] && //? no hay sesion 
			<div className="operacion-invalida" data-transicion style={{animationDelay: "0.2s"}}>
				<h2>¡Ups!</h2>
				<h3>No iniciaste sesión con un usuario</h3>
				<h4>Iniciá sesión para realizar un pedido.</h4>
			</div>
			}
		</main>
	)
};

export default Checkout;

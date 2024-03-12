import './Pages.css';
import { useEffect, useState } from "react";
import ModalAgregar from "../Modal/ModalAgregar";
import EventoRenglon from "../Eventos/EventoRenglon";

interface evento {
	_id: string,
	nombre: string,
	banda: string,
	fecha: string,
	hora: string,
	descripcion: string,
}
export default function Recitales() {
	const [showModal, setShowModal] = useState(false);
	const [eventos, setEventos] = useState<evento[]>([]);

	function toggleShowModal() {
		setShowModal(!showModal);
	}

	const fetchEventos = () => {
		fetch("http://localhost:3000/eventos")
			.then((response) => response.json())
			.then((response) => {
				setEventos(response.data);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}

	useEffect(() => {
		fetchEventos();
	}, [])

	function agregar() {
		toggleShowModal();
	}

	return (
		<div className='pagRecitales'>
			<div className='recitalesTitulo'>
				<h2>Recitales</h2>
				<button className="btnAgregar" onClick={agregar}>➕</button>
			</div>
			{showModal && <ModalAgregar onClose={toggleShowModal} trigger={fetchEventos} />}

			<div className="headerRenglon">
				<div className="headerNombre">Nombre</div>
				<div className="headerBanda">Banda</div>
				<div className="headerFecha">Fecha</div>
				<div className="headerHora">Hora</div>
				<div className="headerDescripcion">Descripción</div>
				<div className='headerAcciones'>Acciones</div>
			</div>

			{eventos.map(evento => (
				<EventoRenglon key={evento._id} id={evento._id} nombre={evento.nombre} banda={evento.banda} fecha={evento.fecha} hora={evento.hora} descripcion={evento.descripcion} trigger={fetchEventos} />
			))}
		</div>
	)
}

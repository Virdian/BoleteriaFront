import './Modal.css'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface propTypes {
	onClose: () => void,
	trigger: () => void,
	data: data
};

type data = {
	id: string,
	nombre: string,
	banda: string,
	fecha: string,
	hora: string,
	descripcion: string,
};

type RecitalSubmitForm = {
	nombre: string,
	banda: string,
	fecha: string,
	hora: string,
	descripcion: string,
};

export default function ModalModificar(props: propTypes) {
	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<RecitalSubmitForm>();

	useEffect(() => {
		setValue("nombre", props.data.nombre, { shouldValidate: true });
		setValue("banda", props.data.banda, { shouldValidate: true });
		setValue("fecha", props.data.fecha, { shouldValidate: true });
		setValue("hora", props.data.hora, { shouldValidate: true });
		setValue("descripcion", props.data.descripcion, { shouldValidate: true });
	}, [])

	async function onSubmit(data: RecitalSubmitForm) {
		try {
			const response = await fetch(`http://localhost:3000/eventos/${props.data.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			const responseData = await response.json();
			if (responseData.status === 200) {
				props.trigger();
			}
		} catch (error) {
			console.error('Error submitting form:', error);
		}
		props.onClose();
	}

	return (
		<div className="modal">
			<div className="formRecital">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label className="label">Nombre</label>
						<input type="text" placeholder="Nombre" {...register("nombre", { required: "Este campo es requerido.", maxLength: { value: 50, message: "No debe ser mayor de 50 caracteres." } })} />
						{errors.nombre && <span className="error">{errors?.nombre?.message}</span>}
					</div>
					<div>
						<label className="label">Banda</label>
						<input type="text" placeholder="Banda" {...register("banda", { required: "Este campo es requerido.", maxLength: { value: 50, message: "No debe ser mayor de 50 caracteres." } })} />
						{errors.banda && <span className="error">{errors?.banda?.message}</span>}
					</div>
					<div>
						<label className="label">Fecha</label>
						<input type="text" placeholder="Fecha" {...register("fecha", { required: "Este campo es requerido.", maxLength: { value: 10, message: "No debe ser mayor de 10 caracteres." } })} />
						{errors.fecha && <span className="error">{errors?.fecha?.message}</span>}
					</div>
					<div>
						<label className="label">Hora</label>
						<input type="text" placeholder="Hora" {...register("hora", { required: "Este campo es requerido.", maxLength: { value: 8, message: "No debe ser mayor de 8 caracteres." } })} />
						{errors.hora && <span className="error">{errors?.hora?.message}</span>}
					</div>
					<div>
						<label className="label">Descripción</label>
						<textarea {...register("descripcion", { required: "Este campo es requerido." })} />
						{errors.descripcion && <span className="error">{errors?.descripcion?.message}</span>}
					</div>

					<input className="btnAceptar" type="submit" value="Modificar" />
				</form>
				<button className="btnCancelar" onClick={props.onClose}>Cancelar</button>
			</div>
		</div>
	)
}
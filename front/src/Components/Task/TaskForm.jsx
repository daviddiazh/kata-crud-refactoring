import React, { useRef, useState, useContext } from 'react';
import HOST_API from '../Connection';
import Store from '../Store';

const TaskForm = () => {
	const formRef = useRef(null);
	const { dispatch, state: { task } } = useContext(Store);
	const item = task.item;
	const [state, setState] = useState(item);

    const onAdd = (event) => {
		event.preventDefault();

		const request = {
			name: state.name,
			id: null,
		};

		const vsExprReg = /[A-Za-z0-9_]/; // Caracteres
		if (vsExprReg.test(request.name)) {
			document.querySelector(".alert").innerHTML = ""; // Alerta
			fetch(HOST_API + "/task", {
				method: "POST",
				body: JSON.stringify(request),
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then(response => response.json())
				.then((task) => {
					dispatch({ type: "add-task", item: task });
					setState({ name: "" });
					formRef.current.reset();
				});
		} else {
			document.querySelector(".alert").innerHTML = "Solo utilice caracteres Alfanuméricos";
		}
	}

	return <div className="pt-10">
		<h3>To-Do List</h3>
		<form className="formList" ref={formRef}>
			<input className="form-control" type="text" name="name" placeholder="Ingrese el nombre de la lista" defaultValue={item.name} onChange={(event) => {
				setState({ ...state, name: event.target.value })
			}} />
			<button id = "eliminar" className="btn btn-primary" onClick={onAdd} disabled={!state.name}>Nueva Lista</button>
			<div className="alert"></div>
		</form>
	</div>
	;
}

export default TaskForm;
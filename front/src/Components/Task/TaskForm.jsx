import React, { useRef, useState, useContext } from 'react';
import HOST_API from '../common/Connection';
import Store from '../common/Store';

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
			document.querySelector(".alert").innerHTML = "Solo puede utilizar caracteres Alfanuméricos";
		}
	}

	return <form className="formList" ref={formRef}>
		<input type="text" name="name" className="taskForm" placeholder="Ingrese el nombre de la lista" defaultValue={item.name} onChange={(event) => {
			setState({ ...state, name: event.target.value })
		}} />
		<button onClick={onAdd} disabled={!state.name}>Nueva Lista</button>
	</form>
	;
}

export default TaskForm;
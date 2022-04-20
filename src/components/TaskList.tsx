import { useState } from 'react';

import '../styles/tasklist.scss';

import { FiTrash, FiCheckSquare } from 'react-icons/fi';

type Task = {
	id: number;
	title: string;
	isComplete: boolean;
};

export function TaskList() {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [newTaskTitle, setNewTaskTitle] = useState('');

	function handleCreateNewTask() {
		// Valida se o campo de titulo está vazio e não deixar adicionar enquanto não tiver um valor
		if (!newTaskTitle) return;

		// Passa os valores para a nossa tarefa
		const newTask = {
			id: Math.random(), // Gera um numero aleatorio para cada task
			title: newTaskTitle, // Captura o que o usuário digitou
			isComplete: false, // Seta a task como false, para não colocala já como completada
		};

		// console.log(newTask);

		// Pego os valores antigos e seta os novos valores da nova task (newTask)
		setTasks((oldState) => [...oldState, newTask]);

		// Depois de adicionar a nova task, ele volta em branco
		setNewTaskTitle('');
	}

	function handleToggleTaskCompletion(id: number) {
		// Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

		const newTasks = tasks.map((task) =>
			task.id === id
				? {
						...task,
						isComplete: !task.isComplete,
				  }
				: task,
		);

		setTasks(newTasks);
	}

	function handleRemoveTask(id: number) {
		// Remova uma task da listagem pelo ID

		// Faz um filtro para pegar todas as tasks e remove a task que possui o ID que foi clicado
		const filteredTasks = tasks.filter((task) => task.id !== id);

		// Passa a task clicavel
		setTasks(filteredTasks);

		// console.log(filteredTasks);
	}

	return (
		<section className="task-list container">
			<header>
				<h2>Minhas tasks</h2>

				<div className="input-group">
					<input type="text" placeholder="Adicionar novo todo" onChange={(e) => setNewTaskTitle(e.target.value)} value={newTaskTitle} />
					<button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
						<FiCheckSquare size={16} color="#fff" />
					</button>
				</div>
			</header>

			<main>
				<ul>
					{tasks.map((task) => (
						<li key={task.id}>
							<div className={task.isComplete ? 'completed' : ''} data-testid="task">
								<label className="checkbox-container">
									<input type="checkbox" readOnly checked={task.isComplete} onClick={() => handleToggleTaskCompletion(task.id)} />
									<span className="checkmark"></span>
								</label>
								<p>{task.title}</p>
							</div>

							<button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
								<FiTrash size={16} />
							</button>
						</li>
					))}
				</ul>
			</main>
		</section>
	);
}

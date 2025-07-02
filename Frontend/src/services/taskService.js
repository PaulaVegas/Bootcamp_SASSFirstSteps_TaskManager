const API_URL = `${import.meta.env.VITE_BACKEND_URL}/task`;

export const getAllTasks = async () => {
	const res = await fetch(`${API_URL}/all`);
	return await res.json();
};

export const createTask = async (title) => {
	const res = await fetch(API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ title }),
	});
	return await res.json();
};

export const getTaskById = async (id) => {
	const res = await fetch(`${API_URL}/${id}`);
	return await res.json();
};

export const completeTask = async (id) => {
	const res = await fetch(`${API_URL}/complete/${id}`, {
		method: "PATCH",
	});
	return await res.json();
};

export const updateTask = async (id, data) => {
	const res = await fetch(`${API_URL}/${id}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	return await res.json();
};

export const deleteTask = async (id) => {
	const res = await fetch(`${API_URL}/${id}`, {
		method: "DELETE",
	});
	return await res.json();
};

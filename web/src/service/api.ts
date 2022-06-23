import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

interface TaskBody {
  title: string;
  isComplete: boolean;
}

interface UserBody {
  email: string;
  password: string;
}

export const createUser = async (body: UserBody) => {
  try {
    const { data } = await api.post('/login/new', body);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const loginUser = async (body: UserBody) => {
  try {
    const { data } = await api.post('/login', body);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const createTask = async (body: TaskBody) => {
  try {
    const token = JSON.parse(localStorage.getItem('token')!);
    await api.post('/tasks/create', body, { headers: { Authorization: token } });
  } catch (error) {
    console.log(error);
  }
}

export const getTasks = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('token')!);
    const { data } = await api.get(`/tasks/list`, { headers: { Authorization: token } });
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const removeTask = async (taskId: string) => {
  try {
    const token = JSON.parse(localStorage.getItem('token')!);
    await api.delete(`/tasks/delete/${taskId}`, { headers: { Authorization: token } });
  } catch (error) {
    console.log(error);
  }
}

export const updateDoneTask = async (taskId: string, isDone: boolean) => {
  try {
    const token = JSON.parse(localStorage.getItem('token')!);
    await api.patch(`/tasks/update/${taskId}`, { isDone }, { headers: { Authorization: token } });
  } catch (error) {
    console.log(error);
  }
}
import axios, { AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: 'http://localhost:4000'
})

interface TaskBody {
  title: string;
  isComplete: boolean;
  userId: number;
}

export const createUser = async () => {
  try {
    await api.post('/login');
  } catch (error) {
    console.log(error);
  }
}

export const createTask = async (body: TaskBody) => {
  try {
    await api.post('/tasks', body);
  } catch (error) {
    console.log(error);
  }
}

export const getTasks = async () => {
  try {
    const { data } = await api.get('/tasks');
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const removeTask = async (id: string) => {
  try {
    await api.delete(`/tasks/${id}`);
  } catch (error) {
    console.log(error);
  }
}

export const updateDoneTask = async (id: string, isDone: boolean) => {
  try {
    await api.patch(`/tasks/${id}/${isDone}`);
  } catch (error) {
    console.log(error);
  }
}
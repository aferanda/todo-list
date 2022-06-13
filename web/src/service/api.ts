import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:4000'
})

interface TaskBody {
  title: string;
  isComplete: boolean;
  userId: string;
}

interface UserBody {
  username: string;
  email: string;
}

export const createUser = async (body: UserBody) => {
  try {
    const { data } = await api.post('/login', body);
    return data;
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

export const getTasks = async (userId: string) => {
  try {
    const { data } = await api.get(`/tasks/${userId}`);
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
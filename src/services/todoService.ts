import axios from 'axios';
import { Todo } from '../types/Todo';

const api = axios.create({
  baseURL: 'http://localhost:5059/api/Todo',
});

export const getTodo = () => api.get<Todo[]>('/');
export const getTodoById = (id: number) => api.get<Todo>(`/${id}`);
export const addTodo = (todo: Omit<Todo, 'id'>) => api.post<Todo>('/', todo);
export const updateTodo = (id: number, todo: Partial<Todo>) => api.put<Todo>(`/${id}`, todo);
export const deleteTodo = (id: number) => api.delete<void>(`/${id}`);

export default { getTodo, getTodoById, addTodo, updateTodo, deleteTodo };

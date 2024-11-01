import axios from 'axios';
import { Todo } from '../types/Todo';

const api = axios.create({
  baseURL: 'http://localhost:5059/api/Todo',
});

// Obtener la lista completa de tareas
export const getTodo = () => api.get<Todo[]>('/');

// Agregar una nueva tarea
export const addTodo = (todo: Omit<Todo, 'id'>) => api.post<Todo>('/', todo);

// Actualizar una tarea existente por ID
export const updateTodo = (id: number, todo: Partial<Todo>) => api.put<Todo>(`/${id}`, todo);

// Eliminar una tarea por ID
export const deleteTodo = (id: number) => api.delete<void>(`/${id}`);

export default { getTodo, addTodo, updateTodo, deleteTodo };

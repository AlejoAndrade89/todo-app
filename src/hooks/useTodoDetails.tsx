import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Todo } from '../types/Todo';

const useTodoDetails = (todos: Todo[]) => {
    const { id } = useParams<{ id: string }>();

    const todo = useMemo(() => {
        return todos.find(t => t.id === Number(id));
    }, [todos, id]);

    return todo;
};

export default useTodoDetails;

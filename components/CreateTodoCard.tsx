import React, {Dispatch, SetStateAction, useState} from 'react';
import { TodoCardContainer, FormContainer} from '@/bits/Containers';
import axios from 'axios';
import { Todo } from '@/types';

interface CreateTodoCardProps {
    id: string,
    currentTodos: Todo[] | [],
    updateTodos: Dispatch<SetStateAction<Todo[]>>
}

const CreateTodoCard = ({id, currentTodos, updateTodos}: CreateTodoCardProps) => {

    const [formState, setFormState] = useState({title:"", description:""})
    const [formErrors, setFormErrors] = useState({title:"", description:""})

    const createTodo = async () => {
        const errors = {
            title: formState.title.length === 0 ? 'To-do list item must have a title' : '',
            description: formState.description.length === 0 ? 'To-do list item must have a description' : '',
        }
        if (errors.title || errors.description) {
            setFormErrors(errors)
    } else {
        try {
            const todo = {
                "sk": id,
                "title": formState.title,
                "description": formState.description,
            }
        const newTodo = await axios.post('https://k2w7488s0c.execute-api.eu-west-2.amazonaws.com/prod/todo', todo);

        const { data: { todo: { completed, sk, description, title } } } = newTodo;
        console.log("destructured: ", sk, title, description, completed)

        const editedNewTodo = {
            id: sk,
            completed,
            title,
            description
        }

        updateTodos([...currentTodos, editedNewTodo]);

        } catch (error) {
            console.log(error)
        }
    }
}

    return (
        <TodoCardContainer>
            <h1>New todo:</h1>
            <FormContainer>
            <div>
            <label htmlFor="title">Title</label>
            <input id="title" value={formState.title} onChange={e =>
                setFormState({...formState, title: e.target.value})
            }></input>
           <p>{formErrors.title}</p>
           </div>

           <div>
            <label htmlFor="description">Description</label>
            <input id="description" value={formState.description} onChange={e =>
                setFormState({...formState, description: e.target.value})
            }></input>
           <p>{formErrors.description}</p>
           </div>

           <button onClick={createTodo}>Create</button>
           </FormContainer>

           </TodoCardContainer>
    )
};

export default CreateTodoCard;
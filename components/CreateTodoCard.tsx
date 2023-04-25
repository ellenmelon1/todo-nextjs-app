import React, {useState} from 'react';
import { TodoCardContainer, FormContainer} from '@/bits/Containers';
import axios from 'axios';

const CreateTodoCard = ({id}:{id:string}) => {

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
        const newTodo = await axios.post('https://k2w7488s0c.execute-api.eu-west-2.amazonaws.com/prod/createTodo', todo);
        console.log(newTodo)

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
import React, {Dispatch, SetStateAction, useState} from 'react';
import { TodoCardContainer, FormContainer} from '@/bits/Containers';
import axios from 'axios';
import { Todo } from '@/types';
import UploadImage from './UploadImage';

interface CreateTodoCardProps {
    id: string,
    currentTodos: Todo[] | [],
    updateTodos: Dispatch<SetStateAction<Todo[]>>
}

const CreateTodoCard = ({id, currentTodos, updateTodos}: CreateTodoCardProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [isCreatingTodo, setIsCreatingTodo]=useState(false);

    const [formState, setFormState] = useState({title:"", description:""})
    const [formErrors, setFormErrors] = useState({title:"", description:""})

    const postTodoS3Image = async (s3Reference: string, fileType: string, file: File): Promise<any> => {

        try {
        const form = new FormData();
        form.append('file', file);
      
          await axios.post('/api/virusScan', form, {
            headers: {
              'Content-Type': 'multipart/form-data',
              }})
      
         const signedUrl = await axios.post('https://k2w7488s0c.execute-api.eu-west-2.amazonaws.com/prod/getSignedUrl', {"s3Reference": s3Reference, "fileType": fileType})
         
         const result = await axios.put(signedUrl.data.url, file,{
             headers: {
               'Content-Type': fileType,
             }
           })
           console.log("success: ", result);
        } catch (error){
         throw new Error;
        }}

    const createTodo = async () => {
        setIsCreatingTodo(true);

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

        if (file){
            await postTodoS3Image(sk, file.type, file);
        }

        const editedNewTodo = {
            id: sk,
            completed,
            title,
            description
        }

        updateTodos([...currentTodos, editedNewTodo]);
        setFormState({title:"", description:""})
        setIsCreatingTodo(false);

        } catch (error) {
            console.log(error)
        }
    }
}

    return (
        isCreatingTodo? <TodoCardContainer>
            <h1>Creating todo...</h1></TodoCardContainer> :
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
           <UploadImage setFile={setFile}/>

           <button onClick={createTodo}>Create Todo</button>
           </FormContainer>
           </TodoCardContainer>
    )
};

export default CreateTodoCard;
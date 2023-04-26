import { BackgroundContainer, MainContainer} from '@/bits/Containers';
import { MainHeading } from '@/bits/MainHeading';
import TodoCard from '@/components/TodoCard';
import { fetchMessage, listTodos} from '@/todos'
import { Todo } from '@/types'
import axios from 'axios';
import { useState } from 'react';
import useSwr from 'swr'
import FormData from 'form-data'
import { File } from 'buffer';
import CreateTodoCard from '@/components/CreateTodoCard';

export const postTodoS3Image = async (s3Reference: string, fileType: string, file: File): Promise<any> => {

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
   console.log(error);
  }}

export const getStaticProps = async () => {
  try {
    const todos = await listTodos();
    return {
      props: {
        todos
      }
    }
  } catch (error) {
    return {
      props: {
        error: error
      }
    }
  }
}

// useful for testing the lambda function

// const getSignedUrl = async () => {
//   try {
//     const response = await axios.post('https://k2w7488s0c.execute-api.eu-west-2.amazonaws.com/prod/getSignedUrl', {"s3Reference": "please work?", "fileType": "image/png"})
//     console.log(response)
//   } catch (error){
//     console.error(error);
//   }
// }

export default function Home({todos}: {todos: Todo[]}) {
  const [currentTodos, setCurrentTodos] = useState(todos)
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files?.[0];
    if (!fileObj || !fileObj.type) return;
    // bc/ 'buffer' file type and node.js file types are slightly different
    setFile(fileObj);
  }

  return (
    <BackgroundContainer>
      <MainContainer>
        <MainHeading>Todo List:</MainHeading>
        <CreateTodoCard id={(currentTodos.length+1).toString()} updateTodos={setCurrentTodos} currentTodos={currentTodos}/>
        <input type="file" onChange={(e)=>handleFileChange(e)}></input>
        <button disabled={!file} onClick={() => {postTodoS3Image((currentTodos.length+1).toString(), file!.type, file)}}>Upload image</button>

        {currentTodos.map(({id, title, description, completed}) => {
          return <TodoCard key={id} id={id} title={title} description={description} completed={completed} />
          })}
      </MainContainer>
    </BackgroundContainer>
  )
}


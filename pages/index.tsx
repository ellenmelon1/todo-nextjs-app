import { BackgroundContainer, MainContainer} from '@/bits/Containers';
import { MainHeading } from '@/bits/MainHeading';
import TodoCard from '@/components/TodoCard';
import { listTodos} from '@/todos'
import { Todo } from '@/types'
import axios from 'axios';
import { useState } from 'react';
import useSwr from 'swr'

// can use swr to fetch data from api (e.g. https://github.com/vercel/next.js/tree/canary/examples/api-routes-rest

export const postTodoS3Image = async (s3Reference: string, fileType: string, file: any): Promise<any> => {
  try {
   const response = await axios.post('https://k2w7488s0c.execute-api.eu-west-2.amazonaws.com/prod/getSignedUrl', {"s3Reference": s3Reference, "fileType": fileType})
   
   const result = await axios.put(response.data.url, file,{
       headers: {
         'Content-Type': fileType,
       }
     })
     console.log("success!")
  } catch (error){
   console.log(error)
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

// helped when setting up the api gateway
const fetchMessage = async () => {
  axios.get('https://k2w7488s0c.execute-api.eu-west-2.amazonaws.com/prod/')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });
}

// useful for testing the lambda function

// const getSignedUrl = async () => {
//   try {
//     const response = await axios.post('https://k2w7488s0c.execute-api.eu-west-2.amazonaws.com/prod/getSignedUrl', {"s3Reference": "please work?", "fileType": "image/png"})
//   } catch (error){
//     console.error(error);
//   }
// }

export default function Home({todos}: {todos: Todo[]}) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files?.[0];
    if (!fileObj || !fileObj.type) return;
    setFile(fileObj);
  }

  return (
    <BackgroundContainer>
      <MainContainer>
        <MainHeading>Todo List:</MainHeading>
        {/* <button onClick={() => {fetchMessage()}}>fetch message</button>
        <button onClick={()=> {getSignedUrl()}}>Get a signed url</button> */}
        <input type="file" onChange={(e)=>handleFileChange(e)}></input>
        <button disabled={!file} onClick={() => {postTodoS3Image((todos.length+1).toString(), file!.type, file)}}>Upload image</button>
        {todos.map(({id, title, description, completed}) => {
          return <TodoCard key={id} id={id} title={title} description={description} completed={completed} />
          })}
      </MainContainer>
    </BackgroundContainer>
  )
}


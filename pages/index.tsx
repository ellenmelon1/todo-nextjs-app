import { BackgroundContainer, MainContainer} from '@/bits/Containers';
import { MainHeading } from '@/bits/MainHeading';
import TodoCard from '@/components/TodoCard';
import { listTodos} from '@/todos'
import { Todo } from '@/types'
import { useState } from 'react';
import CreateTodoCard from '@/components/CreateTodoCard';

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

  return (
    <BackgroundContainer>
      <MainContainer>
        <MainHeading>Todo List:</MainHeading>
        <CreateTodoCard id={(currentTodos.length+1).toString()} updateTodos={setCurrentTodos} currentTodos={currentTodos}/>

        {currentTodos.map(({id, title, description, completed}) => {
          return <TodoCard key={id} id={id} title={title} description={description} completed={completed} />
          })}
      </MainContainer>
    </BackgroundContainer>
  )
}


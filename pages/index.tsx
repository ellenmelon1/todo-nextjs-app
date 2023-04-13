import { BackgroundContainer, MainContainer} from '@/bits/Containers';
import { MainHeading } from '@/bits/MainHeading';
import TodoCard from '@/components/TodoCard';
import { listTodos } from '@/todos'
import { Todo } from '@/types'

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

export default function Home({todos}: {todos: Todo[]}) {
  return (
    <BackgroundContainer>
      <MainContainer>
        <MainHeading>Todo List:</MainHeading>
        {todos.map(({id, title, description, completed}) => {
          return <TodoCard key={id} id={id} title={title} description={description} completed={completed} />
          })}
      </MainContainer>
    </BackgroundContainer>
  )
}

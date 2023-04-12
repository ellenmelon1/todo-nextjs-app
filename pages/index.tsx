import { listTodos } from '@/todos'
import { Todo } from '@/types'
import Link from 'next/link'

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
<div>
  {todos.map(({id, title, description}) => {
    return (
      <div key={id}>
        <Link href={`${id}`}>{title}</Link>
        </div>
    )
  })}
</div>
  )
}

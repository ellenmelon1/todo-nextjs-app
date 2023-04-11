import { Inter } from 'next/font/google'
import { listTodos } from '@/todos'
import { Todo } from '@/types'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const getStaticProps = async () => {
  const todos = await listTodos();
  return {
    props: {todos}
  }
}

interface TodoItem {
  params: Todo
}

export default function Home({todos}: {todos: TodoItem[]}) {
  return (
<div>
  {todos.map((item: TodoItem, index: number) => {
    return (
      <div key={index}>
        <Link href={`${item.params.id}`}>{item.params.title}</Link>
        </div>
    )
  })}
</div>
  )
}

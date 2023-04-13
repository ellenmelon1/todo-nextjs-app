import { Todo } from '@/types';
import { getTodoIds, getTodoData} from '../todos';
import { GetStaticProps } from 'next'

export const getStaticPaths = async () => {
    const paths = await getTodoIds();
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const {id} = context.params!;
    const todoData = await getTodoData(id as string);

    return {
        props: {
            todoData
        }
    }
}

export default function TodoPage({todoData}:{todoData: Todo}) {
    return (
        <div>
            <h1>{todoData.title}</h1>
        </div>
    )
}
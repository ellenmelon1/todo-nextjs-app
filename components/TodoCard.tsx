import { LinkAsDiv } from "@/bits/LinkAsDiv";
import TodoCompletedP from "./TodoCompletedP";
import Image from 'next/image'

interface TodoCardProps {
    title: string,
    description: string,
    completed: string,
    id: string
}

const TodoCard = ({id, title, description, completed}: TodoCardProps) => {
    return (
       <LinkAsDiv href={`${id}`} key={id}>
            <h1>{title}</h1>
            <p>{description}</p>
            <Image src={`https://cdkstack-todolist2useruploadsbucket76b21478-2uva9n483eb.s3.eu-west-2.amazonaws.com/${id}`}alt="photo" width={500}
        height={500}/>
            <TodoCompletedP completed={completed}/>
        </LinkAsDiv>
    )
}

export default TodoCard;
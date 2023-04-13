import styled from "styled-components";

interface CompletedProps {
    completed: boolean;
}

const Completed = styled.p<CompletedProps>`
    background: ${props => props.completed ? "#07da63" : "#fb3b1e"};
    padding: 5px; 
    margin-bottom: 10px;
    border-radius: 5px;
`

const TodoCompletedP = ({ completed }: { completed: string }) => {
    const completedBool = completed === "true" ? true : false;
    return (
        <Completed completed={completedBool}>{completedBool ? "Completed" : "Not Completed"}</Completed>
    )
}

export default TodoCompletedP;
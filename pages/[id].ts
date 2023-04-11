// import { getAllTodoIds, getTodoData} from '../todos';
// import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

// export const getStaticProps: GetStaticProps = async (context) => {
//     const todoData = await getTodoData(context.id);
//     return {
//         props: {
//             todoData
//         }
//     }
// }

// export const getStaticPaths = async () => {
//     const paths = await getAllTodoIds();
//     return {
//         paths,
//         fallback: false
//     }
// }
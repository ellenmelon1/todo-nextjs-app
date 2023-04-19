import { listTodos } from "@/todos";
import { Todo } from "@/types";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { useState, useEffect } from "react";
import { GridApi, ColumnApi, GridOptions} from "ag-grid-community";

// export const getStaticProps = async () => {
//     try {
//       const todos = await listTodos();
//       return {
//         props: {
//           todos
//         }
//       }
//     } catch (error) {
//       return {
//         props: {
//           error: error
//         }
//       }
//     }
//   }


//   {todos}: {todos: Todo[]}


const Grid = () => {
    const [todos, setTodos] = useState([]);
    const [gridOptions, setGridOptions] = useState<GridOptions>();
 
    useEffect(() => {
      fetch('./api/fetchtodos')
        .then((response) => response.json())
        .then((data) => setTodos(data));
    }, []);

    // const onButtonClick = () => {
    //     const selectedNodes = gridApi.getSelectedNodes();
    //     const selectedData = selectedNodes.map(node => node.data);
    //     const selectedDataString = selectedData
    //       .map(node => `${node.make} ${node.model}`)
    //       .join(', ');
    //     setSelectedNodes(selectedNodes);
    //     setSelectedDataString(selectedDataString);
    //   };
    
      const onGridReady = (params: { api: GridApi; columnApi: ColumnApi }) => {
        setGridOptions(params);
      };

      useEffect(() => {
        if (gridOptions?.api) {
          gridOptions.api.sizeColumnsToFit();
        }
      }, [gridOptions])

    return (
        <div>
        <div className="ag-theme-alpine" style={{height: 400, width: 600}}>
        <AgGridReact
        onGridReady={onGridReady}
        onRowClicked={(e) => {console.log("row clicked", e.data)}}
        rowSelection="multiple"
            rowData={todos}
            columnDefs={
                [{headerName: 'Todos table', children: [{field: "title", filter: true, checkboxSelection: true},{field: "description", }, {field: "id", sortable: true}, {field:"completed"}]}]
                }>
         </AgGridReact>
    </div>
             <embed src="/table1.pdf" type="application/pdf" width="100%" height="600px" />
             </div>
    )}

export default Grid;
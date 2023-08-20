import "./App.css";
import {useEffect, useState} from "react"
import axios from "axios";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


interface Post {
  userId : string,
  id : string,
  title:string,
  body : string,
}
function App() {
  const [data ,setData]   = useState<Post[]>([]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'id', width: 50 },
    {
      field: 'userId',
      headerName: 'userId',
      width: 50,
      editable: false,
    },
    {
      field: 'title',
      headerName: 'title',
      width: 50,
      editable: true,
    },
    {
      field: 'body',
      headerName: 'body',
      type: 'string',
      width: 400,
      editable: false,
    }
  ];

  useEffect(()=>{
    const fetchData : any = async ()=>{
      const result : any = await axios.get("https://jsonplaceholder.typicode.com/posts");
      console.log(result)
      setData(result?.data);
    }
    fetchData();
  },[])

  
  return <>
    <Box sx={{ height: 400, width: '50%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
  </>
}

export default App;

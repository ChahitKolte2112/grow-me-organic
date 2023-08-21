import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import Department from "../component/Department";
import SubDepartment from "../component/SubDepartment";
interface Post {
    userId: string;
    id: string;
    title: string;
    body: string;
}
const Posts = () => {
    const [data, setData] = useState<Post[]>([]);

    const columns: GridColDef[] = [
        { field: "id", headerName: "id", width: 50 },
        {
            field: "userId",
            headerName: "userId",
            width: 50,
            editable: false,
        },
        {
            field: "title",
            headerName: "title",
            width: 50,
            editable: true,
        },
        {
            field: "body",
            headerName: "body",
            type: "string",
            width: 400,
            editable: false,
        },
    ];

    useEffect(() => {
        const fetchData: any = async () => {
            const result: any = await axios.get(
                "https://jsonplaceholder.typicode.com/posts"
            );
            console.log(result);
            setData(result?.data);
        };
        fetchData();
    }, []);

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ height: "80%", width: "50%" }}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        disableRowSelectionOnClick
                    />
                </Box>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ height: "80%", width: "50%" }}>
                    <Department />
                </Box>
            </div>
            {/* <div style={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ height: "80%", width: "50%" }}>
                    <SubDepartment />
                </Box>
            </div> */}
        </>
    );
};

export default Posts;

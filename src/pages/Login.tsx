import  { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import {useNavigate, useSearchParams } from "react-router-dom";
import { Person,ErrorForm } from "../utils/interfaces";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Login = () => {
    const [searchParams,setSearchParams] = useSearchParams();

    const [open, setOpen] = useState(searchParams?.get("redirect") ? true : false);
    const navigate = useNavigate();
    const [formdata, setFormData] = useState<Person>({
        email: "",
        name: "",
        mobilenumber: "",
    });
    const [errorData, setErrorData] = useState<ErrorForm>({
        email: false,
        name: false,
        mobilenumber: false,
    });
    const handleClose = () => {
        setOpen(false);
    };


   

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));



    const changeHandler = (e: any) => {
        setFormData({ ...formdata, [e.target.name]: e.target.value });
        setErrorData({ ...errorData, [e.target.name]: false });
    };
    const handleSubmit = (event: any) => {
        event.preventDefault();
        let temp: ErrorForm = {
            email: false,
            name: false,
            mobilenumber: false,
        };
        if (formdata.email === "") {
            temp = { ...temp, email: true };
        }

        if (formdata.name === "") {
            temp = { ...temp, name: true };
        }
        if (
            formdata.mobilenumber === "" ||
            formdata.mobilenumber.length !== 10
        ) {
            temp = { ...temp, mobilenumber: true };
        }

        setErrorData(temp);

        if (
            formdata.email &&
            formdata.name &&
            formdata.mobilenumber &&
            formdata.mobilenumber.length === 10
        ) {
            
            let jsonobj = JSON.stringify(formdata);
            localStorage.setItem("userdetails", jsonobj);
           
            if(searchParams?.get("redirect")){
                let t : any = {'redirect':searchParams?.get("redirect")}
                t  = JSON.stringify(t);
                setSearchParams(t);
                navigate(`/${searchParams?.get("redirect")}`);
            }else{
                navigate("/home")
            }
        }
    };
    useEffect(() => {
        if (localStorage.getItem("userdetails")) {
            navigate("/home");
        }
    }, []);
    return (
        <>
           
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    backgroundColor: "#f8f4f3",
                }}
            >
            
                <Box
                    sx={{
                        borderRadius: "10px",
                        padding: "25px",
                        backgroundColor: "white",
                        zIndex: "100px",
                        boxShadow: "1px 1px 10px 0px",
                    }}
                >
                    <form autoComplete={"off"} onSubmit={handleSubmit}>
                        <h2
                            style={{
                                marginBottom: "10px",
                                textAlign: "center",
                            }}
                        >
                           Register here !!!
                        </h2>
                        <TextField
                            placeholder="Name"
                            onChange={changeHandler}
                            variant="outlined"
                            color="secondary"
                            type="text"
                            name="name"
                            value={formdata.name}
                            error={errorData.name}
                            fullWidth
                            sx={{ mb: 3 }}
                            helperText={errorData.name && "Enter valid name"}
                        />
                        <TextField
                            placeholder="Email"
                            name="email"
                            onChange={changeHandler}
                            color="secondary"
                            type="email"
                            sx={{ mb: 2 }}
                            fullWidth
                            value={formdata.email}
                            error={errorData.email}
                            helperText={
                                errorData.email &&
                                "Please enter the valid email address"
                            }
                        />
                        <TextField
                            placeholder="Mobile.No"
                            onChange={changeHandler}
                            color="secondary"
                            type="number"
                            fullWidth
                            name="mobilenumber"
                            value={formdata.mobilenumber}
                            error={errorData.mobilenumber}
                            sx={{
                                mb: 3,
                            }}
                            helperText={
                                errorData.mobilenumber &&
                                "Enter 10 digit mobile number"
                            }
                        />

                        <div
                            style={{
                                display: "flex",
                                flexDirection:"column",
                                alignItems:"center",
                                justifyContent: "flex-end",
                            }}
                        >
                            <Button
                                sx={{
                                    marginTop: 1,
                                    width: "100%",
                                    height: "40px",
                                    borderRadius: 1,
                                    padding: "10px 10px",
                                    fontSize: "18px",
                                }}
                                style={{
                                    backgroundColor: "black",
                                }}
                                variant="contained"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </Box>

                <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        
        <DialogContent>
          <DialogContentText sx={{color:"red"}}>
             Please register here to access the page
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
            </Box>
        </>
    );
};

export default Login;

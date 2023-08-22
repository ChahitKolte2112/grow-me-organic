import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";


interface FormData {
    email : string,
    password:string,
    mobilenumber:string,
}

interface ErrorForm {
    email : boolean,
    password:boolean,
    mobilenumber:boolean
}


const Login = () => {
    const navigate = useNavigate();
  

    const [formdata,setFormData] = useState<FormData>({email:"",password:"",mobilenumber:""});
    const [errorData,setErrorData] = useState<ErrorForm>({email:false,password:false,mobilenumber:false})

    const changeHandler = (e: any) => {
        setFormData({...formdata,[e.target.name]:e.target.value});
        setErrorData({...errorData,[e.target.name]:false});
    };
    const handleSubmit =  (event: any) => {
        event.preventDefault();

        let temp : ErrorForm = {email:false,password:false,mobilenumber:false}
        if (formdata.email === "") {
            temp = {...temp,email:true};
        }
       
        if (formdata.password === "" ) {
            temp = {...temp,password:true};
        }
        if (formdata.mobilenumber === "" || formdata.mobilenumber.length !== 10) {
            temp = {...temp,mobilenumber:true};
        }

        setErrorData(temp);
       
        if (formdata.email && formdata.password && formdata.mobilenumber) {
            let details: FormData = {
                email: formdata.email,
                password: formdata.password,
                mobilenumber: formdata.mobilenumber,
            };
            let jsonobj = JSON.stringify({email:details?.email,mobilenumber:details?.mobilenumber});
            localStorage.setItem("userdetails", jsonobj);
            navigate("/home");
        }
        console.log(errorData)
    };
    useEffect(() => {
        if (localStorage.getItem("userdetails")) {
            navigate("/home");
        }
    }, []);
    return (
        <React.Fragment>
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
                            Login Form
                        </h2>
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
                        />
                        <TextField
                            placeholder="Password"
                            onChange={changeHandler}
                            variant="outlined"
                            color="secondary"
                            type="password"
                            name="password"
                            value={formdata.password}
                            error={errorData.password}
                            fullWidth
                            sx={{ mb: 3 }}
                        />
                        <div
                            style={{
                                display: "flex",
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
                                    fontSize: "20px",
                                }}
                                style={{
                                    backgroundColor: "black",
                                }}
                                variant="contained"
                                type="submit"
                            >
                                Login
                            </Button>
                        </div>
                    </form>
                </Box>
            </Box>
        </React.Fragment>
    );
};

export default Login;

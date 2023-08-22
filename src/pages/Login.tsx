import { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Person,ErrorForm } from "../utils/interfaces";

const Login = () => {
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
            navigate("/home");
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
                            Details{" "}
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
                                Submit Details
                            </Button>
                        </div>
                    </form>
                </Box>
            </Box>
        </>
    );
};

export default Login;

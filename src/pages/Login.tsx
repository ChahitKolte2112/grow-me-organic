import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobilenumber, setMobilenumber] = useState("");
    const [mobilenumbererror, setMobilenumberError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const changeHandler = (e: any) => {
        if (e.target.name === "email") {
            setEmail(e.target.value);
            setEmailError(false);
        }
        if (e.target.name === "password") {
            setPassword(e.target.value);
            setPasswordError(false);
        }
        if (e.target.name === "mobilenumber") {
            setMobilenumber(e.target.value);
            setMobilenumberError(false);
        }
    };
    const handleSubmit = (event: any) => {
        event.preventDefault();

        setEmailError(false);
        setPasswordError(false);

        if (email === "") {
            setEmailError(true);
        }
        if (password === "") {
            setPasswordError(true);
        }
        if (mobilenumber === "") {
            setMobilenumberError(true);
        }
        if (email && password && mobilenumber) {
            let details: {
                email: string;
                password: string;
                mobilenumber: string;
            } = {
                email: email,
                password: password,
                mobilenumber: mobilenumber,
            };
            let jsonobj = JSON.stringify(details);
            localStorage.setItem("userdetails", jsonobj);

            navigate("/post");
        }
    };

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
                        border: "2px solid black",
                        borderRadius: "10px",
                        padding: "25px",
                        backgroundColor: "white",
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
                            value={email}
                            error={emailError}
                        />
                        <TextField
                            placeholder="Mobile.No"
                            onChange={changeHandler}
                            color="secondary"
                            type="number"
                            fullWidth
                            name="mobilenumber"
                            value={mobilenumber}
                            error={mobilenumbererror}
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
                            value={password}
                            error={passwordError}
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

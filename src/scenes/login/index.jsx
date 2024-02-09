import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { saveUserData, getUserData } from '../../data/auth';
import { saveUserInfo } from '../../data/userinfo';
import { fetchEasyIntrosUserInfo } from '../../data/apis';

const initialValues = {
    email: "",
    password: "",
};

const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const userSchema = yup.object().shape({
    email: yup.string().matches(emailRegEx, "Invalid Email").required("Required"),
    password: yup.string().required("Required"),
});

const Login = ({ onLoginSuccess }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = async (values) => {
        // Your existing form submission logic
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // Center horizontally
                justifyContent: 'center', // Center vertically
                height: '100vh', // 100% of the viewport height
            }}
        >
            <Header title="Login" subtitle="Start Cold Outreach Today!" />
            <Box sx={{ mx: "auto", width: 200 }}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={userSchema}
                    onSubmit={handleFormSubmit}
                >
                    {({ values, errors, touched, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                                sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 2" } }}
                            >
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Email"
                                    onBlur={handleChange}
                                    onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                    error={!!touched.email && !!errors.email}
                                    helperText={touched.email && errors.email}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type={showPassword ? "text" : "password"}
                                    label="Password"
                                    onBlur={handleChange}
                                    onChange={handleChange}
                                    value={values.password}
                                    name="password"
                                    error={!!touched.password && !!errors.password}
                                    helperText={touched.password && errors.password}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <Button
                                    onClick={() => setShowPassword(!showPassword)}
                                    color="blueAccent"
                                    variant="text"
                                    sx={{ gridColumn: "span 2", textAlign: "left" }}
                                >
                                    {showPassword ? "Hide Password" : "Show Password"}
                                </Button>
                            </Box>
                            <Box display="flex" justifyContent="center" mt="20px">
                                <Button type="submit" color="secondary" variant="contained">
                                    Login
                                </Button>
                            </Box>
                            <Button
                                component={Link}
                                to="https://www.easyintros.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                color="blueAccent"
                                variant="text"
                                fullWidth
                                sx={{ textAlign: 'left', mt: 1 }}
                            >
                                No Account? Sign Up Here!
                            </Button>
                        </form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
};

export default Login;



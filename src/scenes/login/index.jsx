import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

    const handleFormSubmit = async (values) => {
        try {
            const response = await fetch('https://easyintros.com/api/1.1/wf/loginapi', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Username: values.email,
                    Password: values.password,
                }),
            });

            const data = await response.json(); // Store the response data

            if (data.status === 'success') {
                const currentTime = Math.floor(Date.now() / 1000); 
                const expirationTime = currentTime + data.response.expires; 
                const userData = {
                    userID: data.response.user_id,
                    userToken: data.response.token,
                    userTokenExpiration: expirationTime,
                    email: values.email,
                    password: values.password,
                };

                saveUserData(userData);
                const userDataSaved = getUserData();
                const userToken = userDataSaved.userToken;
                try {
                    // Make the API call with agencentricUsername and agencentricPassword
                    
                    const info = await fetchEasyIntrosUserInfo(userToken);
                    console.log('Easy Intros API Response Login:', info);
          
                    // Update user info with Agencentric data
                    const additionalUserInfo = {
                      userID: info._id,
                      UserStatus: info.token,
                      AgencentricToken: info.AgencentricToken,
                      UserFullName: info.FullName, 
                      UserStatus: info.user_signed_up,
                      InstagramPassword: info.InstagramPassword,
                      InstagramUsername: info.InstagramUsername,
                    };
                    console.log("User info after login:", additionalUserInfo)
                    saveUserInfo(additionalUserInfo);
                  } catch (error) {
                    console.error('Error fetching additional user info:', error);
                  }
                console.log("User Data after login:", userData)

                // After successful login, navigate to the dashboard ("/")
                navigate("/");

                onLoginSuccess();
            } else {
                // Handle login failure
                console.error('Login failed:', data);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
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
                                    color="primary"
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
                        </form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
};

export default Login;


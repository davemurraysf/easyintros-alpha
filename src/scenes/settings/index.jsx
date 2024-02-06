import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
    Button,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";

const initialValues = {
    facebookUsername: "",
    facebookPassword: "",
    instagramUsername: "",
    instagramPassword: "",
    agencentricToken: "",
};

const validationSchema = yup.object().shape({
    facebookUsername: yup.string().required("Required"),
    facebookPassword: yup.string().required("Required"),
    instagramUsername: yup.string().required("Required"),
    instagramPassword: yup.string().required("Required"),
    agencentricToken: yup.string().required("Required"),
});

const SettingsPage = () => {
    const handleFormSubmit = (values) => {
        // Handle form submissions for Facebook, Instagram, and Agencentric Token
        // You can perform actions like saving the data here
        console.log(values);
    };

    return (
        <Container maxWidth="md">
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    User Settings
                </Typography>

                <Grid container spacing={2}>
                    {/* Facebook Connect Form */}
                    <Grid item xs={12}>
                        <Paper elevation={3}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="h2" gutterBottom>
                                        Facebook Connect
                                    </Typography>
                                    <Formik
                                        initialValues={{ ...initialValues }}
                                        validationSchema={validationSchema}
                                        onSubmit={handleFormSubmit}
                                    >
                                        <Form>
                                            <Field name="facebookUsername">
                                                {({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Username"
                                                        variant="outlined"
                                                        fullWidth
                                                        margin="normal"
                                                    />
                                                )}
                                            </Field>
                                            <Field name="facebookPassword">
                                                {({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Password"
                                                        variant="outlined"
                                                        fullWidth
                                                        type="password"
                                                        margin="normal"
                                                    />
                                                )}
                                            </Field>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                            >
                                                Save
                                            </Button>
                                        </Form>
                                    </Formik>
                                </CardContent>
                            </Card>
                        </Paper>
                    </Grid>

                    {/* Instagram Connect Form */}
                    <Grid item xs={12}>
                        <Paper elevation={3}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="h2" gutterBottom>
                                        Instagram Connect
                                    </Typography>
                                    <Formik
                                        initialValues={{ ...initialValues }}
                                        validationSchema={validationSchema}
                                        onSubmit={handleFormSubmit}
                                    >
                                        <Form>
                                            <Field name="instagramUsername">
                                                {({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Username"
                                                        variant="outlined"
                                                        fullWidth
                                                        margin="normal"
                                                    />
                                                )}
                                            </Field>
                                            <Field name="instagramPassword">
                                                {({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Password"
                                                        variant="outlined"
                                                        fullWidth
                                                        type="password"
                                                        margin="normal"
                                                    />
                                                )}
                                            </Field>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                            >
                                                Save
                                            </Button>
                                        </Form>
                                    </Formik>
                                </CardContent>
                            </Card>
                        </Paper>
                    </Grid>

                    {/* Agencentric Token Form */}
                    <Grid item xs={12}>
                        <Paper elevation={3}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="h2" gutterBottom>
                                        Agencentric Token
                                    </Typography>
                                    <Formik
                                        initialValues={{ ...initialValues }}
                                        validationSchema={validationSchema}
                                        onSubmit={handleFormSubmit}
                                    >
                                        <Form>
                                            <Field name="agencentricToken">
                                                {({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Token"
                                                        variant="outlined"
                                                        fullWidth
                                                        margin="normal"
                                                    />
                                                )}
                                            </Field>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                            >
                                                Save
                                            </Button>
                                        </Form>
                                    </Formik>
                                </CardContent>
                            </Card>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default SettingsPage;


import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Grid, TextField } from "@mui/material";

function EmployeePage() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={4}>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              name="firstName"
              type="text"
              sx={{ width: "100%" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div>{formik.errors.firstName}</div>
            ) : null}
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              name="firstName"
              type="text"
              sx={{ width: "100%" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div>{formik.errors.firstName}</div>
            ) : null}
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              name="firstName"
              type="text"
              sx={{ width: "100%" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div>{formik.errors.firstName}</div>
            ) : null}
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              name="firstName"
              type="text"
              sx={{ width: "100%" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div>{formik.errors.firstName}</div>
            ) : null}
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              name="firstName"
              type="text"
              sx={{ width: "100%" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div>{formik.errors.firstName}</div>
            ) : null}
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              name="firstName"
              type="text"
              sx={{ width: "100%" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div>{formik.errors.firstName}</div>
            ) : null}
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default EmployeePage;

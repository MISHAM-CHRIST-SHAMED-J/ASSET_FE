import { useFormik } from "formik";
import * as Yup from "yup";
import { Grid, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import EmployeeService from "../../../service/API/employee.service";
import { useState } from "react";
import { toast } from "sonner";
import { LoadingButton } from "@mui/lab";
import { useLocation, useNavigate } from "react-router-dom";

function AddEmployee() {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const addEmployeeMaster = async (payload: any, action: any) => {
    setLoading(true);
    await EmployeeService.addEmployeeMaster(payload)
      .then((res: any) => {
        setLoading(false);
        action.resetForm();
        toast.success(res?.data?.message);
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error(error.response.data.message);
      });
  };
  const formik: any = useFormik({
    initialValues: {
      emp_id: data ? data?.emp_id : "",
      name: data ? data?.name : "",
      phone: data ? data?.phone : "",
      email_id: data ? data?.email_id : "",
    },
    validationSchema: Yup.object({
      emp_id: Yup.string().required("Required"),
      name: Yup.string().required("Required"),
      phone: Yup.string().required("Required"),
      email_id: Yup.string()
        .email("Invalid email address")
        .required("Required"),
    }),
    onSubmit: (values: any, actions: any) => {
      if (data) {
        console.log("====================================");
        console.log(values);
        console.log("====================================");
      } else {
        addEmployeeMaster(values, actions);
      }
    },
  });

  console.log(data);

  return (
    <div>
      <Stack spacing={2} direction="row" mb={4} fontSize={25} fontWeight="bold">
        Employee Master
      </Stack>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={4}>
            <TextField
              id="outlined-basic"
              label="Employee ID"
              variant="outlined"
              name="emp_id"
              type="text"
              sx={{ width: "100%" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.emp_id}
            />
            {formik.touched.emp_id && formik.errors.emp_id ? (
              <div style={{ color: "red" }}>*{formik.errors.emp_id}</div>
            ) : null}
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              name="name"
              type="text"
              sx={{ width: "100%" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div style={{ color: "red" }}>*{formik.errors.name}</div>
            ) : null}
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <TextField
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              name="phone"
              sx={{ width: "100%" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              inputProps={{
                inputMode: "tel",
                pattern: "[0-9]{10}",
              }}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div style={{ color: "red" }}>*{formik.errors.phone}</div>
            ) : null}
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <TextField
              id="outlined-basic"
              label="Email ID"
              variant="outlined"
              name="email_id"
              type="email"
              sx={{ width: "100%" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email_id}
            />
            {formik.touched.email_id && formik.errors.email_id ? (
              <div style={{ color: "red" }}>*{formik.errors.email_id}</div>
            ) : null}
          </Grid>
        </Grid>
        <Stack spacing={2} direction="row" justifyContent="flex-end" mt={5}>
          <Button
            variant="outlined"
            disabled={loading}
            onClick={() => navigate(-1)}
          >
            cancel
          </Button>
          <LoadingButton loading={loading} type="submit" variant="contained">
            Submit
          </LoadingButton>
        </Stack>
      </form>
    </div>
  );
}

export default AddEmployee;

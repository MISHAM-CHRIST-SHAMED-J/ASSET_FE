import { useFormik } from "formik";
import * as Yup from "yup";
import { Autocomplete, Grid, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AssetIssueService from "../../../service/API/assign.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LoadingButton } from "@mui/lab";
import { useLocation, useNavigate } from "react-router-dom";

function AddIssueAsset() {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [empDrop, setEmpDrop] = useState<any>([]);
  const [assetDrop, setAssetDrop] = useState<any>([]);

  const today = new Date().toISOString().split("T")[0];

  const getEmployeeDropDown = async () => {
    await AssetIssueService.getEmployeeDropDown()
      .then((res: any) => {
        let result = res.data.data.map((item: any) => {
          return { ...item, label: item?.name };
        });
        setEmpDrop(result);
      })
      .catch((error: any) => {
        toast.error(error.response.data.message);
      });
  };

  const getAssetDropDown = async () => {
    await AssetIssueService.getAssetDropDown()
      .then((res: any) => {
        let result = res.data.data.map((item: any) => {
          return { ...item, label: item?.asset_name };
        });
        setAssetDrop(result);
      })
      .catch((error: any) => {
        toast.error(error.response.data.message);
      });
  };

  const addAssetIssue = async (payload: any, action: any) => {
    setLoading(true);
    await AssetIssueService.addAssetIssue(payload)
      .then((res: any) => {
        setLoading(false);
        action.resetForm();
        navigate("/IssueAsset");
        toast.success(res?.data?.message);
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error(error.response.data.message);
      });
  };

  // const EditEmployeeMaster = async (payload: any, action: any) => {
  //   setLoading(true);
  //   await EmployeeService.EditEmployeeMaster(data?.id, payload)
  //     .then((res: any) => {
  //       setLoading(false);
  //       action.resetForm();
  //       navigate("/Employee");
  //       toast.success(res?.data?.message);
  //     })
  //     .catch((error: any) => {
  //       setLoading(false);
  //       toast.error(error.response.data.message);
  //     });
  // };

  const formik: any = useFormik({
    initialValues: {
      empRef_id: data ? data?.empRef_id : "",
      assetRef_id: data ? data?.assetRef_id : "",
      asset_issue_date: data ? data?.asset_issue_date : "",
      remarks: data ? data?.remarks : "",
    },
    validationSchema: Yup.object({
      empRef_id: Yup.string().required("Required"),
      assetRef_id: Yup.string().required("Required"),
      asset_issue_date: Yup.string().required("Required"),
    }),
    onSubmit: (values: any, actions: any) => {
      if (data) {
        // EditEmployeeMaster(values, actions);
      } else {
        addAssetIssue(values, actions);
      }
    },
  });

  useEffect(() => {
    getAssetDropDown();
    getEmployeeDropDown();
  }, []);

  return (
    <div>
      <Stack spacing={2} direction="row" mb={4} fontSize={20} fontWeight="bold">
        Asign Asset to Employee
      </Stack>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={4}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={empDrop}
              sx={{ width: "100%" }}
              onChange={(event, newValue) => {
                formik.setFieldValue("empRef_id", newValue?.id);
                formik.setFieldValue("empRef_name", newValue?.label);
              }}
              value={formik.values.empRef_name}
              renderInput={(params) => (
                <TextField {...params} label="Employee" />
              )}
            />
            {formik.touched.empRef_id && formik.errors.empRef_id ? (
              <div style={{ color: "red" }}>*{formik.errors.empRef_id}</div>
            ) : null}
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={assetDrop}
              sx={{ width: "100%" }}
              onChange={(event, newValue) => {
                formik.setFieldValue("assetRef_id", newValue?.id);
                formik.setFieldValue("assetRef_name", newValue?.label);
              }}
              value={formik.values.assetRef_name}
              renderInput={(params) => <TextField {...params} label="Asset" />}
            />
            {formik.touched.assetRef_id && formik.errors.assetRef_id ? (
              <div style={{ color: "red" }}>*{formik.errors.assetRef_id}</div>
            ) : null}
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <TextField
              id="outlined-basic"
              label="Asset Issue Date"
              variant="outlined"
              name="asset_issue_date"
              type="date"
              sx={{ width: "100%" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.asset_issue_date}
              inputProps={{
                max: today, // Set max attribute to today's date
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {formik.touched.asset_issue_date &&
            formik.errors.asset_issue_date ? (
              <div style={{ color: "red" }}>
                *{formik.errors.asset_issue_date}
              </div>
            ) : null}
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <TextField
              id="outlined-basic"
              label="Remarks"
              variant="outlined"
              name="remarks"
              type="text"
              sx={{ width: "100%" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.remarks}
            />
            {formik.touched.remarks && formik.errors.remarks ? (
              <div style={{ color: "red" }}>*{formik.errors.remarks}</div>
            ) : null}
          </Grid>
        </Grid>
        <Stack spacing={2} direction="row" justifyContent="flex-end" mt={5}>
          <Button
            variant="outlined"
            disabled={loading}
            onClick={() => navigate("/IssueAsset")}
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

export default AddIssueAsset;

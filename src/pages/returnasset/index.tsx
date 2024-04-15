import { useFormik } from "formik";
import * as Yup from "yup";
import { Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AssetIssueService from "../../service/API/assign.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LoadingButton } from "@mui/lab";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

function ReturnAsset() {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const returnAssetIssue = async (payload: any, action: any) => {
    setLoading(true);
    await AssetIssueService.returnAssetIssue(
      data?.id,
      payload,
      data?.assetRef_id
    )
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

  const formik: any = useFormik({
    initialValues: {
      reason: "",
      isReturned: "",
      asset_return_date: undefined,
    },
    validationSchema: Yup.object({
      reason: Yup.string().required("Required"),
      isReturned: Yup.string().required("Required"),
      asset_return_date: Yup.string().required("Required"),
    }),
    onSubmit: (values: any, actions: any) => {
      returnAssetIssue(values, actions);
    },
  });

  return (
    <div>
      <Stack spacing={2} direction="row" mb={4} fontSize={20} fontWeight="bold">
        Return Asset
      </Stack>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <TextField
              id="outlined-basic"
              label="Asset Reurn Date"
              variant="outlined"
              name="asset_return_date"
              type="date"
              sx={{ width: "100%" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.asset_return_date}
              inputProps={{
                max: today,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {formik.touched.asset_return_date &&
            formik.errors.asset_return_date ? (
              <div style={{ color: "red" }}>
                *{formik.errors.asset_return_date}
              </div>
            ) : null}
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <TextField
              id="outlined-basic"
              label="Reason"
              variant="outlined"
              name="reason"
              type="text"
              sx={{ width: "100%" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.reason}
            />
            {formik.touched.reason && formik.errors.reason ? (
              <div style={{ color: "red" }}>*{formik.errors.reason}</div>
            ) : null}
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.isReturned}
                  name="isReturned"
                />
              }
              label="Asset Returned ?"
            />
            {formik.touched.isReturned && formik.errors.isReturned ? (
              <div style={{ color: "red" }}>*{formik.errors.isReturned}</div>
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

export default ReturnAsset;

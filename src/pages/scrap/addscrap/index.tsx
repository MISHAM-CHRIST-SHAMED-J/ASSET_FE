import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LoadingButton } from "@mui/lab";
import { useLocation, useNavigate } from "react-router-dom";
import AssetScrap from "../../../service/API/scrap.service";
import AssetIssueService from "../../../service/API/assign.service";
import moment from "moment";

function AddAssetScrap() {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dropDown, setDropDown] = useState([]);
  const [formData, setFormData] = useState<any>({
    id: data?.id,
    name: data?.asset_name,
  });

  const editAssetScrap = async (payload: any, action: any) => {
    setLoading(true);
    await AssetScrap.editAssetScrap(formData?.id || data?.id, payload)
      .then((res: any) => {
        setLoading(false);
        action.resetForm();
        navigate("/Scrap");
        toast.success(res?.data?.message);
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error(error.response.data.message);
      });
  };

  const getAssetDropForScrap = async () => {
    await AssetIssueService.getAssetDropForScrap()
      .then((res: any) => {
        let result = res.data.data.map((item: any) => {
          return { ...item, label: item?.asset_name };
        });
        setDropDown(result);
      })
      .catch((error: any) => {
        toast.error(error.response.data.message);
      });
  };

  const formik: any = useFormik({
    initialValues: {
      reason_for_scrap: data ? data?.reason_for_scrap : "",
      scrap_date: data ? moment(data?.scrap_date).format("YYYY-MM-DD") : null,
      scrap_condition: data ? data?.scrap_condition : "",
      scrapped_by: data ? data?.scrapped_by : "",
      approved_by: data ? data?.approved_by : "",
      isScrap: data ? data?.isScrap : null,
    },
    validationSchema: Yup.object({
      reason_for_scrap: Yup.string().required("Required"),
      scrap_date: Yup.string().required("Required"),
      scrap_condition: Yup.string().required("Required"),
      scrapped_by: Yup.string().required("Required"),
      approved_by: Yup.string().required("Required"),
      isScrap: Yup.string().required("Required"),
    }),
    onSubmit: (values: any, actions: any) => {
      editAssetScrap(values, actions);
    },
  });

  useEffect(() => {
    if (!data) {
      getAssetDropForScrap();
    }
  }, []);

  return (
    <div>
      <Stack
        spacing={2}
        direction="row"
        mb={4}
        fontSize={25}
        justifyContent="space-between"
        fontWeight="bold"
      >
        {data ? "Edit " : "Add "} Scrap{" "}
      </Stack>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={4}>
            <Autocomplete
              disablePortal
              disabled={data ? true : false}
              id="combo-box-demo"
              options={dropDown}
              sx={{ width: "100%" }}
              onChange={(event, newValue) => {
                setFormData({
                  ...formData,
                  name: newValue?.label,
                  id: newValue?.id,
                });
              }}
              value={formData?.name}
              renderInput={(params) => (
                <TextField {...params} label="Select Asset" />
              )}
            />
            {formik.touched.asset_category && formik.errors.asset_category ? (
              <div style={{ color: "red" }}>
                *{formik.errors.asset_category}
              </div>
            ) : null}
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <TextField
              id="outlined-basic"
              label="Reason For Scrap"
              variant="outlined"
              name="reason_for_scrap"
              type="text"
              sx={{ width: "100%" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.reason_for_scrap}
            />
            {formik.touched.reason_for_scrap &&
            formik.errors.reason_for_scrap ? (
              <div style={{ color: "red" }}>
                *{formik.errors.reason_for_scrap}
              </div>
            ) : null}
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <TextField
              id="outlined-basic"
              label="Scrap Date"
              variant="outlined"
              name="scrap_date"
              type="date"
              sx={{ width: "100%" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.scrap_date}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {formik.touched.scrap_date && formik.errors.scrap_date ? (
              <div style={{ color: "red" }}>*{formik.errors.scrap_date}</div>
            ) : null}
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <TextField
              id="outlined-basic"
              label="Scrap Condition"
              variant="outlined"
              name="scrap_condition"
              type="text"
              sx={{ width: "100%" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.scrap_condition}
            />
            {formik.touched.scrap_condition && formik.errors.scrap_condition ? (
              <div style={{ color: "red" }}>
                *{formik.errors.scrap_condition}
              </div>
            ) : null}
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <TextField
              id="outlined-basic"
              label="Scrapped By"
              variant="outlined"
              name="scrapped_by"
              type="text"
              sx={{ width: "100%" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.scrapped_by}
            />
            {formik.touched.scrapped_by && formik.errors.scrapped_by ? (
              <div style={{ color: "red" }}>*{formik.errors.scrapped_by}</div>
            ) : null}
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <TextField
              id="outlined-basic"
              label="Approved By"
              variant="outlined"
              name="approved_by"
              type="text"
              sx={{ width: "100%" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.approved_by}
            />
            {formik.touched.approved_by && formik.errors.approved_by ? (
              <div style={{ color: "red" }}>*{formik.errors.approved_by}</div>
            ) : null}
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.isScrap}
                  name="isScrap"
                  disabled={data ? true : false}
                  checked={formik.values.isScrap}
                />
              }
              label="Confirm to proceed with scrap the asset"
            />
            {formik.touched.isScrap && formik.errors.isScrap ? (
              <div style={{ color: "red" }}>*{formik.errors.isScrap}</div>
            ) : null}
          </Grid>
        </Grid>
        <Stack spacing={2} direction="row" justifyContent="flex-end" mt={5}>
          <Button
            variant="outlined"
            disabled={loading}
            onClick={() => navigate("/Scrap")}
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

export default AddAssetScrap;

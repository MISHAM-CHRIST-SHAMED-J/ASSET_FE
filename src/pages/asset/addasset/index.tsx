import { useFormik } from "formik";
import * as Yup from "yup";
import { Autocomplete, Grid, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LoadingButton } from "@mui/lab";
import { useLocation, useNavigate } from "react-router-dom";
import AssetService from "../../../service/API/asset.service";
import moment from "moment";

function AddAsset() {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dropDown, setDropDown] = useState([]);
  const today = new Date().toISOString().split("T")[0];

  const addAssetMaster = async (payload: any, action: any) => {
    setLoading(true);
    await AssetService.addAssetMaster(payload)
      .then((res: any) => {
        setLoading(false);
        action.resetForm();
        navigate("/Asset");
        toast.success(res?.data?.message);
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error(error.response.data.message);
      });
  };

  const editAssetMaster = async (payload: any, action: any) => {
    setLoading(true);
    await AssetService.editAssetMaster(data?.id, payload)
      .then((res: any) => {
        setLoading(false);
        action.resetForm();
        navigate("/Asset");
        toast.success(res?.data?.message);
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error(error.response.data.message);
      });
  };

  const getAssetCategoryDrop = async () => {
    await AssetService.getAssetCategoryDrop()
      .then((res: any) => {
        let result = res.data.data.map((item: any) => {
          return { ...item, label: item?.category };
        });
       setDropDown(result)
      })
      .catch((error: any) => {
        toast.error(error.response.data.message);
      });
  };

  const formik: any = useFormik({
    initialValues: {
      serial_no: data ? data?.serial_no : "",
      unique_id: data ? data?.unique_id : "",
      asset_name: data ? data?.asset_name : "",
      asset_category: data ? data?.asset_category : "",
      asset_description: data ? data?.asset_description : "",
      make: data ? data?.make : "",
      model: data ? data?.model : "",
      purchase_date: data
        ? moment(data?.purchase_date).format("YYYY-MM-DD")
        : "",
      asset_location: data ? data?.asset_location : "",
    },
    validationSchema: Yup.object({
      serial_no: Yup.string().required("Required"),
      unique_id: Yup.string().required("Required"),
      asset_name: Yup.string().required("Required"),
      asset_category: Yup.string().required("Required"),
      make: Yup.string().required("Required"),
      model: Yup.string().required("Required"),
      purchase_date: Yup.string().required("Required"),
    }),
    onSubmit: (values: any, actions: any) => {
      if (data) {
        editAssetMaster(values, actions);
      } else {
        addAssetMaster(values, actions);
      }
    },
  });

  useEffect(() => {
    getAssetCategoryDrop();
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
        {data ? "Edit " : "Add "} Asset{" "}
        <Button
          onClick={() => {
            navigate("/AssetCategory");
          }}
          variant="contained"
        >
          Asset Category
        </Button>
      </Stack>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={4}>
            <TextField
              id="outlined-basic"
              label="Serial Number"
              variant="outlined"
              name="serial_no"
              type="text"
              sx={{ width: "100%" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.serial_no}
            />
            {formik.touched.serial_no && formik.errors.serial_no ? (
              <div style={{ color: "red" }}>*{formik.errors.serial_no}</div>
            ) : null}
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <TextField
              id="outlined-basic"
              label="Unique ID"
              variant="outlined"
              name="unique_id"
              type="text"
              sx={{ width: "100%" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.unique_id}
            />
            {formik.touched.unique_id && formik.errors.unique_id ? (
              <div style={{ color: "red" }}>*{formik.errors.unique_id}</div>
            ) : null}
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <TextField
              id="outlined-basic"
              label="Asset Name"
              variant="outlined"
              name="asset_name"
              sx={{ width: "100%" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.asset_name}
              type="text"
            />
            {formik.touched.asset_name && formik.errors.asset_name ? (
              <div style={{ color: "red" }}>*{formik.errors.asset_name}</div>
            ) : null}
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={dropDown}
              sx={{ width: "100%" }}
              onChange={(event, newValue) => {
                formik.setFieldValue("asset_category", newValue?.label);
              }}
              value={formik.values.asset_category}
              renderInput={(params) => (
                <TextField {...params} label="Asset Category" />
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
              label="Asset Description"
              variant="outlined"
              name="asset_description"
              type="text"
              sx={{ width: "100%" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.asset_description}
            />
            {formik.touched.asset_description &&
            formik.errors.asset_description ? (
              <div style={{ color: "red" }}>
                *{formik.errors.asset_description}
              </div>
            ) : null}
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <TextField
              id="outlined-basic"
              label="Asset Location"
              variant="outlined"
              name="asset_location"
              type="text"
              sx={{ width: "100%" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.asset_location}
            />
            {formik.touched.asset_location && formik.errors.asset_location ? (
              <div style={{ color: "red" }}>
                *{formik.errors.asset_location}
              </div>
            ) : null}
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <TextField
              id="outlined-basic"
              label="Make"
              variant="outlined"
              name="make"
              type="text"
              sx={{ width: "100%" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.make}
            />
            {formik.touched.make && formik.errors.make ? (
              <div style={{ color: "red" }}>*{formik.errors.make}</div>
            ) : null}
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <TextField
              id="outlined-basic"
              label="Model"
              variant="outlined"
              name="model"
              type="text"
              sx={{ width: "100%" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.model}
            />
            {formik.touched.model && formik.errors.model ? (
              <div style={{ color: "red" }}>*{formik.errors.model}</div>
            ) : null}
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <TextField
              id="outlined-basic"
              label="Purchase Date"
              variant="outlined"
              name="purchase_date"
              type="date"
              sx={{ width: "100%" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.purchase_date}
              inputProps={{
                max: today, // Set max attribute to today's date
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {formik.touched.purchase_date && formik.errors.purchase_date ? (
              <div style={{ color: "red" }}>*{formik.errors.purchase_date}</div>
            ) : null}
          </Grid>
          {/* <Grid item xs={12} md={4} lg={4}>
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
          </Grid> */}
        </Grid>
        <Stack spacing={2} direction="row" justifyContent="flex-end" mt={5}>
          <Button
            variant="outlined"
            disabled={loading}
            onClick={() => navigate("/Asset")}
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

export default AddAsset;

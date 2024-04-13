import { useFormik } from "formik";
import * as Yup from "yup";
import { Autocomplete, Grid, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useState } from "react";
import { toast } from "sonner";
import { LoadingButton } from "@mui/lab";
import AssetService from "../../../service/API/asset.service";

function AddCategory(props: any) {
  const { handleClose, getAssetCategory, editData, setEditData } = props;
  const [loading, setLoading] = useState(false);

  const addAssetCategory = async (payload: any, action: any) => {
    setLoading(true);
    await AssetService.addAssetCategory(payload)
      .then((res: any) => {
        setLoading(false);
        action.resetForm();
        getAssetCategory();
        handleClose();
        toast.success(res?.data?.message);
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error(error.response.data.message);
      });
  };

  const editAssetCategory = async (payload: any, action: any) => {
    setLoading(true);
    await AssetService.editAssetCategory(editData?.id, payload)
      .then((res: any) => {
        setLoading(false);
        action.resetForm();
        setEditData();
        getAssetCategory();
        handleClose();
        toast.success(res?.data?.message);
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error(error.response.data.message);
      });
  };

  const formik: any = useFormik({
    initialValues: {
      category: editData ? editData?.category : "",
    },
    validationSchema: Yup.object({
      category: Yup.string().required("Required"),
    }),
    onSubmit: (values: any, actions: any) => {
      if (editData) {
        editAssetCategory(values, actions);
      } else {
        addAssetCategory(values, actions);
      }
    },
  });

  return (
    <div>
      <Stack
        spacing={2}
        direction="row"
        mb={4}
        fontSize={20}
        justifyContent="space-between"
        fontWeight="bold"
      >
        {editData ? "Edit " : "Add "} Category{" "}
      </Stack>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              id="outlined-basic"
              label="Asset Category"
              variant="outlined"
              name="category"
              type="text"
              sx={{ width: "100%" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
            />
            {formik.touched.category && formik.errors.category ? (
              <div style={{ color: "red" }}>*{formik.errors.category}</div>
            ) : null}
          </Grid>
        </Grid>
        <Stack spacing={2} direction="row" justifyContent="flex-end" mt={5}>
          <Button
            variant="outlined"
            disabled={loading}
            onClick={() => {
              formik.resetForm();
              setEditData();
              handleClose();
            }}
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

export default AddCategory;

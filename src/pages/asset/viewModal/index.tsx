import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import moment from "moment";
import { currencyConvert } from "../../../components/utility";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  overflowY: "scroll",
  maxHeight: "85%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

function ViewModel(props: any) {
  const { open, data, handleClose } = props;

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} id="hide_scroll">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Asset Details{" "}
          </Typography>

          <Grid container spacing={2} mt={2}>
            <Grid item xs={6} fontWeight={"bold"}>
              Serial No
            </Grid>
            <Grid item xs={6}>
              <b>:&nbsp;</b> {data?.serial_no}
            </Grid>
            <Grid item xs={6} fontWeight={"bold"}>
              Unique ID
            </Grid>
            <Grid item xs={6}>
              <b>:&nbsp;</b> {data?.unique_id}
            </Grid>
            <Grid item xs={6} fontWeight={"bold"}>
              Asset
            </Grid>
            <Grid item xs={6}>
              <b>:&nbsp;</b> {data?.asset_name}
            </Grid>
            <Grid item xs={6} fontWeight={"bold"}>
              Category
            </Grid>
            <Grid item xs={6}>
              <b>:&nbsp;</b> {data?.asset_category}
            </Grid>
            <Grid item xs={6} fontWeight={"bold"}>
              Model
            </Grid>
            <Grid item xs={6}>
              <b>:&nbsp;</b> {data?.model}
            </Grid>
            <Grid item xs={6} fontWeight={"bold"}>
              Make
            </Grid>
            <Grid item xs={6}>
              <b>:&nbsp;</b> {data?.make}
            </Grid>
            <Grid item xs={6} fontWeight={"bold"}>
              Description
            </Grid>
            <Grid item xs={6}>
              <b>:&nbsp;</b> {data?.asset_description}
            </Grid>
            <Grid item xs={6} fontWeight={"bold"}>
              Location
            </Grid>
            <Grid item xs={6}>
              <b>:&nbsp;</b> {data?.asset_location}
            </Grid>
            <Grid item xs={6} fontWeight={"bold"}>
              Purchase Date
            </Grid>
            <Grid item xs={6}>
              <b>:&nbsp;</b> {moment(data?.purchase_date).format("DD-MM-YYYY")}
            </Grid>
            <Grid item xs={6} fontWeight={"bold"}>
              Price
            </Grid>
            <Grid item xs={6}>
              <b>:&nbsp; {currencyConvert(data?.asset_price)}</b>
            </Grid>
          </Grid>
        </Box>
      </Modal>{" "}
    </div>
  );
}

export default ViewModel;

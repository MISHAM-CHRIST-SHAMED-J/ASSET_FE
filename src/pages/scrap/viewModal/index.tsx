import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  overflowY: "scroll",
  height: "85%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

function ViewModel(props: any) {
  const { open, handleClose, data } = props;
  console.log(data);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} id="hide_scroll">
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Asset View
          </Typography>

          <Grid container spacing={2} mt={2}>
            <Grid item xs={8}>
              jjj
            </Grid>
            <Grid item xs={4}>
              {data?.serial_no}
            </Grid>
          </Grid>
        </Box>
      </Modal>{" "}
    </div>
  );
}

export default ViewModel;

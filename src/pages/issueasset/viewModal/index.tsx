import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import moment from "moment";

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
            Asset Issued Details{" "}
          </Typography>

          <Grid container spacing={2} mt={2}>
            <Grid item xs={6} fontWeight={"bold"}>
              Issued Item
            </Grid>
            <Grid item xs={6}>
              <b>:&nbsp;</b> {data?.assetRef_name}
            </Grid>
            <Grid item xs={6} fontWeight={"bold"}>
              Issued To
            </Grid>
            <Grid item xs={6}>
              <b>:&nbsp;</b> {data?.empRef_name}
            </Grid>
            <Grid item xs={6} fontWeight={"bold"}>
              Asset Issue Date
            </Grid>
            <Grid item xs={6}>
              <b>:&nbsp;</b>{" "}
              {moment(data?.asset_issue_date).format("DD-MM-YYYY")}
            </Grid>
            <Grid item xs={6} fontWeight={"bold"}>
              Remarks
            </Grid>
            <Grid item xs={6}>
              <b>:&nbsp;</b> {data?.remarks}
            </Grid>
            {data?.isReturned && (
              <>
                <Grid item xs={6} fontWeight={"bold"}>
                  Asset Returned Date
                </Grid>
                <Grid item xs={6}>
                  <b>:&nbsp;</b>{" "}
                  {moment(data?.asset_return_date).format("DD-MM-YYYY")}
                </Grid>
                <Grid item xs={6} fontWeight={"bold"}>
                  Reason
                </Grid>
                <Grid item xs={6}>
                  <b>:&nbsp;</b> {data?.reason}
                </Grid>
              </>
            )}

            <Grid item xs={6} fontWeight={"bold"}>
              {!data?.isReturned ? (
                <span
                  style={{
                    padding: " 5px 10px",
                    backgroundColor: "#f5c7c4",
                    color: "#bf1004",
                    borderRadius: "15px",
                    fontWeight: "bold",
                    fontSize: "13px",
                  }}
                >
                  Asset Not Reclaimed
                </span>
              ) : (
                <span
                  style={{
                    padding: " 5px 10px",
                    backgroundColor: "#bbf299",
                    color: "#276104",
                    borderRadius: "15px",
                    fontWeight: "bold",
                    fontSize: "13px",
                  }}
                >
                  Asset Reclaimed
                </span>
              )}
            </Grid>
          </Grid>
        </Box>
      </Modal>{" "}
    </div>
  );
}

export default ViewModel;

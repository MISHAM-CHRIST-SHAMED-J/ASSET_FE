import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

function DashboardPage() {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 240,
              fontSize: "20px",
            }}
          >
            Total Asset
          </Paper>
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 240,
              fontSize: "20px",
            }}
          >
            {" "}
            Total Inventory Asset
          </Paper>
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 240,
              fontSize: "20px",
            }}
          >
            {" "}
            Total Issued Asset
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 240,
              fontSize: "20px",
            }}
          >
            Total Scrap
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 240,
              fontSize: "20px",
            }}
          >
            Total Scrap
          </Paper>
        </Grid>

        {/* <Grid item xs={12}>
          <Paper
            sx={{ p: 2, display: "flex", flexDirection: "column" }}
          ></Paper>
        </Grid> */}
      </Grid>
    </div>
  );
}

export default DashboardPage;

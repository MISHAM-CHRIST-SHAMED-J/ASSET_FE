import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import DashboardService from "../service/API/dashboard.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();

  const dashboardDetails = async () => {
    setLoading(true);
    await DashboardService.getDashboardDetails()
      .then((res: any) => {
        setLoading(false);
        setData(res.data.data)
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    dashboardDetails();
  }, []);

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
              borderRadius:"20px",
              backgroundImage:"linear-gradient(50deg, #7bd5f5, #1ca7ec)"
            }}
          >
            Total Asset
            <h1>{data?.AssetTotal}</h1>

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
              borderRadius:"20px",
              backgroundImage:"linear-gradient(50deg, #7bd5f5, #1ca7ec)"
            }}
          >
            {" "}
            Total Ready To Issue
            <h1>{0}</h1>
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
              borderRadius:"20px",
              backgroundImage:"linear-gradient(60deg, #7bd5f5, #1ca7ec)"
            }}
          >
            {" "}
            Total Issued 
            <h1>{0}</h1>
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
              borderRadius:"20px",
              backgroundImage:"linear-gradient(50deg, #7bd5f5, #1ca7ec)"
            }}
          >
            Total Scrap
            <h1>{0}</h1>
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
              borderRadius:"20px",
              backgroundImage:"linear-gradient(50deg, #7bd5f5, #1ca7ec)"
            }}
          >
            Total Employee
            <h1>{data?.empTotal}</h1>
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

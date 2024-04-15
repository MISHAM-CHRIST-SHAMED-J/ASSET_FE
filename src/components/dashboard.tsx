import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import DashboardService from "../service/API/dashboard.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Typography } from "@mui/material";
import { currentDate } from "./utility";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  const dashboardDetails = async () => {
    setLoading(true);
    await DashboardService.getDashboardDetails()
      .then((res: any) => {
        setLoading(false);
        setData(res.data.data);
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
      {loading ? (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "80vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {data.map((item: any, index: any) => {
            return (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    height: 240,
                    fontSize: "20px",
                    borderRadius: "20px",
                    gap: 2,
                  }}
                >
                  <Typography component="p" variant="h5">
                    {item?.name}
                  </Typography>

                  <Typography
                    component="p"
                    variant="h4"
                    sx={{ color: item?.color }}
                  >
                    {item?.count ? item?.count : 0}
                  </Typography>

                  <Typography color="text.secondary" sx={{ display: "flex" }}>
                    {currentDate()}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  );
}

export default DashboardPage;

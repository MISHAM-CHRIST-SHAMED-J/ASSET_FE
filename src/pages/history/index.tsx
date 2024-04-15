import React, { useEffect, useState } from "react";
import AssetIssueService from "../../service/API/assign.service";
import AssetHistory from "../../service/API/history.service";
import { toast } from "sonner";
import { Autocomplete, TextField } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import Typography from "@mui/material/Typography";
import { currencyConvert } from "../../components/utility";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ErrorIcon from "@mui/icons-material/Error";

function HistoryPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();
  const [dataHistory, setHistoryData] = useState([]);
  const [dropList, setDropList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getAssettHistory = async (val: number) => {
    setLoading(true);
    await AssetHistory.getAssettHistory(val)
      .then((res: any) => {
        setLoading(false);
        setData(res?.data?.data);
        setHistoryData(res?.data?.historyData);
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error(error.response.data.message);
      });
  };

  const getAssetDropDown = async () => {
    setLoading(true);
    await AssetIssueService.getAssetDropHistory()
      .then((res: any) => {
        setLoading(false);
        let result = res?.data?.data.map((item: any) => {
          return { ...item, label: item?.asset_name };
        });
        setDropList(result);
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    getAssetDropDown();
  }, []);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "15px",
        }}
      >
        <div>Asset History</div>

        <Autocomplete
          disablePortal
          size="small"
          disableClearable
          id="combo-box-demo"
          options={dropList}
          sx={{ width: "30%" }}
          onChange={(event: any, newValue: any) => {
            getAssettHistory(newValue?.id);
            setSearchValue(newValue?.asset_name);
          }}
          value={searchValue}
          renderInput={(params) => (
            <TextField {...params} label="Select for Asset History" />
          )}
        />
      </div>
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
      ) : data ? (
        <div>
          <Timeline sx={{ marginRight: 30 }}>
            <TimelineItem>
              <TimelineOppositeContent
                sx={{ m: "auto 0", display: "flex", flexDirection: "column" }}
                align="left"
                variant="body2"
                color="text.secondary"
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  Purchased On
                </Typography>
                <Typography>
                  {moment(data?.purchase_date).format("DD-MM-YYYY")}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot>
                  <AcUnitIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Typography component="span">
                  Asset :{" "}
                  <span style={{ color: "green" }}>{data?.asset_name}</span>
                </Typography>
                <Typography component="span">
                  Category :{" "}
                  <span style={{ color: "green" }}>{data?.asset_category}</span>
                </Typography>
                <Typography component="span">
                  Make : <span style={{ color: "green" }}>{data?.make}</span>
                </Typography>
                <Typography>
                  Price :{" "}
                  <span style={{ color: "green" }}>
                    {currencyConvert(data?.asset_price)}
                  </span>
                </Typography>
              </TimelineContent>
            </TimelineItem>
            {/* ************* */}

            {dataHistory.map((item: any, index: any) => {
              return (
                <TimelineItem key={index}>
                  <TimelineOppositeContent
                    sx={{
                      m: "auto 0",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    align="left"
                    variant="body2"
                    color="text.secondary"
                  >
                    <Typography sx={{ fontWeight: "light" }}>
                      Issued on
                    </Typography>
                    <Typography fontSize="12px">
                      {moment(item?.asset_issue_date).format("DD-MM-YYYY")}
                    </Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot>
                      <AcUnitIcon />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: "12px", px: 2 }}>
                    <Typography component="span">
                      Issued To : {item?.empRef_name}
                    </Typography>
                    <Typography fontSize="12px">
                      {item?.remarks ? `Remarks : ${item?.remarks}` : null}
                    </Typography>
                    <Typography fontSize="12px">
                      {item?.asset_return_date
                        ? `Returned On : ${moment(
                            item?.asset_return_date
                          ).format("DD-MM-YYYY")}`
                        : null}
                    </Typography>
                    <Typography fontSize="12px">
                      {item?.reason ? `Reason : ${item?.reason}` : null}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              );
            })}
            {/* /************ */}
            {data?.isScrap && (
              <TimelineItem>
                <TimelineOppositeContent
                  sx={{ m: "auto 0", display: "flex", flexDirection: "column" }}
                  align="left"
                  variant="body2"
                  color="text.secondary"
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    Scrapped On
                  </Typography>
                  <Typography>
                    {moment(data?.scrap_date).format("DD-MM-YYYY")}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineConnector />
                  <TimelineDot>
                    <AcUnitIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <Typography component="span">
                    Reason :{" "}
                    <span style={{ color: "red" }}>
                      {data?.reason_for_scrap}
                    </span>
                  </Typography>
                  <Typography component="span">
                    Scrap Condition :{" "}
                    <span style={{ color: "red" }}>
                      {data?.scrap_condition}
                    </span>
                  </Typography>
                  <Typography component="span">
                    Scrapped By :{" "}
                    <span style={{ color: "red" }}>{data?.scrapped_by}</span>
                  </Typography>
                  <Typography>
                    Approved By :{" "}
                    <span style={{ color: "red" }}>{data?.approved_by}</span>
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            )}
          </Timeline>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "60vh",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          <ErrorIcon sx={{ mr: 1 }} /> Select to view Asset History
        </div>
      )}
    </div>
  );
}

export default HistoryPage;

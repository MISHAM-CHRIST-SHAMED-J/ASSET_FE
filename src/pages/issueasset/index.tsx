import React, { useEffect, useState } from "react";
import AssetIssueService from "../../service/API/assign.service";
import { toast } from "sonner";
import CustomTable from "../../components/table";
import ButtonIcon from "./buttonIcon";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

function IssuedDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState(true);
  const [data, setData] = useState([]);
  const [count, setcount] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const getAssetIssue = async () => {
    setLoading(true);
    await AssetIssueService.getAssetIssue(page, limit)
      .then((res: any) => {
        setLoading(false);
        setData(res?.data?.data);
        setcount(res?.data?.count);
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error(error.response.data.message);
      });
  };

  // const searchAssetIssue = async (val: any) => {
  //   setLoading(true);
  //   await AssetIssueService.searchAssetIssue(val)
  //     .then((res: any) => {
  //       setLoading(false);
  //       setData(res?.data?.data);
  //       setcount(res?.data?.count);
  //     })
  //     .catch((error: any) => {
  //       setLoading(false);
  //       toast.error(error.response.data.message);
  //     });
  // };

  const [columnDefs] = useState<any>([
    {
      headerName: "Employee",
      field: "empRef_name",
      filter: true,
      flex: 1,
    },
    {
      headerName: "Asset",
      field: "assetRef_name",
      filter: true,
      flex: 1,
    },
    {
      headerName: "Phone",
      field: "phone",
      filter: true,
      flex: 1,
    },
    {
      headerName: "Email",
      field: "email_id",
      filter: true,
      flex: 1,
    },
    {
      headerName: "Action",
      flex: 1,
      cellRenderer: (props: any) => {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ButtonIcon
              data={props?.data}
              setStatus={setStatus}
              setLoading={setLoading}
            />
          </div>
        );
      },
    },
  ]);

  useEffect(() => {
    getAssetIssue();
  }, [page, limit, status]);
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
        <div>Issue Asset</div>
        <div>
          <TextField
            size="small"
            variant="outlined"
            value={searchValue}
            placeholder="ID / Name / Phone / Email"
            InputProps={{
              startAdornment: <SearchIcon style={{ marginRight: "10px" }} />,
            }}
            onChange={(e) => {
              const { value } = e.target;
              if (!value) {
                getAssetIssue();
                setPage(1);
                setSearchValue(value);
              } else {
                // searchEmployeeMaster(value);
                setStatus(true);
                setSearchValue(value);
              }
            }}
          />
          <Button
            variant="contained"
            disabled={loading}
            style={{ marginLeft: "10px" }}
            onClick={() => {
              navigate("/AddIssueAsset");
            }}
          >
            Issue Asset
          </Button>
        </div>
      </div>
      <CustomTable
        data={data}
        columnDefs={columnDefs}
        setPage={setPage}
        count={count}
        limit={limit}
        page={page}
      />
    </div>
  );
}

export default IssuedDashboard;

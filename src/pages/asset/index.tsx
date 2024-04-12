import React, { useEffect, useState } from "react";
import AssetService from "../../service/API/asset.service";
import { toast } from "sonner";
import CustomTable from "../../components/table";
import ButtonIcon from "./buttonIcon";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import moment from "moment";

function AssetPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState(true);
  const [data, setData] = useState([]);
  const [count, setcount] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const getAssetMaster = async () => {
    setLoading(true);
    await AssetService.getAssetMaster(page, limit, status)
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
  const searchAssetMaster = async (val: any) => {
    setLoading(true);
    await AssetService.searchAssetMaster(val)
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

  const [columnDefs] = useState<any>([
    {
      headerName: "Serial No",
      field: "serial_no",
      filter: true,
      flex: 1,
    },
    {
      headerName: "ID",
      field: "unique_id",
      filter: true,
      flex: 1,
    },
    {
      headerName: "Name",
      field: "asset_name",
      filter: true,
      flex: 1,
    },
    {
      headerName: "Make",
      field: "make",
      filter: true,
      flex: 1,
    },
    {
      headerName: "Location",
      field: "asset_location",
      filter: true,
      flex: 1,
    },
    {
      headerName: "Purchased",
      field: "purchase_date",
      cellRenderer: (props: any) => {
        return (
          moment(props?.purchase_date).format("DD-MM-YYYY")
        );
      },
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
              getAssetMaster={getAssetMaster}
              setLoading={setLoading}
            />
          </div>
        );
      },
    },
  ]);

  useEffect(() => {
    getAssetMaster();
  }, [page, limit, status]);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <div>
    
        </div>
        <div>
          <TextField
            size="small"
            variant="outlined"
            value={searchValue}
            placeholder="ID / Serial / Model / Make"
            InputProps={{
              startAdornment: <SearchIcon style={{ marginRight: "10px" }} />,
            }}
            onChange={(e) => {
              const { value } = e.target;
              if (!value) {
                getAssetMaster();
                setPage(1);
                setSearchValue(value);
              } else {
                searchAssetMaster(value);
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
              navigate("/AddAsset");
            }}
          >
            Add Asset
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

export default AssetPage;

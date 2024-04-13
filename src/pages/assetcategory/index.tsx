import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CustomTable from "../../components/table";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddCategory from "./addcategory";
import { useNavigate } from "react-router-dom";
import AssetService from "../../service/API/asset.service";
import { toast } from "sonner";
import ButtonIcon from "./buttonIcon";

function AssetCategory() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState(true);
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState();
  const [count, setcount] = useState(0);

  const getAssetCategory = async () => {
    setLoading(true);
    await AssetService.getAssetCategory(page, limit, status)
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
      headerName: "Asset Category",
      field: "category",
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
              setOpen={setOpen}
              setEditData={setEditData}
              getAssetCategory={getAssetCategory}
              setLoading={setLoading}
            />
          </div>
        );
      },
    },
  ]);

  useEffect(() => {
    getAssetCategory();
  }, []);

  return (
    <div>
      <div
        style={{
          justifyContent: "space-between",
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Button
          startIcon={<ArrowBackIosIcon />}
          variant="outlined"
          disabled={loading}
          onClick={() => {
            navigate("/AddAsset");
          }}
        >
          Back
        </Button>

        <Button
          variant="contained"
          disabled={loading}
          onClick={() => {
            handleOpen();
          }}
        >
          Add Category
        </Button>
      </div>
      <CustomTable
        data={data}
        columnDefs={columnDefs}
        setPage={setPage}
        count={count}
        limit={limit}
        page={page}
      />

      <>
        <AddCategory
          handleClose={handleClose}
          getAssetCategory={getAssetCategory}
          editData={editData}
          setEditData={setEditData}
          open={open}
        />
      </>
    </div>
  );
}

export default AssetCategory;

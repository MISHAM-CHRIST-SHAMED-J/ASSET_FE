import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CustomTable from "../../components/table";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddCategory from "./addcategory";
import { useNavigate } from "react-router-dom";
import AssetService from "../../service/API/asset.service";
import { toast } from "sonner";
import ButtonIcon from "./buttonIcon";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "55%",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

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
      <div style={{justifyContent:"space-between", display:"flex", alignItems:"center", marginBottom:"10px"}}>
        <Button
        startIcon={<ArrowBackIosIcon />}
          variant="outlined"
          disabled={loading}
          onClick={() => {
           navigate("/AddAsset")
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

      <Modal
        keepMounted
        open={open}
        onClose={() => {}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} id="hide_scroll">
          <AddCategory
            handleClose={handleClose}
            getAssetCategory={getAssetCategory}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default AssetCategory;

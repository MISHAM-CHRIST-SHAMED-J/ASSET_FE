import React from "react";
import { Box, Button, Popover } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import AssetScrap from "../../../service/API/scrap.service";
import ViewModel from "../viewModal";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function ButtonIcon(props: any) {
  const { data, setLoading, getAssetScrap } = props;
  const [openModel, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleCloseModel = () => setOpen(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const deleteAssetScrap = async () => {
    setLoading(true);
    let payload: any = {
      reason_for_scrap: "",
      scrap_date: null,
      scrap_condition: "",
      scrapped_by: "",
      approved_by: "",
      isScrap: false,
    };
    await AssetScrap.deleteAssetScrap(data?.id, payload)
      .then((res: any) => {
        setLoading(false);
        getAssetScrap();
        toast.success(res?.data?.message);
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      <IconButton aria-label="delete" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box>
          <Box>
            <Button
              color="inherit"
              onClick={handleOpen}
              startIcon={<VisibilityIcon />}
            >
              View
            </Button>
          </Box>

          <Box>
            <Button color="inherit" startIcon={<EditIcon />}>
              <Link
                to="/AddScrap"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
                state={data}
              >
                Edit
              </Link>
            </Button>
          </Box>

          <Box>
            <Box>
              <Button
                color="inherit"
                onClick={() => {
                  deleteAssetScrap();
                }}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Box>
      </Popover>
      <>
        <ViewModel
          open={openModel}
          data={data}
          handleClose={handleCloseModel}
        />
      </>
    </>
  );
}

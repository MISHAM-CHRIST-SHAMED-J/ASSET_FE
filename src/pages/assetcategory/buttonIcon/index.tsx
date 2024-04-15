import React from "react";
import { Box, Button, Popover } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "sonner";
import AssetService from "../../../service/API/asset.service";

export default function ButtonIcon(props: any) {
  const { data, setLoading, getAssetCategory, setOpen, setEditData } = props;
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

  const deleteAssetCategory = async () => {
    setLoading(true);
    let payload = {
      status: false,
    };
    await AssetService.deleteAssetCategory(data?.id, payload)
      .then((res: any) => {
        setLoading(false);
        getAssetCategory();
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
              onClick={() => {
                setEditData(data);
                setOpen(true);
              }}
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
          </Box>

          <Box>
            <Box>
              <Button
                color="inherit"
                onClick={() => {
                  deleteAssetCategory();
                }}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Box>
      </Popover>
    </>
  );
}

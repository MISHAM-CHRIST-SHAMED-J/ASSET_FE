import React from "react";
import { Box, Button, Popover } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EmployeeService from "../../../service/API/employee.service";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ReplayIcon from "@mui/icons-material/Replay";
import ViewModel from "../viewModal";

export default function ButtonIcon(props: any) {
  const { data, setStatus, setLoading } = props;
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

  const deleteEmployeeMaster = async () => {
    setLoading(true);
    let payload = {
      status: !data.status,
    };
    await EmployeeService.deleteEmployeeMaster(data?.id, payload)
      .then((res: any) => {
        setLoading(false);
        setStatus(!data.status);
        toast.success(res?.data?.message);
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error(error.response.data.message);
      });
  };
  console.log(data);

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
          {!data?.isReturned && (
            <Box>
              <Link
                to="/AddIssueAsset"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
                state={data}
              >
                <Button color="inherit" startIcon={<EditIcon />}>
                  Edit
                </Button>
              </Link>
            </Box>
          )}

          {!data?.isReturned && (
            <Box>
              <Link
                to="/ReturnAsset"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
                state={data}
              >
                <Button color="inherit" startIcon={<ReplayIcon />}>
                  Return
                </Button>
              </Link>
            </Box>
          )}
        </Box>
      </Popover>
      <>
        <ViewModel open={openModel} data={data} handleClose={handleCloseModel} />
      </>
    </>
  );
}

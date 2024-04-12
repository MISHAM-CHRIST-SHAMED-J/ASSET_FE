import React from "react";
import { Box, Button, Popover } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

export default function ButtonIcon(props: any) {
  const { data } = props;
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
          {/* <Box>
            <Button
              color="inherit"
               onClick={handleOpenViewModel}
              startIcon={<VisibilityIcon />}
            >
              View
            </Button>
          </Box> */}

          <Box>
            <Button color="inherit" startIcon={<EditIcon />}>
              <Link
                to="/AddEmployee"
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
                // onClick={handleOpenConfirmModel}
                startIcon={<DeleteIcon />}
              >
                {data.status ? "De-active" : "Active"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Popover>
    </>
  );
}

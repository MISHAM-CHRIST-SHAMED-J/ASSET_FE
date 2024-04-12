import React, { useEffect, useState } from "react";
import EmployeeService from "../../service/API/employee.service";
import { toast } from "sonner";
import CustomTable from "../../components/table";
import ButtonIcon from "./buttonIcon";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

function EmployeeDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState(true);
  const [data, setData] = useState([]);
  const [count, setcount] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const getEmployeeMaster = async () => {
    setLoading(true);
    await EmployeeService.getEmployeeMaster(page, limit, status)
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
  const searchEmployeeMaster = async (val: any) => {
    setLoading(true);
    await EmployeeService.searchEmployeeMaster(val)
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
      headerName: "Employee ID",
      field: "emp_id",
      filter: true,
      flex: 1,
    },
    {
      headerName: "Employee Name",
      field: "name",
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
    getEmployeeMaster();
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
          <Button
            variant="contained"
            color={!status ? "inherit" : "primary"}
            disabled={loading}
            onClick={() => {
              setStatus(true);
              setPage(1);
              setSearchValue("");
            }}
          >
            Active Employee
          </Button>
          <Button
            variant="contained"
            color={status ? "inherit" : "primary"}
            disabled={loading}
            style={{ marginLeft: "10px" }}
            onClick={() => {
              setStatus(false);
              setPage(1);
              setSearchValue("");
            }}
          >
            Deactive Employee
          </Button>
        </div>
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
                getEmployeeMaster();
                setPage(1);
                setSearchValue(value);
              } else {
                searchEmployeeMaster(value);
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
              navigate("/AddEmployee");
            }}
          >
            Add Employee
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

export default EmployeeDashboard;

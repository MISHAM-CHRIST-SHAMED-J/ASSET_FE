import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Pagination from "@mui/material/Pagination";

function CustomTable(props: any) {
  const { data, columnDefs, setPage, count, limit, page } = props;

  return (
    <div>
      {" "}
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact rowData={data} columnDefs={columnDefs} />
      </div>
      <div
        style={{
          marginTop: "12px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Pagination
          onChange={(e, page) => {
            setPage(page);
          }}
          page={page}
          count={Math.ceil(count / limit)}
          color="primary"
        />
      </div>
    </div>
  );
}

export default CustomTable;

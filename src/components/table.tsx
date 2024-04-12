import React from "react";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import Pagination from "@mui/material/Pagination";

function CustomTable(props: any) {
  const { data, columnDefs, setPage, count, limit, page } = props;

  return (
    <div>
      {" "}
      <div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: 500 }} // the grid will fill the size of the parent container
      >
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

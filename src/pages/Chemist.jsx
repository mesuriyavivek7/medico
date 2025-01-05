import React from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

//Importing data
import { columns, rows } from "../data/chemistDataTable";

//Importing icons
import SearchIcon from '@mui/icons-material/Search';
import AutorenewIcon from '@mui/icons-material/Autorenew';

export default function Chemist() {
  return (
    <div className="flex h-full flex-col gap-3 md:gap-4">
      <div className="bg-white custom-shadow rounded-md md:py-4 py-3 px-3 flex items-center justify-between">
        <h1 className="text-gray-600 text-base md:text-lg font-medium">
          Chemist Details
        </h1>
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 p-1.5 rounded-md flex gap-1 items-center">
            <span>
              <SearchIcon></SearchIcon>
            </span>
            <input
              className="outline-none bg-transparent"
              placeholder="Search Chemist..."
              type="text"
            ></input>
          </div>
          <span className="cursor-pointer w-9 h-9 bg-gray-200 flex justify-center items-center rounded-md">
            <AutorenewIcon></AutorenewIcon>
          </span>
          <Link to={"/admin/chemist/addnew"}>
            <button className="p-2 bg-themeblue md:text-base text-sm text-white rounded-md">
              Add New Chemist
            </button>
          </Link>
        </div>
      </div>
      <div className="h-full py-4 px-3 custom-shadow rounded-md bg-white">
        <Box
          sx={{
            height: "100%",
            "& .super-app-theme--header": {
              backgroundColor: "#edf3fd",
            },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5,10]}
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    </div>
  );
}

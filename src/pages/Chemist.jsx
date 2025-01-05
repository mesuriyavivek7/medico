import React from 'react'
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

//Importing data
import { columns, rows } from '../data/chemistDataTable';

export default function Chemist() {
  return (
    <div className='flex h-full flex-col gap-3 md:gap-4'>
    <div className='bg-white custom-shadow rounded-md md:py-4 py-3 px-3 flex items-center justify-between'>
      <h1 className='text-gray-600 text-base md:text-lg font-medium'>Chemist Details</h1>
      <Link to={'/admin/chemist/addnew'}><button className='p-2 bg-themeblue md:text-base text-sm text-white rounded-md'>Add New Chemist</button></Link>
    </div>
    <div className='h-full py-4 px-3 custom-shadow rounded-md bg-white'>
      <Box sx={{height:"100%",
       '& .super-app-theme--header': {
         backgroundColor: '#edf3fd',
       },}}>
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
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
       />
      </Box>
    </div>
 </div>
  )
}

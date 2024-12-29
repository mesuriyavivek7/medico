import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

//Importing data
import { columns , rows } from '../data/doctorsDataTable';

export default function Doctors() {
  return (
    <div className='flex h-full flex-col gap-4'>
       <div className='bg-white custom-shadow rounded-md py-4 px-3 flex items-center justify-between'>
         <h1 className='text-gray-600 text-lg font-medium'>Doctors Details</h1>
         <button className='p-2 bg-themeblue text-white rounded-md'>Add New Doctor</button>
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

import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'; 
import api from '../api';


const formateDate = (dateString)=>{
  const date = new Date(dateString);

  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options).replace(',', '');
}

export const columns = (handleNavigateToEdit,handleOpenConfirmPopUp,handleNavigateToPreview)=>[
  // {
  //   field: 'srno',
  //   headerClassName: 'super-app-theme--header',
  //   headerName: 'Sr No.',
  //   flex: 0.5, // Proportional width
  //   minWidth: 80, // Minimum width to prevent shrinking
  // },
  {
    field: 'username',
    headerClassName: 'super-app-theme--header',
    headerName: 'Username',
    flex: 0.5, // Proportional width
    minWidth: 140, // Minimum width to prevent shrinking
  },
  {
    field: 'empname',
    headerClassName: 'super-app-theme--header',
    headerName: 'Emp Name',
    flex: 0.5, // Proportional width
    minWidth: 150, // Minimum width to prevent shrinking
    renderCell:(params)=>(
      <div className='w-full h-full flex items-center'>
         <span>{params.row.firstName} {params.row.lastName}</span>
      </div>
    )
  },
  {
    field: 'email',
    headerClassName: 'super-app-theme--header',
    headerName: 'Email',
    flex: 0.5, // Proportional width
    minWidth: 200, // Minimum width to prevent shrinking
  },
  {
    field: 'gender',
    headerClassName: 'super-app-theme--header',
    headerName: 'Gender',
    flex: 0.5, // Proportional width
    minWidth: 120, // Minimum width to prevent shrinking
    renderCell:(params)=>(
      <div className='flex w-full items-center h-full'>
        <span>{params.row.gender==="M"||params.row.gender==="m"?"Male":"Female"}</span>
      </div>
    )
  },
  {
    field: 'phoneNumber',
    headerClassName: 'super-app-theme--header',
    headerName: 'Mobile No',
    flex: 0.5, // Proportional width
    minWidth: 140, // Minimum width to prevent shrinking
  },
  {
     field:'dob',
     headerClassName: 'super-app-theme--header',
     headerName: 'Date of birth',
     flex: 0.5, // Proportional width
     minWidth: 140, // Minimum width to prevent shrinking
     renderCell:(params)=>(
      <div className='flex w-full h-full items-center'>
         <span>{formateDate(params.value)}</span>
      </div>
     )
  },
  {
    field: 'joiningDate',
    headerClassName: 'super-app-theme--header',
    headerName: 'Joining Date',
    flex: 0.5, // Proportional width
    minWidth: 120, // Minimum width to prevent shrinking
    renderCell:(params)=>(
      <div className='w-full h-full flex items-center'>
         <span>{formateDate(params.value)}</span>
      </div>
    )
  },
  {
    field: 'panCard',
    headerClassName: 'super-app-theme--header',
    headerName: 'Pancard',
    flex: 0.5, // Proportional width
    minWidth: 140, // Minimum width to prevent shrinking
  },
  {
    field: 'action',
    headerClassName: 'super-app-theme--header',
    headerName: 'Action',
    flex: 1.5,
    minWidth: 150,
    renderCell: (params) => (
      <div className="flex gap-3 items-center w-full h-full">
        <button onClick={()=>handleNavigateToEdit(params.row)} className="bg-blue-500 md:text-base text-sm hover:bg-blue-600 flex justify-center items-center rounded-md text-white md:w-10 w-12 h-6 md:h-7">
          <BorderColorOutlinedIcon style={{fontSize:'1.2rem'}}></BorderColorOutlinedIcon>
        </button>
        <button onClick={()=>handleOpenConfirmPopUp(params.row)} className="bg-red-500 md:text-base text-sm hover:bg-red-600 flex justify-center items-center rounded-md text-white md:w-10 w-12 h-6 md:h-7">
          <DeleteOutlineOutlinedIcon style={{fontSize:'1.2rem'}}></DeleteOutlineOutlinedIcon>
        </button>
        <button onClick={()=>handleNavigateToPreview(params.row)} className='bg-orange-500 md:text-base text-sm hover:bg-orange-600 flex justify-center items-center rounded-md text-white md:w-10 w-12 h-6 md:h-7'>
          <RemoveRedEyeOutlinedIcon style={{fontSize:'1.2rem'}}></RemoveRedEyeOutlinedIcon>
        </button>
      </div>
    ),
  },
]

export const latestColumns = [
  // {
  //   field: 'srno',
  //   headerClassName: 'super-app-theme--header',
  //   headerName: 'Sr No.',
  //   flex: 0.5, // Proportional width
  //   minWidth: 80, // Minimum width to prevent shrinking
  // },
  {
    field: 'username',
    headerClassName: 'super-app-theme--header',
    headerName: 'Username',
    flex: 0.5, // Proportional width
    minWidth: 140, // Minimum width to prevent shrinking
  },
  {
    field: 'empname',
    headerClassName: 'super-app-theme--header',
    headerName: 'Emp Name',
    flex: 0.5, // Proportional width
    minWidth: 150, // Minimum width to prevent shrinking
    renderCell:(params)=>(
      <div className='w-full h-full flex items-center'>
         <span>{params.row.firstName} {params.row.lastName}</span>
      </div>
    )
  },
  {
    field: 'email',
    headerClassName: 'super-app-theme--header',
    headerName: 'Email',
    flex: 0.5, // Proportional width
    minWidth: 200, // Minimum width to prevent shrinking
  },
  {
    field: 'gender',
    headerClassName: 'super-app-theme--header',
    headerName: 'Gender',
    flex: 0.5, // Proportional width
    minWidth: 120, // Minimum width to prevent shrinking
    renderCell:(params)=>(
      <div className='flex w-full items-center h-full'>
        <span>{params.row.gender==="M"||params.row.gender==="m"?"Male":"Female"}</span>
      </div>
    )
  },
  {
    field: 'phoneNumber',
    headerClassName: 'super-app-theme--header',
    headerName: 'Mobile No',
    flex: 0.5, // Proportional width
    minWidth: 140, // Minimum width to prevent shrinking
  },
  {
     field:'dob',
     headerClassName: 'super-app-theme--header',
     headerName: 'Date of birth',
     flex: 0.5, // Proportional width
     minWidth: 140, // Minimum width to prevent shrinking
     renderCell:(params)=>(
      <div className='flex w-full h-full items-center'>
         <span>{formateDate(params.value)}</span>
      </div>
     )
  },
  {
    field: 'joiningDate',
    headerClassName: 'super-app-theme--header',
    headerName: 'Joining Date',
    flex: 0.5, // Proportional width
    minWidth: 120, // Minimum width to prevent shrinking
    renderCell:(params)=>(
      <div className='w-full h-full flex items-center'>
         <span>{formateDate(params.value)}</span>
      </div>
    )
  },
  {
    field: 'panCard',
    headerClassName: 'super-app-theme--header',
    headerName: 'Pancard',
    flex: 0.5, // Proportional width
    minWidth: 140, // Minimum width to prevent shrinking
  },
]

export const fetchAllUsers = async ()=>{
  try{
    const response = await api.get(`/User/GetAllUsers`)
    return response.data.data
  }catch(err){
    throw err
  }
}

export const fetchTeam = async ()=>{
  try{
     const response = await api.get('User/MyTeam')
     console.log(response.data.data)
     return response.data.data
  }catch(err){
     throw err
  }
}
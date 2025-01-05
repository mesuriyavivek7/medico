import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export const columns = [
  {
    field: 'id',
    headerClassName: 'super-app-theme--header',
    headerName: 'Sr No.',
    flex: 0.5, // Proportional width
    minWidth: 80, // Minimum width to prevent shrinking
  },
  {
    field: 'empid',
    headerClassName: 'super-app-theme--header',
    headerName: 'Emp Code',
    flex: 0.5, // Proportional width
    minWidth: 100, // Minimum width to prevent shrinking
  },
  {
    field: 'roleid',
    headerClassName: 'super-app-theme--header',
    headerName: 'Role Id',
    flex: 0.5, // Proportional width
    minWidth: 100, // Minimum width to prevent shrinking
  },
  {
    field: 'empname',
    headerClassName: 'super-app-theme--header',
    headerName: 'Emp Name',
    flex: 0.5, // Proportional width
    minWidth: 120, // Minimum width to prevent shrinking
  },
  {
    field: 'email',
    headerClassName: 'super-app-theme--header',
    headerName: 'Email',
    flex: 0.5, // Proportional width
    minWidth: 150, // Minimum width to prevent shrinking
  },
  {
    field: 'mobileno',
    headerClassName: 'super-app-theme--header',
    headerName: 'Mobile No',
    flex: 0.5, // Proportional width
    minWidth: 110, // Minimum width to prevent shrinking
  },
  {
    field: 'address',
    headerClassName: 'super-app-theme--header',
    headerName: 'Address',
    flex: 0.5, // Proportional width
    minWidth: 100, // Minimum width to prevent shrinking
  },
  {
    field: 'area',
    headerClassName: 'super-app-theme--header',
    headerName: 'Area',
    flex: 0.5, // Proportional width
    minWidth: 150, // Minimum width to prevent shrinking
  },
  {
    field: 'city',
    headerClassName: 'super-app-theme--header',
    headerName: 'City',
    flex: 0.5, // Proportional width
    minWidth: 120, // Minimum width to prevent shrinking
  },
  {
    field: 'state',
    headerClassName: 'super-app-theme--header',
    headerName: 'State',
    flex: 0.5, // Proportional width
    minWidth: 100, // Minimum width to prevent shrinking
  },
  {
    field: 'country',
    headerClassName: 'super-app-theme--header',
    headerName: 'Country',
    flex: 0.5, // Proportional width
    minWidth: 110, // Minimum width to prevent shrinking
  },
  {
    field: 'joiningdate',
    headerClassName: 'super-app-theme--header',
    headerName: 'Joining Date',
    flex: 0.5, // Proportional width
    minWidth: 120, // Minimum width to prevent shrinking
  },
  {
    field: 'qualification',
    headerClassName: 'super-app-theme--header',
    headerName: 'Qualification',
    flex: 0.5, // Proportional width
    minWidth: 130, // Minimum width to prevent shrinking
  },
  {
    field: 'action',
    headerClassName: 'super-app-theme--header',
    headerName: 'Action',
    flex: 1.5,
    minWidth: 150,
    renderCell: (params) => (
      <div className="flex gap-3 items-center w-full h-full">
        <button className="bg-blue-500 md:text-base text-sm hover:bg-blue-600 flex justify-center items-center rounded-md text-white md:w-10 w-12 h-6 md:h-7">
          <BorderColorOutlinedIcon style={{fontSize:'1.2rem'}}></BorderColorOutlinedIcon>
        </button>
        <button className="bg-red-500 md:text-base text-sm hover:bg-red-600 flex justify-center items-center rounded-md text-white md:w-10 w-12 h-6 md:h-7">
          <DeleteOutlineOutlinedIcon style={{fontSize:'1.2rem'}}></DeleteOutlineOutlinedIcon>
        </button>
      </div>
    ),
  },
]

export const rows = [
    {
        id:1,
        empid:'1242',
        roleid:'7226',
        empname:'Raj Mishra',
        email:'raj@gmail.com',
        state:'Gujarat',
        mobileno:'6714212212',
        address:'402 - Het park',
        area:'Gurukul Road',
        city:'Ahmedabad',
        country:'India',
        joiningdate:'09-01-2023',
        qualification:'Bsc Nursing'
    },
    {
        id:2,
        empid:'1242',
        roleid:'7226',
        empname:'Raj Mishra',
        email:'raj@gmail.com',
        state:'Gujarat',
        mobileno:'6714212212',
        address:'402 - Het park',
        area:'Gurukul Road',
        city:'Ahmedabad',
        country:'India',
        joiningdate:'09-01-2023',
        qualification:'Bsc Nursing'
    },
    {
        id:3,
        empid:'1242',
        roleid:'7226',
        empname:'Raj Mishra',
        email:'raj@gmail.com',
        state:'Gujarat',
        mobileno:'6714212212',
        address:'402 - Het park',
        area:'Gurukul Road',
        city:'Ahmedabad',
        country:'India',
        joiningdate:'09-01-2023',
        qualification:'Bsc Nursing'
    }
 
]
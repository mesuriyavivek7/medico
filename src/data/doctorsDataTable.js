//importing icons
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import axios from 'axios';

const formateDate = (dateString)=>{
  const date = new Date(dateString);

  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options).replace(',', '');
}


export const columns = [
    {
      field: 'id',
      headerClassName: 'super-app-theme--header',
      headerName: 'Sr No.',
      flex: 0.5, // Proportional width
      minWidth: 80, // Minimum width to prevent shrinking
    },
    {
      field: 'drName',
      headerClassName: 'super-app-theme--header',
      headerName: 'Dr. Name',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'className',
      headerClassName: 'super-app-theme--header',
      headerName: 'Class',
      flex: 0.8,
      minWidth: 120,
    },
    {
      field: 'speciality',
      headerClassName: 'super-app-theme--header',
      headerName: 'Speciality',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'qualification',
      headerClassName: 'super-app-theme--header',
      headerName: 'Qualification',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'dob',
      headerClassName: 'super-app-theme--header',
      headerName: 'DOB',
      flex: 1,
      minWidth: 150,
      renderCell: (params)=>(
        <div className='flex w-full h-full'>
          <span>{formateDate(params.row.dob)}</span>
        </div>
      )
    },
    {
      field: 'gender',
      headerClassName: 'super-app-theme--header',
      headerName: 'Gender',
      flex: 0.8,
      minWidth: 120,
    },
    {
      field: 'routeName',
      headerClassName: 'super-app-theme--header',
      headerName: 'Route Name',
      flex: 1.2,
      minWidth: 150,
    },
    {
      field: 'addressLine1',
      headerClassName: 'super-app-theme--header',
      headerName: 'Address Line 1',
      flex: 2,
      minWidth: 200,
    },
    {
      field: 'addressLine2',
      headerClassName: 'super-app-theme--header',
      headerName: 'Address Line 2',
      flex: 2,
      minWidth: 200,
    },
    {
      field: 'pinCode',
      headerClassName: 'super-app-theme--header',
      headerName: 'Pincode',
      flex: 0.8,
      minWidth: 120,
    },
    {
      field: 'doctorArea',
      headerClassName: 'super-app-theme--header',
      headerName: 'Docter Area',
      flex: 0.8,
      minWidth: 120,
    },
    {
      field: 'vfreq',
      headerClassName: 'super-app-theme--header',
      headerName: 'Visiting Freq',
      flex: 0.8,
      minWidth: 120,
    },
    {
      field: 'mobileNo',
      headerClassName: 'super-app-theme--header',
      headerName: 'Mobile No',
      flex: 0.8,
      minWidth: 120,
    },
    {
      field: 'phone',
      headerClassName: 'super-app-theme--header',
      headerName: 'Phone',
      flex: 0.8,
      minWidth: 120,
    },
    {
      field: 'action',
      headerClassName: 'super-app-theme--header',
      headerName: 'Action',
      flex: 1.5,
      minWidth: 200,
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
  ];


export const rows = [
    {
        id:1,
        drName:'VISWASH SARMA',
        class:'A+',
        speciality:'Ortho',
        qualification:'MS,ORTHO',
        mobile:'9898993892',
        dob:'20-01-2001',
        gender:'Male',
        routename:'JABALPUR',
        address:'HOME SCIENCE RODE JABALPUR',
        pincode:'482002'
    },
    {
        id:2,
        drname:'BRAJESH DADRIYA',
        class:'A+',
        speciality:'Ortho',
        qualification:'MS,ORTHO',
        mobile:'9898993892',
        dob:'20-01-2001',
        gender:'Male',
        routename:'JABALPUR',
        address:'HOME SCIENCE RODE JABALPUR',
        pincode:'482002'
    },
    {
        id:3,
        drname:'RAJEEV SAWANT',
        class:'A+',
        speciality:'Ortho',
        qualification:'MS,ORTHO',
        mobile:'9898993892',
        dob:'20-01-2001',
        gender:'Male',
        routename:'JABALPUR',
        address:'HOME SCIENCE RODE JABALPUR',
        pincode:'482002'
    },
    {
        id:4,
        drname:'RAJEEV BHANDARI',
        class:'A+',
        speciality:'Ortho',
        qualification:'MS,ORTHO',
        mobile:'9898993892',
        dob:'20-01-2001',
        gender:'Male',
        routename:'JABALPUR',
        address:'HOME SCIENCE RODE JABALPUR',
        pincode:'482002'
    }
]


export const getDoctors = async (token)=>{
  try{
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/Doctor/GetAllDoctor`,{
      headers: {
        'Content-Type': 'application/json', // Ensure the content type is JSON
        Authorization: `Bearer ${token}` // Include Bearer token if required
      }
    })
    console.log(response.data)
    return response.data.data
  }catch(err){
   throw err
  }
}
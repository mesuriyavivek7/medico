import api from '../api';
//importing icons
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const formateDate = (dateString)=>{
    const date = new Date(dateString);
  
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options).replace(',', '');
  }
  

export const columns = (handleOpenUpdateData,handleOpenConfirmPopUp) => [
    {
        field: 'id',
        headerClassName: 'super-app-theme--header',
        headerName: 'Sr No.',
        flex: 0.5, // Proportional width
        minWidth: 80, // Minimum width to prevent shrinking
    },
    {
        field: 'chemistName',
        headerClassName: 'super-app-theme--header',
        headerName: 'Chemist Name',
        flex: 0.5, // Proportional width
        minWidth: 180, // Minimum width to prevent shrinking
    },
    {
        field: 'mobileNo',
        headerClassName: 'super-app-theme--header',
        headerName: 'Mobile No',
        flex: 0.5, // Proportional width
        minWidth: 150, // Minimum width to prevent shrinking
    },
    {
        field:'addressLine1',
        headerClassName: 'super-app-theme--header',
        headerName:'Address Line 1',
        flex: 0.5, // Proportional width
        minWidth: 200, // Minimum width to prevent shrinking
    },
    {
        field:'addressLine2',
        headerClassName: 'super-app-theme--header',
        headerName:'Address Line 2',
        flex: 0.5, // Proportional width
        minWidth: 200, // Minimum width to prevent shrinking
    },
    {
        field:'pinCode',
        headerClassName: 'super-app-theme--header',
        headerName:'Pincode',
        flex: 0.5, // Proportional width
        minWidth: 150, // Minimum width to prevent shrinking
    },
    {
        field:'chemistArea',
        headerClassName: 'super-app-theme--header',
        headerName:'Chemist Area',
        flex: 0.5, // Proportional width
        minWidth: 150, // Minimum width to prevent shrinking
    },
    {
        field:'vfreq',
        headerClassName: 'super-app-theme--header',
        headerName:'Visit Frequency',
        flex: 0.5, // Proportional width
        minWidth: 150, // Minimum width to prevent shrinking
    },
    {
        field:'phone',
        headerClassName: 'super-app-theme--header',
        headerName:'Phone',
        flex: 0.5, // Proportional width
        minWidth: 150, // Minimum width to prevent shrinking
    },
    {
        field:'gender',
        headerClassName: 'super-app-theme--header',
        headerName:'Gender',
        flex: 0.5, // Proportional width
        minWidth: 140, // Minimum width to prevent shrinking
        renderCell: (params)=>(
            <div className='flex items-center w-full h-full'>
                <span>{params.value==="M" || params.value==="m" ? "Male" : "Female"}</span>
            </div>
        )
    },
    {
        field:'contactPerson',
        headerClassName: 'super-app-theme--header',
        headerName:'Contact Person',
        flex: 0.5, // Proportional width
        minWidth: 150, // Minimum width to prevent shrinking
    },
    {
        field:'routeName',
        headerClassName: 'super-app-theme--header',
        headerName:'Route Name',
        flex: 0.5, // Proportional width
        minWidth: 150, // Minimum width to prevent shrinking
    },
    {
        field:'dob',
        headerClassName: 'super-app-theme--header',
        headerName:'DOB',
        flex: 0.5, // Proportional width
        minWidth: 150, // Minimum width to prevent shrinking
        renderCell: (params)=>(
            <div className='w-full flex items-center'>
                 <span>{formateDate(params.value)}</span>
            </div>
        )
    },
    {
        field:'chemistType',
        headerClassName: 'super-app-theme--header',
        headerName:'Chemist Type',
        flex: 0.5, // Proportional width
        minWidth: 150, // Minimum width to prevent shrinking
    },
    {
        field: 'action',
        headerClassName: 'super-app-theme--header',
        headerName: 'Action',
        flex: 1.5,
        minWidth: 150,
        renderCell: (params) => (
          <div className="flex gap-3 items-center w-full h-full">
            <button onClick={()=>handleOpenUpdateData(params.row)} className="bg-blue-500 md:text-base text-sm hover:bg-blue-600 flex justify-center items-center rounded-md text-white md:w-10 w-12 h-6 md:h-7">
              <BorderColorOutlinedIcon style={{fontSize:'1.2rem'}}></BorderColorOutlinedIcon>
            </button>
            <button onClick={()=>handleOpenConfirmPopUp(params.row)} className="bg-red-500 md:text-base text-sm hover:bg-red-600 flex justify-center items-center rounded-md text-white md:w-10 w-12 h-6 md:h-7">
              <DeleteOutlineOutlinedIcon style={{fontSize:'1.2rem'}}></DeleteOutlineOutlinedIcon>
            </button>
          </div>
        ),
      },
]

export const rows = [
    {
        id:1,
        chemistname:'SELBY HOSPITAL',
        email:'info@selby.com',
        mobileno:'8892733872',
        fax:'-',
        pincode:'365630',
        routename:'Jabalpur',
        chemistarea:'Jabalpur',
        contactperson:'Raj Patel',
        phone:'9762626261',
        addressline1:'203 - holiday, S.G Road',
        addressline2:'Near ashram',
        visitfreq:'3',
        dob:'09-10-2004',
        chemisttype:'Remote'
    },
    {
        id:2,
        chemistname:'DOCTOR HOUSE',
        email:'info@selby.com',
        mobileno:'8892733872',
        fax:'-',
        pincode:'365630',
        routename:'Jabalpur',
        chemistarea:'Jabalpur',
        contactperson:'Raj Patel',
        phone:'9762626261',
        addressline1:'203 - holiday, S.G Road',
        addressline2:'Near ashram',
        visitfreq:'3',
        dob:'09-10-2004',
        chemisttype:'Remote'
    },
    {
        id:3,
        chemistname:'NATIONAL HOSPITAI',
        email:'info@selby.com',
        mobileno:'8892733872',
        fax:'-',
        pincode:'365630',
        routename:'Jabalpur',
        chemistarea:'Jabalpur',
        contactperson:'Raj Patel',
        phone:'9762626261',
        addressline1:'203 - holiday, S.G Road',
        addressline2:'Near ashram',
        visitfreq:'3',
        dob:'09-10-2004',
        chemisttype:'Remote'
    },
    {
        id:4,
        chemistname:'CITY HOSPITAL',
        email:'info@selby.com',
        mobileno:'8892733872',
        fax:'-',
        pincode:'365630',
        routename:'Jabalpur',
        chemistarea:'Jabalpur',
        contactperson:'Raj Patel',
        phone:'9762626261',
        addressline1:'203 - holiday, S.G Road',
        addressline2:'Near ashram',
        visitfreq:'3',
        dob:'09-10-2004',
        chemisttype:'Remote'
    }

]


export const getAllChemist = async ()=>{
     try{ 
        const response = await api.get(`/Chemist/GetAllChemist`)
        return response.data.data
     }catch(err){
        throw err
     }
}
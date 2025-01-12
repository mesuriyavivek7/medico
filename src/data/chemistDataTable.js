//importing icons
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
        field: 'chemistname',
        headerClassName: 'super-app-theme--header',
        headerName: 'Chemist Name',
        flex: 0.5, // Proportional width
        minWidth: 180, // Minimum width to prevent shrinking
    },
    {
        field: 'email',
        headerClassName: 'super-app-theme--header',
        headerName: 'Email',
        flex: 0.5, // Proportional width
        minWidth: 180, // Minimum width to prevent shrinking
    },
    {
        field: 'mobileno',
        headerClassName: 'super-app-theme--header',
        headerName: 'Mobile No',
        flex: 0.5, // Proportional width
        minWidth: 150, // Minimum width to prevent shrinking
    },
    {
        field: 'fax',
        headerClassName: 'super-app-theme--header',
        headerName: 'Fax',
        flex: 0.5, // Proportional width
        minWidth: 150, // Minimum width to prevent shrinking
    },
    {
        field:'addressline1',
        headerClassName: 'super-app-theme--header',
        headerName:'Address Line 1',
        flex: 0.5, // Proportional width
        minWidth: 200, // Minimum width to prevent shrinking
    },
    {
        field:'addressline2',
        headerClassName: 'super-app-theme--header',
        headerName:'Address Line 2',
        flex: 0.5, // Proportional width
        minWidth: 200, // Minimum width to prevent shrinking
    },
    {
        field:'pincode',
        headerClassName: 'super-app-theme--header',
        headerName:'Pincode',
        flex: 0.5, // Proportional width
        minWidth: 150, // Minimum width to prevent shrinking
    },
    {
        field:'chemistarea',
        headerClassName: 'super-app-theme--header',
        headerName:'Chemist Area',
        flex: 0.5, // Proportional width
        minWidth: 150, // Minimum width to prevent shrinking
    },
    {
        field:'visitfreq',
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
        field:'contactperson',
        headerClassName: 'super-app-theme--header',
        headerName:'Contact Person',
        flex: 0.5, // Proportional width
        minWidth: 150, // Minimum width to prevent shrinking
    },
    {
        field:'routename',
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
    },
    {
        field:'chemisttype',
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
export const columns = [
    {
      field: 'id',
      headerClassName: 'super-app-theme--header',
      headerName: 'Sr No.',
      flex: 0.5, // Proportional width
      minWidth: 80, // Minimum width to prevent shrinking
    },
    {
      field: 'drname',
      headerClassName: 'super-app-theme--header',
      headerName: 'Dr. Name',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'class',
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
      field: 'mobile',
      headerClassName: 'super-app-theme--header',
      headerName: 'Mobile No',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'dob',
      headerClassName: 'super-app-theme--header',
      headerName: 'DOB',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'gender',
      headerClassName: 'super-app-theme--header',
      headerName: 'Gender',
      flex: 0.8,
      minWidth: 120,
    },
    {
      field: 'routename',
      headerClassName: 'super-app-theme--header',
      headerName: 'Route Name',
      flex: 1.2,
      minWidth: 150,
    },
    {
      field: 'address',
      headerClassName: 'super-app-theme--header',
      headerName: 'Address',
      flex: 2,
      minWidth: 200,
    },
    {
      field: 'pincode',
      headerClassName: 'super-app-theme--header',
      headerName: 'Pincode',
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
        <div className="flex gap-4 items-center w-full h-full">
          <button className="bg-blue-500 md:text-base text-sm hover:bg-blue-600 flex justify-center items-center rounded-md text-white md:w-20 w-16 h-6 md:h-8">
            Edit
          </button>
          <button className="bg-red-500 md:text-base text-sm hover:bg-red-600 flex justify-center items-center rounded-md text-white md:w-20 w-16 h-6 md:h-8">
            Delete
          </button>
        </div>
      ),
    },
  ];


export const rows = [
    {
        id:1,
        drname:'VISWASH SARMA',
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
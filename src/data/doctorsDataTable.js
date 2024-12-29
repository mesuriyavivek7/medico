export const columns = [
    {
        field:'id',
        headerClassName:'super-app-theme--header',
        headerName:'Sr No.',
        width:100,
    },
    {
        field:'drname',
        headerClassName:'super-app-theme--header',
        headerName:'Dr. Name',
        width:200
    },
    {
        field:'class',
        headerClassName:'super-app-theme--header',
        headerName:'Class',
        width:160
    },
    {
        field:'speciality',
        headerClassName:'super-app-theme--header',
        headerName:'Speciality',
        width:200
    },
    {
        field:'qualification',
        headerClassName:'super-app-theme--header',
        headerName:'Qualification',
        width:200
    },
    {
        field:'mobile',
        headerClassName:'super-app-theme--header',
        headerName:'Mobile No',
        width:200
    },
    {
       field:'dob',
       headerClassName:'super-app-theme--header',
       headerName:'DOB',
       width:200
    },
    {
        field:'gender',
        headerClassName:'super-app-theme--header',
        headerName:'Gender',
        width:160
    },
    {
        field:'routename',
        headerClassName:'super-app-theme--header',
        headerName:'Route Name',
        width:200
    },
    {
        field:'address',
        headerClassName:'super-app-theme--header',
        headerName:'Address',
        width:300
    },
    {
        field:'pincode',
        headerClassName:'super-app-theme--header',
        headerName:'Pincode',
        width:180
    },
    {
        field:'action',
        headerClassName:'super-app-theme--header',
        headerName:'Action',
        width:250,
        renderCell: (params) =>(
          <div className="flex gap-4 items-center w-full h-full">
             <button className="bg-blue-500 hover:bg-blue-600 flex justify-center items-center rounded-md text-white w-20 h-8">Edit</button>
             <button className="bg-red-500 hover:bg-red-600 flex justify-center items-center rounded-md text-white w-20 h-8">Delete</button>
          </div>
        )
    }
]


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
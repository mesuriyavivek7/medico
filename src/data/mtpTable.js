import { CircleMinus } from 'lucide-react';

const formateDate = (dateString)=>{
    const date = new Date(dateString);
  
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options).replace(',', '');
}

export const mtpcolumns = (handleRemove) => [
    {
        field: 'doctor',
        headerClassName: 'super-app-theme--header',
        headerName: 'Dr. Name',
        flex: 1,
        minWidth: 150,
        renderCell:(params) =>(
            <span>{params.value?.drName}</span>
        )
    },
    {
        field: 'user',
        headerClassName: 'super-app-theme--header',
        headerName: 'User Name',
        flex: 1,
        minWidth: 150, 
        renderCell: (params) =>(
            <span>{params.value?.firstName} {params.value?.lastName}</span>
        )  
    },
    {
        field: 'product',
        headerClassName: 'super-app-theme--header',
        headerName: 'Products',
        flex: 1,
        minWidth: 150, 
    },
    {
        field: 'modeOfWork',
        headerClassName: 'super-app-theme--header',
        headerName: 'Mode Of Work',
        flex: 1,
        minWidth: 150, 
    },
    {
        field: 'description',
        headerClassName: 'super-app-theme--header',
        headerName: 'Description',
        flex: 1,
        minWidth: 150,  
    },
    {
        field: 'action',
        headerClassName: 'super-app-theme--header',
        headerName: 'Action',
        flex: 1,
        minWidth: 150,  
        renderCell: (params) =>(
            <div className='w-full h-full flex justify-start items-center'>
                 <CircleMinus onClick={()=>handleRemove(params.row.id)} className='text-red-500 cursor-pointer'></CircleMinus>
            </div>
        )
    }

]



  


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
        field: 'stp',
        headerClassName: 'super-app-theme--header',
        headerName: 'Stp',
        flex: 1,
        minWidth: 150,   
        renderCell: (params) =>(
            <span>{params.value.tourName}</span>
        )
    },
    {     
        field: 'mtpDate',
        headerClassName: 'super-app-theme--header',
        headerName: 'MTP Date',
        flex: 1,
        minWidth: 150,  
        renderCell: (params) =>(
            <span>{formateDate(params.value)}</span>
        )
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



  


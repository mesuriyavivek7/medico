const formateDate = (dateString)=>{
    const date = new Date(dateString);
  
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options).replace(',', '');
}

export const mtpcolumns = [
    {
        field: 'doctor',
        headerClassName: 'super-app-theme--header',
        headerName: 'Dr. Name',
        flex: 1,
        minWidth: 150,
    },
    {
        field: 'user',
        headerClassName: 'super-app-theme--header',
        headerName: 'User Name',
        flex: 1,
        minWidth: 150,   
    },
    {
        field: 'stp',
        headerClassName: 'super-app-theme--header',
        headerName: 'Stp',
        flex: 1,
        minWidth: 150,   
    },
    {     
        field: 'mtpDate',
        headerClassName: 'super-app-theme--header',
        headerName: 'MTP Date',
        flex: 1,
        minWidth: 150,  
    },
    {
        field: 'description',
        headerClassName: 'super-app-theme--header',
        headerName: 'Description',
        flex: 1,
        minWidth: 150,  
    }

]



  


import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
//Importing dnd libraries
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

//Importing icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import {toast} from 'react-toastify'
import api from '../api';


const Place = ({place, index, endPoint, removePlace, movePlace}) =>{

    const [{ isDragging }, dragRef] = useDrag({
        type: 'location',
        item: { index },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      });
    
    const [, dropRef] = useDrop({
        accept: 'location',
        hover: (draggedItem) => {
          if (draggedItem.index !== index) {
            movePlace(draggedItem.index, index);
            draggedItem.index = index;
          }
        },
      });

    return (
        <div ref={(node) => dragRef(dropRef(node))} className='p-3 hover:shadow cursor-move transition-all duration-300 px-4 flex justify-between border rounded-md bg-slate-50'>
            <div className='flex items-center gap-4'>
               <span className='text-gray-500'>#{index+1}</span>
               <span className='font-medium text-lg'>{place}</span>
               {
                 ( index == 0 || index===endPoint )
                 && <span className='text-sm'>{index===0?"(Starting Point)":"(Ending Point)"}</span>
               }
            </div>
            <span onClick={()=>removePlace(index)} className='text-red-500 cursor-pointer'><DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon></span>
        </div>
    )
}


function AddMtp() {
    const { user } = useSelector((state) => state.auth);
    const [tourPlanName,setTourPlanName] = useState('')
    const [places,setPlaces] = useState([])
    const [errors,setErrors] = useState({})
    const [loading,setLoading] = useState(false)
  
    const movePlace = (fromIndex, toIndex) => {
      const updatedPlaces = [...places];
      const [movedPlace] = updatedPlaces.splice(fromIndex, 1);
      updatedPlaces.splice(toIndex, 0, movedPlace);
      setPlaces(updatedPlaces);
    };
  
    const removePlace = (ind) =>{
       setPlaces((prevData)=>prevData.filter((item,index)=>ind!==index))
    }
  
    const [newPlace,setNewPlace] = useState('')
  
    const addNewPlace = () =>{
      if(!newPlace){
        toast.error("Please enter place value.")
        return
      }
  
      if(places.includes(newPlace)){
        toast.warning("Place is already added.")
        return 
      }
      setPlaces((prevData)=>([...prevData,newPlace]))
      setNewPlace('')
    }
  
    const validateData = () =>{
       let newErrors = {}
       if(!tourPlanName) newErrors.tourplan = "Tourplan name is required."
       if(places.length===0) newErrors.places = "Add one or more place."
  
       setErrors(newErrors)
  
       return Object.keys(newErrors).length===0
    }
  
    const addTourPlan = async ()=>{
      if(validateData()){
        try{
          let locations = places.map((item,index)=> ({tourLocationID:0,locationName:item,locationSequence:index}))
          await api.post(`STPMTP`,{
           tourId:0,
           tourName:tourPlanName,
           tourType:1,
           tourLocations:locations
          })
          setTourPlanName('')
          setPlaces([])
          toast.success("Tour plan added successfully.")
        }catch(err){
          console.log(err)
        }
      }
  
    }
    
  return (
    <DndProvider backend={HTML5Backend}>
    <div className='flex h-full flex-col gap-3 md:gap-4'>
      <div className='bg-white custom-shadow rounded-md md:py-4 py-3 px-3 md:px-4 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
           <Link to={user.isAdmin?'/admin/mtpplan':'/employee/mtpplan'}><span className='text-gray-600 cursor-pointer'><ArrowBackIosIcon style={{fontSize:'1.4rem'}}></ArrowBackIosIcon></span></Link>
           <h1 className='text-gray-800 text-base md:text-lg font-medium'>Add Monthly Tour Plan</h1>
        </div>
     </div>
     <div className='bg-white h-full custom-shadow flex flex-col gap-4 rounded-md md:py-4 py-3 px-3 md:px-4'>
        <div className='flex flex-col mb-1 gap-2'>
           <label htmlFor='tourName' className='font-bold'>Tour Plan Name <span className='text-red-500'>*</span></label>
           <input onChange={(e)=>setTourPlanName(e.target.value)} value={tourPlanName} type='text' name='tourPlanName' id='tourName' className='border outline-none w-1/4 py-1.5 px-2 rounded-md' placeholder='Enter Tour Name'></input>
           {errors.tourplan && <span className='text-sm text-red-500'>{errors.tourplan}</span>}
        </div>
        <div className='flex items-center gap-3'>
            <span className='text-themeblue'><PlaceOutlinedIcon style={{fontSize:'2.2rem'}}></PlaceOutlinedIcon></span>
            <h1 className='text-xl font-bold tracking-wide'>Places Visited Today</h1>
        </div>
        <div className='grid grid-cols-4 items-start w-3/5 gap-4'>
            <div className='flex col-span-3 flex-col gap-1'>
              <input onChange={(e)=>setNewPlace(e.target.value)} value={newPlace} type='text' className='col-span-3 outline-none p-2.5 border rounded-md ' placeholder='Enter place name...'></input>
              {errors.places && <span className='text-sm text-red-500'>{errors.places}</span>}
            </div>
            <button onClick={addNewPlace} className='p-2.5 col-span-1 flex justify-center items-center gap-2 text-white bg-themeblue rounded-md font-medium'><span><AddOutlinedIcon></AddOutlinedIcon></span> Add Place</button>
        </div>

        <div className='overflow-scroll flex flex-col gap-2 h-80 w-full'>
        {
          places.length>0 ? (
            places.map((place, index) => (
              <Place key={index} place={place} removePlace={removePlace} endPoint={places.length-1} index={index} movePlace={movePlace} />
            ))
          ) : (
            <div className='flex justify-center m-auto items-center'>
              <div className='flex flex-col items-center gap-2'>
                 <span className='text-gray-400'><PlaceOutlinedIcon style={{fontSize:'2.4rem'}}></PlaceOutlinedIcon></span>
                 <h1>No places added yet. Start by adding your first destination!</h1>
              </div>
            </div>
          )
        }
        </div>
       {
         places.length>0 &&
         <div onClick={addTourPlan} className='flex w-full  place-content-center'>
           <button className='p-2 transition-colors duration-300 hover:bg-blue-600 bg-blue-500 w-36 rounded-md text-white'>Submit</button>
         </div>
       }

     </div>
    </div>
  </DndProvider>
  )
}

export default AddMtp
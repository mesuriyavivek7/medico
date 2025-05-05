import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api";
import { useSelector } from "react-redux";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

//Importing icons
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import { ClipboardMinus } from 'lucide-react';
import { Beaker } from 'lucide-react';


import { fetchAllUsers } from "../data/EmployeeDataTable";
import { Link } from "react-router-dom";
import { LoaderCircle, X } from "lucide-react";

const getMonthYear = () =>{
  const date = new Date()
  let month = date.getMonth()+1
  let year = date.getFullYear()

  return {month, year}

}

export default function MyDashboard() {
  const { user } = useSelector((state) => state.auth);
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [chemistCount, setChemistCount] = useState(0);
  const [myTeamCount, setMyTeamCount] = useState(0);
  const [dailyAvgDocVisit,setDailyAvgDocVisit] = useState(0)
  const [dailyAvgChecmist,setDailyAvgChecmist] = useState(0)
  const [monthlyAvgDocVisit,setMonthlyAvgDocVisit] = useState(0)
  const [monthlyAvgChecmist,setMonthlyAvgChecmist] = useState(0)

  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);

  const fetchCalenderData = async () => {
    try {
      const response = await api.post("/User/dashboard", {
        year: getMonthYear().year,
        month: getMonthYear().month,
      });
      let data = response.data.data.result;

      setDoctorsCount(data[0].noofdoc)
      setChemistCount(data[0].noofChemist)
      setMyTeamCount(data[0].noofTeam)
      setDailyAvgDocVisit(data[0].dailyAvgDocVisit)
      setDailyAvgChecmist(data[0].dailyAvgChecmist)
      setMonthlyAvgDocVisit(data[0].monthlyAvgDocVisit)
      setMonthlyAvgChecmist(data[0].monthlyAvgChecmist)

      setEvents(
        data.map((item) => ({
          title: item.daystatus,
          start: new Date(item.daydt),
          end: new Date(item.daydt),
          color: item.color,
          mtpID: item.mtpID,
        }))
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCalenderData();
  }, []);

  const [showPopUp, setShowPopUp] = useState(false);
  const [mtpDetails, setMtpDetails] = useState([]);
  const [mtpLoader, setMtpLoader] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchMtpDetails = async () => {
      setMtpLoader(true);
      try {
        const response = await api.post(
          `/STPMTP/GetAllByID?id=${selectedEvent.mtpID}`
        );
        setMtpDetails(response.data.data.mtpdetails);
      } catch (err) {
        console.log(err);
        toast.error("Error while fetching mtp details.");
      } finally {
        setMtpLoader(false);
      }
    };

    if (selectedEvent) {
      fetchMtpDetails();
    }
  }, [selectedEvent]);

  const handleSelectSlot = ({ start }) => {
    const clickedDate = new Date(start).toDateString();
    const foundEvent = events.find(
      (event) => new Date(event.start).toDateString() === clickedDate
    );
    if (foundEvent.mtpID) {
      setSelectedEvent(foundEvent);
      setShowPopUp(true);
    }
  };


  return (
    <div className="h-full overflow-y-scroll gap-4">
      <div className="grid mb-4 md:grid-cols-3 grid-cols-1 gap-4">
        <div className="flex custom-shadow p-4 bg-gradient-to-r from-blue-400 to-blue-600  rounded-lg flex-col gap-2">
          <h1 className="text-lg text-white font-semibold">DOCTORS</h1>
          <span className="text-2xl font-bold text-gray-100">
            {doctorsCount}
          </span>
          <div className="flex justify-between items-center">
            <Link to={user.isAdmin ? "/admin/doctors" : "/employee/doctors"}>
              <span className="underline text-white cursor-pointer">
                See all doctors
              </span>
            </Link>
            <span className="bg-themeblue text-white w-10 h-10 flex justify-center items-center rounded-md">
              <LocalHospitalOutlinedIcon
                style={{ fontSize: "1.8rem" }}
              ></LocalHospitalOutlinedIcon>
            </span>
          </div>
        </div>
        <div className="flex p-4 bg-gradient-to-r from-violet-400 to-violet-600 custom-shadow rounded-lg flex-col gap-2">
          <h1 className="text-lg text-white font-semibold">CHEMIST</h1>
          <span className="text-2xl font-bold text-gray-100">
            {chemistCount}
          </span>
          <div className="flex justify-between items-center">
            <Link to={user.isAdmin ? "/admin/chemists" : "/employee/chemists"}>
              <span className="underline text-white cursor-pointer">
                See all chemist
              </span>
            </Link>
            <span className="bg-themeblue text-white w-10 h-10 flex justify-center items-center rounded-md">
              <ScienceOutlinedIcon
                style={{ fontSize: "1.8rem" }}
              ></ScienceOutlinedIcon>
            </span>
          </div>
        </div>
        <div className="flex p-4 bg-gradient-to-r from-emerald-400 to-teal-600 custom-shadow rounded-lg flex-col gap-2">
          <h1 className="text-lg text-white font-semibold">My Team</h1>
          <span className="text-2xl font-bold text-gray-100">
            {myTeamCount}
          </span>
          <div className="flex justify-between items-center">
            <Link to={user.isAdmin ? "/admin/myteam" : "/employee/myteam"}>
              <span className="underline cursor-pointer text-white">
                See all Member
              </span>
            </Link>
            <span className="bg-themeblue text-white w-10 h-10 flex justify-center items-center rounded-md">
              <Inventory2OutlinedIcon
                style={{ fontSize: "1.8rem" }}
              ></Inventory2OutlinedIcon>
            </span>
          </div>
        </div>
      </div>

      <div className="w-full relative mb-4 h-[500px]">
        <Calendar
          selectable
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          onSelectEvent={handleSelectSlot}
          eventPropGetter={(event) => {
            const backgroundColor = event.color || "#3174ad"; // default color if none provided
            return {
              style: {
                backgroundColor,
                borderRadius: "0px",
                opacity: 1,
                color: "white",
                border: "none",
                width: "100%",
                height: "100%",
                margin: 0,
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "14px",
              },
            };
          }}
        />

        {showPopUp && selectedEvent && (
          <div className="absolute z-50 inset-0 flex justify-center items-center">
            <div className="w-5/6 z-50 h-5/6 rounded-md overflow-hidden shadow-sm bg-white border">
              <div className="flex bg-themeblue text-white p-4 border-b border-neutral-200 justify-between items-center">
                <h1 className="font-medium text-lg">MTP Details</h1>
                <button
                  className="text-red-500 hover:text-red-600"
                  onClick={() => setShowPopUp(false)}
                >
                  <X></X>
                </button>
              </div>
              <div className="h-full overflow-auto bg-neutral-100 p-2">
                {mtpLoader ? (
                  <div className="flex justify-center items-center w-full h-full">
                    <LoaderCircle className="animate-spin"></LoaderCircle>
                  </div>
                ) : (
                  mtpDetails.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-2 mb-2  md:grid-cols-3 bg-white shadow-sm p-2 rounded-md items-center gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Doctor:</span>
                        <span className="text-neutral-600">
                          {item?.drName || ""}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Speciality</span>
                        <span className="text-neutral-600">
                          {item?.speciality || ""}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Qualification</span>
                        <span className="text-neutral-600">
                          {item?.qualification || ""}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">MTP Date</span>
                        <span className="text-neutral-600">
                          {item?.mtpdate || ""}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Doctor Area</span>
                        <span className="text-neutral-600">
                          {item?.doctorArea || ""}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Products</span>
                        <span className="text-neutral-600">
                          {item?.products}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 py-4 px-3 custom-shadow rounded-md">
        <h1 className="font-medium text-lg">Key Indicators</h1>

        <div className="grid grid-cols-2 items-center gap-6">
           <div className="p-4 rounded-md flex flex-col gap-4 bg-gradient-to-r from-blue-200 to-cyan-200">
               <div className="flex items-center gap-2">
                 <ClipboardMinus></ClipboardMinus>
                 <h1 className="text-lg font-bold">Doctor Average</h1>
               </div>
               <div className="flex justify-between items-center">
                 <div className="flex flex-col gap-1">
                   <span className="font-medium">Daily Average</span>
                   <h1 className="font-bold text-lg">{dailyAvgDocVisit}</h1>
                 </div>
                 <div className="flex flex-col gap-1">
                  <span className="font-medium">Monthly Average</span>
                  <h1 className="font-bold text-lg">{monthlyAvgDocVisit}</h1>
                 </div>
               </div>
           </div>
           <div className="p-4 rounded-md flex flex-col gap-4 bg-gradient-to-r from-teal-200 to-teal-500">
               <div className="flex items-center gap-2">
                 <Beaker></Beaker>
                 <h1 className="text-lg font-bold">Chemist Average</h1>
               </div>
               <div className="flex justify-between items-center">
                 <div className="flex flex-col gap-1">
                   <span className="font-medium">Daily Average</span>
                   <h1 className="font-bold text-lg">{dailyAvgChecmist}</h1>
                 </div>
                 <div className="flex flex-col gap-1">
                  <span className="font-medium">Monthly Average</span>
                  <h1 className="font-bold text-lg">{monthlyAvgChecmist}</h1>
                 </div>
               </div>
           </div>
        </div>
      </div>

    </div>
  );
}

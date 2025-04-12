import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
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

import { latestColumns, fetchAllUsers } from "../data/EmployeeDataTable";
import { Link } from "react-router-dom";
import { LoaderCircle, X } from "lucide-react";

export default function MyDashboard() {
  const { user } = useSelector((state) => state.auth);
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [chemistCount, setChemistCount] = useState(0);
  const [myTeamCount, setMyTeamCount] = useState(0);

  const fetchCounts = async () => {
    try {
      const [doctorsResponse, chemistResponse, myTeamResponse] =
        await Promise.all(
          user.isAdmin
            ? [
                api.get("/Doctor/GetAllDoctor"),
                api.get("/Chemist/GetAllChemist"),
                api.get("/User/MyTeam"),
              ]
            : [
                api.get("/DoctorMapping/GetAllDoctorMappingData"),
                api.get("/ChemistMapping/GetAllChemistMappingData"),
                api.get("/User/MyTeam"),
              ]
        );
      console.log(chemistResponse.data.data);
      setDoctorsCount(doctorsResponse.data.data.length);
      setChemistCount(
        user.isAdmin
          ? chemistResponse.data.data.length
          : chemistResponse.data.data.result.length
      );
      setMyTeamCount(myTeamResponse.data.data.length);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong.");
    }
  };

  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(false);

  const getEmployeeData = async () => {
    try {
      setLoading(true);
      const data = await fetchAllUsers();
      setEmployee(
        data.map((item, index) => ({ ...item, id: index + 1 }))?.slice(0, 5)
      );
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmployeeData();
    fetchCounts();
  }, []);

  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);

  const fetchCalenderData = async () => {
    try {
      const response = await api.post("/User/dashboard", {
        year: 2025,
        month: 4,
      });
      let data = response.data.data.result;
      console.log(data);
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

  console.log(mtpDetails);

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
                borderRadius: "5px",
                opacity: 0.9,
                color: "white",
                border: "0px",
                display: "block",
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

      <div className="h-full flex flex-col gap-2 py-4 px-3 custom-shadow rounded-md bg-white">
        <h1 className="font-medium text-lg">New Employees</h1>
        <Box
          sx={{
            height: "100%",
            "& .super-app-theme--header": {
              backgroundColor: "#edf3fd",
            },
          }}
        >
          <DataGrid
            rows={employee}
            columns={latestColumns}
            loading={loading}
            pagination={false}
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    </div>
  );
}

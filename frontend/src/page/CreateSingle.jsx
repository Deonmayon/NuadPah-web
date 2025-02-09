import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import IconCom from "../components/IconCom";


import { Link, useNavigate } from "react-router-dom";

function CreateSingle() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [allImage, setAllImage] = useState(null);
  const [previewImage1, setPreviewImage1] = useState(null);
  const [previewImage2, setPreviewImage2] = useState(null);

  const [values, setValue] = useState({
    eventname: "",
    eventdetail: "",
    eventtype: "",
    artistname: "",
    artistspotify: "",
    locationname: "",
    locationprovice: "",
    locationcountry: "",
    locationembed: "",
    locationgooglemap: "",
    locationlatitude: "",
    locationlongitude: "",
    startday: "",
    startmonth: "",
    startyear: "",
    starthour: "",
    startminute: "",
    endday: "",
    endmonth: "",
    endyear: "",
    endhour: "",
    endminute: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Mockup data
    const mockEvents = [
      { id: 1, eventname: "Rock Festival", eventimage: "event1.jpg" },
      { id: 2, eventname: "Jazz Night", eventimage: "event2.jpg" },
    ];
    setAllImage(mockEvents);
  }, []);

  const handleInput = (event) => {
    setValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onInputChange1 = (e) => {
    const file = e.target.files[0];
    setImage1(file);

    // Preview image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage1(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage1(null);
    }
  };

  const onInputChange2 = (e) => {
    const file = e.target.files[0];
    setImage2(file);

    // Preview image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage2(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage2(null);
    }
  };

  const submitImage = (e) => {
    e.preventDefault();

    const formData = {
      eventimage: image1,
      artistimage: image2,
      ...values,
    };

    // Mock response and navigation
    console.log("Event Submitted:", formData);
    alert("Event created successfully!");
    navigate("/manageevent");
  };

  return (
    <div className="bg-[#191414] w-full h-full min-h-dvh font-kanit">
      <Nav />
      <div className="w-full min-h-[60px] bg-[#242424] mt-[60px] fixed top-0 z-10">
        <div className="max-w-[1250px] mx-auto h-full bg-[#242424] px-4 sm:px-6 lg:px-8">
          <div className="h-[60px] flex items-center justify-center sm:justify-start  text-white font-medium">
            <button className="transition-all duration-500 px-3 py-2 rounded-lg bg-black text-[17px] sm:text-[18px] md:text-[20px]">
              Manage Single Massages
            </button>
            <Link
              to="/manageuser"
              className="ml-[20px] transition-all duration-500 px-3 py-2 hover:bg-[#191919] rounded-lg text-[16px] sm:text-[18px] md:text-[20px]"
            >
              Manage Set of Massages
            </Link>
            <Link
              to="/manageuser"
              className="ml-[20px] transition-all duration-500 px-3 py-2 hover:bg-[#191919] rounded-lg text-[16px] sm:text-[18px] md:text-[20px]"
            >
              Manage Users
            </Link>
            <Link
              to="/manageuser"
              className="ml-[20px] transition-all duration-500 px-3 py-2 hover:bg-[#191919] rounded-lg text-[16px] sm:text-[18px] md:text-[20px]"
            >
              Manage Reports
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-[120px] px-2 sm:px-4 md:px-6 lg:px-16 max-w-[1250px] mx-auto h-full flex justify-center">
        <div className="mt-[30px] w-full flex flex-col items-center">
          <div className="h-[70px] w-full flex flex-row items-center">
            <Link
              to="/manageevent"
              className="flex px-3 py-2 rounded-lg items-center border-2 border-solid border-[#8A8A8A] text-white transition-all duration-300 hover:bg-[#242424]"
            >
              <IconCom icon="left" size="18" />
              <p className="ml-[2px] text-[14px]">Back</p>
            </Link>
            <div className="ml-[15px] flex flex-col justify-evenly h-full">
              <p className="text-white font-medium text-[20px]">
                Create Single Massage
              </p>
            </div>
          </div>
          <form
            onSubmit={submitImage}
            className="mt-[10px] rounded-md bg-[#242424] w-full h-full p-[20px] text-[14px]"
          >
            <div className="hidden md:flex w-full h-full">
              <div className="w-1/2 h-full text-white text-[14px] font-medium">
                <p className="mb-[10px]">Image</p>
                <div className="w-full rounded-md aspect-square bg-[#191414] my-[10px] relative">
                  {!previewImage1 && (
                    <div className="w-full h-full flex items-center justify-center absolute z-10">
                      <p className="text-[30px] font-medium text-slate-200">
                        500 x 500
                      </p>
                    </div>
                  )}
                  {previewImage1 && (
                    <img
                      src={previewImage1}
                      alt="Preview 1"
                      className="object-cover h-full w-full rounded-md absolute z-20"
                    />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onInputChange1}
                  className="px-3 py-2 my-[10px] h-[40px] w-full rounded-md bg-[#191414] flex text-white 
                file:border-0 file:bg-[#191414] file:text-[14px] file:font-medium file:text-white"
                ></input>
              </div>
              <div className="w-1/2 h-full pl-[20px] text-white text-[14px] font-medium">
                <p className="mb-[10px]">Name Event</p>
                <input
                  type="text"
                  onChange={handleInput}
                  name="eventname"
                  placeholder="Event"
                  className="h-[40px] w-full rounded-md pl-2 bg-[#191414] text-white focus:outline-none
                focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                />
                <p className="mt-[15px] mb-[10px]">Detail Event</p>
                <textarea
                  type="text"
                  onChange={handleInput}
                  name="eventdetail"
                  className="w-full pl-2 pt-2 rounded-md bg-[#191414] text-white focus:outline-none
                  focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                  id=""
                  rows="8"
                  placeholder="Tell about event"
                ></textarea>
                <p className="mt-[15px] mb-[10px]">Type Event</p>
                <select
                  onChange={handleInput}
                  name="eventtype"
                  className="h-[40px] w-full rounded-md px-2 bg-[#191414] text-white focus:outline-none
                focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                >
                  <option>Select Type</option>
                  <option value="pubbar">Back</option>
                  <option value="festival">Shoulder</option>
                  <option value="concert">Neck</option>
                </select>
                <p className="mt-[15px] mb-[10px]">Type Event</p>
                <select
                  onChange={handleInput}
                  name="eventtype"
                  className="h-[40px] w-full rounded-md px-2 bg-[#191414] text-white focus:outline-none
                focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                >
                  <option>Select Time</option>
                  <option value="pubbar">5</option>
                  <option value="festival">10</option>
                  <option value="concert">15</option>
                  <option value="internal">20</option>
                </select>

                <p className="mt-[15px] mb-[10px]">Round</p>
                <input
                  type="number"
                  onChange={handleInput}
                  name="locationname"
                  placeholder="Type Number"
                  className="h-[40px] w-full rounded-md pl-2 bg-[#191414] text-white focus:outline-none
                focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                />

                <button className="h-[40px] w-full rounded-lg mt-[40px] bg-[#C0A172] text-[18px] text-center font-medium text-white transition-all duration-300 hover:bg-[#1CAA4E]">
                  Create Event
                </button>
              </div>
            </div>
            <div className="block md:hidden w-full h-full text-white text-[14px] font-medium">
              <p className="mb-[10px]">Image</p>
              <div className="w-full  rounded-md aspect-square bg-[#191414] my-[10px] relative">
                {!previewImage1 && (
                  <div className="w-full h-full flex items-center justify-center absolute z-10">
                    <p className="text-[30px] font-medium text-slate-200">
                      500 x 500
                    </p>
                  </div>
                )}
                {previewImage1 && (
                  <img
                    src={previewImage1}
                    alt="Preview 1"
                    className="object-cover h-full w-full rounded-md absolute z-20"
                  />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={onInputChange1}
                className="px-3 py-2 my-[10px] h-[40px] w-full rounded-md bg-[#191414] flex text-white 
                file:border-0 file:bg-[#191414] file:text-[14px] file:font-medium file:text-white"
              ></input>

              <p className="mt-[15px] mb-[10px]">Name Event</p>
              <input
                type="text"
                onChange={handleInput}
                name="eventname"
                placeholder="Event"
                className="h-[40px] w-full rounded-md pl-2 focus:outline-none bg-[#191414] text-white
                focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
              />
              <p className="mt-[15px] mb-[10px]">Detail Event</p>
              <textarea
                className="w-full pl-2 pt-2 rounded-md bg-[#191414] text-white focus:outline-none
                focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                type="text"
                onChange={handleInput}
                name="eventdetail"
                id=""
                rows="8"
                placeholder="Tell about event"
              ></textarea>
              <p className="mt-[15px] mb-[10px]">Type</p>
              <select
                onChange={handleInput}
                name="eventtype"
                className="h-[40px] w-full rounded-md px-2 bg-[#191414] text-white focus:outline-none
                focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
              >
                <option>Select Type</option>
                <option value="pubbar">Back</option>
                <option value="festival">Shoulder</option>
                <option value="concert">Neck</option>
              </select>
              <p className="mt-[15px] mb-[10px]">Time</p>
              <select
                onChange={handleInput}
                name="eventtype"
                className="h-[40px] w-full rounded-md px-2 bg-[#191414] text-white focus:outline-none
                focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
              >
                <option>Select Type</option>
                <option value="pubbar">Pub/Bar</option>
                <option value="festival">Festival</option>
                <option value="concert">Concert</option>
                <option value="internal">Internal</option>
              </select>

              <p className="mt-[15px] mb-[10px]">Round</p>
              <input
                type="number"
                onChange={handleInput}
                name="locationname"
                placeholder="Type Number"
                className="h-[40px] w-full rounded-md pl-2 bg-[#191414] text-white focus:outline-none
                focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
              />

              <button
                type="submit"
                className="text-[18px] h-[40px] w-full rounded-lg mt-[40px] bg-[#C0A172] text-center font-medium text-white hover:bg-[#1CAA4E]"
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateSingle;
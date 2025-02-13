/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import IconCom from "../components/IconCom";
import Navmenu from "../components/Navmenu";

import { Link, useNavigate } from "react-router-dom";

function EditSingleMassge() {
  const [image1, setImage1] = useState(null);
  const [editData, setEditData] = useState({});
  const [previewImage1, setPreviewImage1] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    GetSelectedMassage();
  }, []);

  const GetSelectedMassage = () => {
    const oldData = JSON.parse(localStorage.getItem("edit_massage_id"));
    console.log(oldData);

    setEditData(oldData);
  };

  const handleInput = (event) => {
    setEditData((prev) => ({
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // const updateData = {
    //   namemassage,
    //   detailmassage,
    //   typemassage,
    //   time,
    //   round,
    // };

    // const formData = new FormData();

    // // Append image1 only if it exists
    // if (image1) {
    //   formData.append("imagemassage", image1);
    // }

    // // Append other updateData fields
    // for (let key in updateData) {
    //   formData.append(key, updateData[key]);
    // }

    // axios
    //   .put("http://localhost:3002/update-event/" + id, formData, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   })
    //   .then((res) => {
    //     window.location.reload();
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <div className="bg-white w-full h-full min-h-dvh font-kanit">
      <Nav />
      <Navmenu className="z-50" />
      <div className="mt-[120px] px-2 sm:px-4 md:px-6 lg:px-16 max-w-[1250px] mx-auto h-full flex justify-center">
        <div className="mt-[30px] w-full flex flex-col items-center">
          <div className="h-[70px] w-full flex flex-row items-center">
            <Link
              to="/singlemanage"
              className="flex px-3 py-2 rounded-lg items-center border-2 border-solid border-[#C0A172] text-[#C0A172] transition-all duration-300 hover:bg-[#DBDBDB]"
            >
              <IconCom icon="left" size="18" />
              <p className="ml-[2px] text-[14px]">Back</p>
            </Link>
            <div className="ml-[15px] flex flex-col justify-evenly h-full">
              <p className="text-[#C0A172] font-medium text-[20px]">
                Edit Single Massage
              </p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-[10px] rounded-md bg-white w-full h-full pt-[20px] text-[14px] "
          >
            <div className="hidden md:flex w-full h-full">
              <div className="w-1/2 h-full text-black text-[14px] font-medium">
                <p className="mb-[10px]">Image</p>
                <div className="w-full rounded-md aspect-square bg-[#DBDBDB] my-[10px] relative">
                  {previewImage1 ? (
                    <img
                      src={previewImage1}
                      alt="Preview 1"
                      className="object-cover h-full w-full rounded-md"
                    />
                  ) : (
                    <img
                      src={image1}
                      alt="Event"
                      className="object-cover h-full w-full rounded-md"
                    />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onInputChange1}
                  className="px-3 py-2 my-[10px] h-[40px] w-full rounded-md bg-[#DBDBDB] flex text-black 
                file:border-0 file:bg-[#DBDBDB] file:text-[14px] file:font-medium file:text-black"
                ></input>
              </div>
              <div className="w-1/2 h-full pl-[20px] text-white text-[14px] font-medium">
                <p className="mb-[10px] text-black">Name Massage</p>
                <input
                  type="text"
                  value={editData.mt_name}
                  onChange={handleInput}
                  name="mt_name"
                  placeholder="Name Massage"
                  className="h-[40px] w-full rounded-md pl-2 bg-[#DBDBDB] text-black focus:outline-none
                focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
                />
                <p className="mt-[15px] mb-[10px] text-black">Detail</p>
                <textarea
                  type="text"
                  value={editData.mt_detail}
                  onChange={handleInput}
                  name="mt_detail"
                  className="w-full pl-2 pt-2 rounded-md bg-[#DBDBDB] text-black focus:outline-none
                  focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
                  id=""
                  rows="8"
                  placeholder="Tell about massage"
                ></textarea>
                <p className="mt-[15px] mb-[10px] text-black">Type</p>
                <select
                  value={editData.mt_type}
                  onChange={handleInput}
                  name="mt_type"
                  className="h-[40px] w-full rounded-md px-2 bg-[#DBDBDB] text-black focus:outline-none
                focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
                >
                  <option value="shoulder">Shoulder</option>
                  <option value="back">Back</option>
                  <option value="neck">Neck</option>
                  <option value="arm">Arm</option>
                  <option value="leg">Leg</option>
                </select>
                <p className="mt-[15px] mb-[10px] text-black">Time</p>
                <select
                  value={editData.mt_time}
                  onChange={handleInput}
                  name="mt_time"
                  className="h-[40px] w-full rounded-md px-2 bg-[#DBDBDB] text-black focus:outline-none
                focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                </select>

                <p className="mt-[15px] mb-[10px] text-black">Round</p>
                <input
                  type="number"
                  value={editData.mt_round}
                  onChange={handleInput}
                  name="mt_round"
                  placeholder="Type Number"
                  className="h-[40px] w-full rounded-md pl-2 bg-[#DBDBDB] text-black focus:outline-none
                focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
                />

                <button className="h-[40px] w-full rounded-lg mt-[40px] bg-[#C0A172] text-[18px] text-center font-medium text-white transition-all duration-300 hover:bg-[#C0A172]">
                  Save
                </button>
              </div>
            </div>
            {/* <div className="block md:hidden w-full h-full text-white text-[14px] font-medium">
              <p className="mb-[10px] text-black">Image</p>
              <div className="w-full  rounded-md aspect-square bg-[#DBDBDB] my-[10px] relative">
                {previewImage1 ? (
                  <img
                    src={previewImage1}
                    alt="Preview 1"
                    className="object-cover h-full w-full rounded-md"
                  />
                ) : (
                  <img
                    src={"/images/" + imagemassage}
                    alt="Event"
                    className="object-cover h-full w-full rounded-md"
                  />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={onInputChange1}
                className="px-3 py-2 my-[10px] h-[40px] w-full rounded-md bg-[#DBDBDB] flex text-black 
                file:border-0 file:bg-[#DBDBDB] file:text-[14px] file:font-medium file:text-black"
              ></input>

              <p className="mt-[15px] mb-[10px] text-black">Name Massage</p>
              <input
                type="text"
                onChange={handleInput}
                name="namemassage"
                placeholder="Name Massage"
                className="h-[40px] w-full rounded-md pl-2 focus:outline-none bg-[#DBDBDB] text-black
                focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
              />
              <p className="mt-[15px] mb-[10px] text-black">Detail Event</p>
              <textarea
                className="w-full pl-2 pt-2 rounded-md bg-[#DBDBDB] text-black focus:outline-none
                focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
                type="text"
                value={detailmassage}
                onChange={(e) => setDetailmassage(e.target.value)}
                name="eventdetail"
                id=""
                rows="8"
                placeholder="Tell about event"
              ></textarea>
              <p className="mt-[15px] mb-[10px] text-black">Type</p>
              <select
                value={typemassage}
                onChange={(e) => setTypemassage(e.target.value)}
                name="typemasage"
                className="h-[40px] w-full rounded-md px-2 bg-[#DBDBDB] text-black focus:outline-none
                focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
              >
                <option>Select Type</option>
                <option value="pubbar">Back</option>
                <option value="festival">Shoulder</option>
                <option value="concert">Neck</option>
              </select>
              <p className="mt-[15px] mb-[10px] text-black">Time</p>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                name="time"
                className="h-[40px] w-full rounded-md px-2 bg-[#DBDBDB] text-black focus:outline-none
                focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
              >
                <option>Select Time</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>

              <p className="mt-[15px] mb-[10px] text-black">Round</p>
              <input
                type="number"
                onChange={handleInput}
                name="round"
                placeholder="Type Number"
                className="h-[40px] w-full rounded-md pl-2 bg-[#DBDBDB] text-black focus:outline-none
                focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
              />

              <button
                type="submit"
                className="text-[18px] h-[40px] w-full rounded-lg mt-[40px] bg-[#C0A172] text-center font-medium text-white hover:bg-[#C0A172]"
              >
                Save
              </button>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditSingleMassge;

import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import IconCom from "../components/IconCom";
import Navmenu from "../components/Navmenu";

import { Link, useNavigate } from "react-router-dom";

function CreateSingle() {
  const [image1, setImage1] = useState(null);
  const [allImage, setAllImage] = useState(null);
  const [previewImage1, setPreviewImage1] = useState(null);
  const [values, setValue] = useState({
    namemassage: "",
    detailmassage: "",
    typemassage: "",
    time: "",
    round: "",
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

  const submitImage = (e) => {
    e.preventDefault();

    const formData = {
      eventimage: image1,
      ...values,
    };

    // Mock response and navigation
    console.log("Event Submitted:", formData);
    alert("Event created successfully!");
    navigate("/singlemanage");
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
                Create Single Massage
              </p>
            </div>
          </div>
          <form
            onSubmit={submitImage}
            className="mt-[10px] rounded-md bg-white w-full h-full pt-[20px] text-[14px] "
          >
            <div className="hidden md:flex w-full h-full">
              <div className="w-1/2 h-full text-black text-[14px] font-medium">
                <p className="mb-[10px]">Image</p>
                <div className="w-full rounded-md aspect-square bg-[#DBDBDB] my-[10px] relative">
                  {!previewImage1 && (
                    <div className="w-full h-full flex items-center justify-center absolute z-10">
                      <p className="text-[30px] font-medium text-black">
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
                  className="px-3 py-2 my-[10px] h-[40px] w-full rounded-md bg-[#DBDBDB] flex text-black 
                file:border-0 file:bg-[#DBDBDB] file:text-[14px] file:font-medium file:text-black"
                ></input>
              </div>
              <div className="w-1/2 h-full pl-[20px] text-white text-[14px] font-medium">
                <p className="mb-[10px] text-black">Name Massage</p>
                <input
                  type="text"
                  onChange={handleInput}
                  name="namemassage"
                  placeholder="Name Massage"
                  className="h-[40px] w-full rounded-md pl-2 bg-[#DBDBDB] text-black focus:outline-none
                focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
                />
                <p className="mt-[15px] mb-[10px] text-black">Detail</p>
                <textarea
                  type="text"
                  onChange={handleInput}
                  name="detailmassage"
                  className="w-full pl-2 pt-2 rounded-md bg-[#DBDBDB] text-black focus:outline-none
                  focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
                  id=""
                  rows="8"
                  placeholder="Tell about massage"
                ></textarea>
                <p className="mt-[15px] mb-[10px] text-black">Type</p>
                <select
                  onChange={handleInput}
                  name="typemassage"
                  className="h-[40px] w-full rounded-md px-2 bg-[#DBDBDB] text-black focus:outline-none
                focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
                >
                  <option>Select Type</option>
                  <option value="back">Back</option>
                  <option value="shoulder">Shoulder</option>
                  <option value="neck">Neck</option>
                </select>
                <p className="mt-[15px] mb-[10px] text-black">Time</p>
                <select
                  onChange={handleInput}
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

                <button className="h-[40px] w-full rounded-lg mt-[40px] bg-[#C0A172] text-[18px] text-center font-medium text-white transition-all duration-300 hover:bg-[#C0A172]">
                  Create Single Massage
                </button>
              </div>
            </div>
            <div className="block md:hidden w-full h-full text-white text-[14px] font-medium">
              <p className="mb-[10px] text-black">Image</p>
              <div className="w-full  rounded-md aspect-square bg-[#DBDBDB] my-[10px] relative">
                {!previewImage1 && (
                  <div className="w-full h-full flex items-center justify-center absolute z-10">
                    <p className="text-[30px] font-medium text-black">
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
              <p className="mt-[15px] mb-[10px] text-black">Detail</p>
              <textarea
                className="w-full pl-2 pt-2 rounded-md bg-[#DBDBDB] text-black focus:outline-none
                focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
                type="text"
                onChange={handleInput}
                name="detailmassage"
                id=""
                rows="8"
                placeholder="Tell about massage"
              ></textarea>
              <p className="mt-[15px] mb-[10px] text-black">Type</p>
              <select
                onChange={handleInput}
                name="typemassage"
                className="h-[40px] w-full rounded-md px-2 bg-[#DBDBDB] text-black focus:outline-none
                focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
              >
                <option>Select Type</option>
                <option value="back">Back</option>
                <option value="shoulder">Shoulder</option>
                <option value="neck">Neck</option>
              </select>
              <p className="mt-[15px] mb-[10px] text-black">Time</p>
              <select
                onChange={handleInput}
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
                Create Single Massage
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateSingle;

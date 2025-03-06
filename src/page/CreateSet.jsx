import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import IconCom from "../components/IconCom";
import { ChevronDown } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

function CreateSet() {
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

  const mockData = [
    {
      id: 1,
      name: "Thai Massage",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "Swedish Massage",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      name: "Deep Tissue Massage",
      image: "https://via.placeholder.com/50",
    },
  ];
  const [selected1, setSelected1] = useState(null);
  const [isOpen1, setIsOpen1] = useState(false);
  const [selected2, setSelected2] = useState(null);
  const [isOpen2, setIsOpen2] = useState(false);
  const [selected3, setSelected3] = useState(null);
  const [isOpen3, setIsOpen3] = useState(false);

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
    navigate("/setofmanage");
  };

  return (
    <div className="bg-white w-full h-full min-h-dvh font-kanit">
      <Nav />
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
                Create Set of Massage
              </p>
            </div>
          </div>
          <form
            onSubmit={submitImage}
            className="mt-[10px] rounded-md bg-white w-full h-full pt-[20px] text-[14px] "
          >
            <div className="hidden md:flex w-full h-full">
              <div className="w-1/2 h-full text-black text-[14px] font-medium">
                <p className="mb-[10px]">Select Single Massage</p>
                <div className="w-full">
                  <div
                    className="border-2 border-dashed border-[#DBDBDB] rounded-lg px-4 py-5 flex justify-between items-center cursor-pointer"
                    onClick={() => setIsOpen1(!isOpen1)}
                  >
                    {selected1 ? (
                      <div className="flex items-center gap-2">
                        <img
                          src={selected1.image}
                          alt={selected1.name}
                          className="w-8 h-8 rounded"
                        />
                        <span>{selected1.name}</span>
                      </div>
                    ) : (
                      <span className="text-black">Select single massage</span>
                    )}
                    <ChevronDown className="w-5 h-5 text-black" />
                  </div>
                  {isOpen1 && (
                    <div className="border border-[#DBDBDB] mt-2 rounded-lg shadow-lg bg-white">
                      {mockData.map((massage) => (
                        <div
                          key={massage.id}
                          className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setSelected1(massage);
                            setIsOpen1(false);
                          }}
                        >
                          <img
                            src={massage.image}
                            alt={massage.name}
                            className="w-8 h-8 rounded"
                          />
                          <span>{massage.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="my-3 w-full">
                  <div
                    className="border-2 border-dashed border-[#DBDBDB] rounded-lg px-4 py-5 flex justify-between items-center cursor-pointer"
                    onClick={() => setIsOpen2(!isOpen2)}
                  >
                    {selected2 ? (
                      <div className="flex items-center gap-2">
                        <img
                          src={selected2.image}
                          alt={selected2.name}
                          className="w-8 h-8 rounded"
                        />
                        <span>{selected2.name}</span>
                      </div>
                    ) : (
                      <span className="text-black">Select single massage</span>
                    )}
                    <ChevronDown className="w-5 h-5 text-black" />
                  </div>
                  {isOpen2 && (
                    <div className="border border-[#DBDBDB] mt-2 rounded-lg shadow-lg bg-white">
                      {mockData.map((massage) => (
                        <div
                          key={massage.id}
                          className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setSelected2(massage);
                            setIsOpen2(false);
                          }}
                        >
                          <img
                            src={massage.image}
                            alt={massage.name}
                            className="w-8 h-8 rounded"
                          />
                          <span>{massage.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="my-3 w-full">
                  <div
                    className="border-2 border-dashed border-[#DBDBDB] rounded-lg px-4 py-5 flex justify-between items-center cursor-pointer"
                    onClick={() => setIsOpen3(!isOpen3)}
                  >
                    {selected3 ? (
                      <div className="flex items-center gap-2">
                        <img
                          src={selected3.image}
                          alt={selected3.name}
                          className="w-8 h-8 rounded"
                        />
                        <span>{selected3.name}</span>
                      </div>
                    ) : (
                      <span className="text-black">Select single massage</span>
                    )}
                    <ChevronDown className="w-5 h-5 text-black" />
                  </div>
                  {isOpen3 && (
                    <div className="border border-[#DBDBDB] mt-2 rounded-lg shadow-lg bg-white">
                      {mockData.map((massage) => (
                        <div
                          key={massage.id}
                          className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setSelected3(massage);
                            setIsOpen3(false);
                          }}
                        >
                          <img
                            src={massage.image}
                            alt={massage.name}
                            className="w-8 h-8 rounded"
                          />
                          <span>{massage.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="w-1/2 h-full pl-[20px] text-white text-[14px] font-medium">
                <p className="mb-[10px] text-black">Name Set of Massage</p>
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
                
                <button className="h-[40px] w-full rounded-lg mt-[40px] bg-[#C0A172] text-[18px] text-center font-medium text-white transition-all duration-300 hover:bg-[#C0A172]">
                  Create Set of Massage
                </button>
              </div>
            </div>
            <div className="block md:hidden w-full h-full text-black text-[14px] font-medium">
            <p className="mb-[10px]">Select Single Massage</p>
                <div className="w-full">
                  <div
                    className="border-2 border-dashed border-[#DBDBDB] rounded-lg px-4 py-5 flex justify-between items-center cursor-pointer"
                    onClick={() => setIsOpen1(!isOpen1)}
                  >
                    {selected1 ? (
                      <div className="flex items-center gap-2">
                        <img
                          src={selected1.image}
                          alt={selected1.name}
                          className="w-8 h-8 rounded"
                        />
                        <span>{selected1.name}</span>
                      </div>
                    ) : (
                      <span className="text-black">Select single massage</span>
                    )}
                    <ChevronDown className="w-5 h-5 text-black" />
                  </div>
                  {isOpen1 && (
                    <div className="border border-gray-300 mt-2 rounded-lg shadow-lg bg-white">
                      {mockData.map((massage) => (
                        <div
                          key={massage.id}
                          className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setSelected1(massage);
                            setIsOpen1(false);
                          }}
                        >
                          <img
                            src={massage.image}
                            alt={massage.name}
                            className="w-8 h-8 rounded"
                          />
                          <span>{massage.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="my-3 w-full">
                  <div
                    className="border-2 border-dashed border-[#DBDBDB] rounded-lg px-4 py-5 flex justify-between items-center cursor-pointer"
                    onClick={() => setIsOpen2(!isOpen2)}
                  >
                    {selected2 ? (
                      <div className="flex items-center gap-2">
                        <img
                          src={selected2.image}
                          alt={selected2.name}
                          className="w-8 h-8 rounded"
                        />
                        <span>{selected2.name}</span>
                      </div>
                    ) : (
                      <span className="text-black">Select single massage</span>
                    )}
                    <ChevronDown className="w-5 h-5 text-black" />
                  </div>
                  {isOpen2 && (
                    <div className="border border-gray-300 mt-2 rounded-lg shadow-lg bg-white">
                      {mockData.map((massage) => (
                        <div
                          key={massage.id}
                          className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setSelected2(massage);
                            setIsOpen2(false);
                          }}
                        >
                          <img
                            src={massage.image}
                            alt={massage.name}
                            className="w-8 h-8 rounded"
                          />
                          <span>{massage.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="my-3 w-full">
                  <div
                    className="border-2 border-dashed border-[#DBDBDB] rounded-lg px-4 py-5 flex justify-between items-center cursor-pointer"
                    onClick={() => setIsOpen3(!isOpen3)}
                  >
                    {selected3 ? (
                      <div className="flex items-center gap-2">
                        <img
                          src={selected3.image}
                          alt={selected3.name}
                          className="w-8 h-8 rounded"
                        />
                        <span>{selected3.name}</span>
                      </div>
                    ) : (
                      <span className="text-black">Select single massage</span>
                    )}
                    <ChevronDown className="w-5 h-5 text-black" />
                  </div>
                  {isOpen3 && (
                    <div className="border border-gray-300 mt-2 rounded-lg shadow-lg bg-white">
                      {mockData.map((massage) => (
                        <div
                          key={massage.id}
                          className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setSelected3(massage);
                            setIsOpen3(false);
                          }}
                        >
                          <img
                            src={massage.image}
                            alt={massage.name}
                            className="w-8 h-8 rounded"
                          />
                          <span>{massage.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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
              

              <button
                type="submit"
                className="text-[18px] h-[40px] w-full rounded-lg mt-[40px] bg-[#C0A172] text-center font-medium text-white hover:bg-[#C0A172]"
              >
                Create Set of Massage
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateSet;

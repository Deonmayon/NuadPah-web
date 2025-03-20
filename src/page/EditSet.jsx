import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import IconCom from "../components/IconCom";
import { ChevronDown } from "lucide-react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function UserProfile() {
  const { id } = useParams();

  return <h1>User ID: {id}</h1>;
}

function EditSet() {
  const [selected1, setSelected1] = useState(null);
  const [isOpen1, setIsOpen1] = useState(false);
  const [selected2, setSelected2] = useState(null);
  const [isOpen2, setIsOpen2] = useState(false);
  const [selected3, setSelected3] = useState(null);
  const [isOpen3, setIsOpen3] = useState(false);

  const [massagedata, setMassagedata] = useState([]);
  const [setdata, setSetdata] = useState({ ms_name: "", ms_detail: "" });
  const [selecteddetail, setSelectedDetail] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchMassage = async () => {
      try {
        const res = await axios.get(`${api}/massage/single-list`);
        console.log("Massage Data:", res.data);
        setMassagedata(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchSet = async () => {
      try {
        const res = await axios.post(`${api}/massage/set-detail`, {
          ms_id: id,
        });
        const data = res.data;
        console.log("Massage Set Data:", data);
        setSetdata(data);
        console.log("Selected Detail:", selecteddetail);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMassage();
    fetchSet();
  }, [api, id]);

  // Use another useEffect to set selected massages **after** data is loaded
  useEffect(() => {
    // Set selected massages only when setdata is available and doesn't already have a value
    if (setdata.massageTechniqueDetails?.length) {
      // Only set values if selected is null (do not reset them if they are already set)
      if (!selected1) setSelected1(setdata.massageTechniqueDetails[0] || null);
      if (!selected2) setSelected2(setdata.massageTechniqueDetails[1] || null);
      if (!selected3) setSelected3(setdata.massageTechniqueDetails[2] || null);
    }
  }, [setdata, selected1, selected2, selected3]);

  const getAvailableOptions = (selected) => {
    return massagedata.filter(
      (item) =>
        item.mt_id !== selected1?.mt_id &&
        item.mt_id !== selected2?.mt_id &&
        item.mt_id !== selected3?.mt_id
    );
  };

  async function fetchSingle(id) {
    try {
      const res = await axios.post(`${api}/massage/single-detail`, {
        mt_id: id,
      });
      const data = res.data;

      const onemassage = {
        type: data.mt_type,
        time: data.mt_time,
        image: data.mt_image_name,
      };

      console.log("One Massage:", onemassage);

      setSelectedDetail((prev) => {
        // Check if onemassage already exists in prev
        const exists = prev.some(
          (item) =>
            item.type === selecteddetail.type &&
            item.time === selecteddetail.time &&
            item.image === selecteddetail.image
        );

        // Only append if the item doesn't already exist
        if (!exists) {
          return [...prev, onemassage];
        }

        return prev; // Return the previous state unchanged if the item exists
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Selected Detail:", selecteddetail);

    // Ensure we are sending the correct selected values
    const alltype = selecteddetail.map((massage) => massage.type);
    const alltime = selecteddetail.reduce(
      (total, massage) => total + massage.time,
      0
    );
    const allimage = selecteddetail.map((massage) => massage.image);
    const joinedKeys = {
      type: alltype,
      time: alltime,
      image: allimage,
    };

    // Prepare data to send
    const formData = {
      ms_name: setdata.ms_name,
      ms_detail: setdata.ms_detail,
      mt_ids: [selected1.mt_id, selected2.mt_id, selected3.mt_id], // Send only IDs
      ms_types: joinedKeys.type,
      ms_time: joinedKeys.time,
      ms_image_names: joinedKeys.image,
    };

    console.log("Submit Data:", formData);
    try {
      const response = await axios.put(
        `${api}/admin/edit-set-massage/${id}`,
        formData
      );
      console.log("Data submitted successfully:", response.data);
      navigate("/setofmanage");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="bg-white w-full h-full min-h-dvh font-kanit">
      <Nav />
      <div className="mt-[120px] px-2 sm:px-4 md:px-6 lg:px-16 max-w-[1250px] mx-auto h-full flex justify-center">
        <div className="mt-[30px] w-full flex flex-col items-center">
          <div className="h-[70px] w-full flex flex-row items-center">
            <Link
              to="/setofmanage"
              className="flex px-3 py-2 rounded-lg items-center border-2 border-solid border-[#C0A172] text-[#C0A172] transition-all duration-300 hover:bg-[#DBDBDB]"
            >
              <IconCom icon="left" size="18" />
              <p className="ml-[2px] text-[14px]">Back</p>
            </Link>
            <div className="ml-[15px] flex flex-col justify-evenly h-full">
              <p className="text-[#C0A172] font-medium text-[20px]">
                Edit Set of Massage
              </p>
            </div>
          </div>
          <form
            className="mt-[10px] rounded-md bg-white w-full h-full pt-[20px] text-[14px]"
            onSubmit={handleSubmit}
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
                          src={selected1.mt_image_name}
                          alt={selected1.name}
                          className="w-8 h-8 rounded"
                        />
                        <span>{selected1.mt_name}</span>
                      </div>
                    ) : (
                      <span className="text-black">Select single massage</span>
                    )}
                    <ChevronDown className="w-5 h-5 text-black" />
                  </div>
                  {isOpen1 && (
                    <div className="border border-[#DBDBDB] mt-2 rounded-lg shadow-lg bg-white">
                      {getAvailableOptions(1).map((massage) => (
                        <div
                          key={massage.mt_id}
                          className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setSelected1(massage);
                            setIsOpen1(false);
                            fetchSingle(massage.mt_id);
                          }}
                        >
                          <img
                            src={massage.mt_image_name}
                            alt={massage.name}
                            className="w-8 h-8 rounded"
                          />
                          <span>{massage.mt_name}</span>
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
                          src={selected2.mt_image_name}
                          alt={selected2.name}
                          className="w-8 h-8 rounded"
                        />
                        <span>{selected2.mt_name}</span>
                      </div>
                    ) : (
                      <span className="text-black">Select single massage</span>
                    )}
                    <ChevronDown className="w-5 h-5 text-black" />
                  </div>
                  {isOpen2 && (
                    <div className="border border-[#DBDBDB] mt-2 rounded-lg shadow-lg bg-white">
                      {getAvailableOptions(2).map((massage) => (
                        <div
                          key={massage.mt_id}
                          className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setSelected2(massage);
                            setIsOpen2(false);
                            fetchSingle(massage.mt_id);
                          }}
                        >
                          <img
                            src={massage.mt_image_name}
                            alt={massage.name}
                            className="w-8 h-8 rounded"
                          />
                          <span>{massage.mt_name}</span>
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
                          src={selected3.mt_image_name}
                          alt={selected3.name}
                          className="w-8 h-8 rounded"
                        />
                        <span>{selected3.mt_name}</span>
                      </div>
                    ) : (
                      <span className="text-black">Select single massage</span>
                    )}
                    <ChevronDown className="w-5 h-5 text-black" />
                  </div>
                  {isOpen3 && (
                    <div className="border border-[#DBDBDB] mt-2 rounded-lg shadow-lg bg-white">
                      {getAvailableOptions(3).map((massage) => (
                        <div
                          key={massage.mt_id}
                          className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setSelected3(massage);
                            setIsOpen3(false);
                            fetchSingle(massage.mt_id);
                          }}
                        >
                          <img
                            src={massage.mt_image_name}
                            alt={massage.name}
                            className="w-8 h-8 rounded"
                          />
                          <span>{massage.mt_name}</span>
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
                  value={setdata.ms_name}
                  onChange={(e) =>
                    setSetdata((prevState) => ({
                      ...prevState,
                      ms_name: e.target.value,
                    }))
                  }
                  name="ms_name"
                  placeholder="Name Massage"
                  className="h-[40px] w-full rounded-md pl-2 bg-[#DBDBDB] text-black focus:outline-none
                focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
                />
                <p className="mt-[15px] mb-[10px] text-black">Detail</p>
                <textarea
                  type="text"
                  value={setdata.ms_detail}
                  onChange={(e) =>
                    setSetdata((prevState) => ({
                      ...prevState,
                      ms_detail: e.target.value,
                    }))
                  }
                  name="ms_detail"
                  className="w-full pl-2 pt-2 rounded-md bg-[#DBDBDB] text-black focus:outline-none
                  focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
                  id=""
                  rows="8"
                  placeholder="Tell about massage"
                ></textarea>

                <button className="h-[40px] w-full rounded-lg mt-[40px] bg-[#C0A172] text-[18px] text-center font-medium text-white transition-all duration-300 hover:bg-[#C0A172]">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditSet;

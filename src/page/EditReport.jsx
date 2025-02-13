import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import IconCom from "../components/IconCom";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navmenu from "../components/Navmenu";

function EditReport() {
  const { id } = useParams();

  const [namereport, setNamereport] = useState("");
  const [namereporter, setNamereporter] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  // Mockup user data
  useEffect(() => {
    // Simulate fetching user data
    const mockUserData = {
      id: 1,
      namereport: " Have a problem",
      namereporter: "John Doe",
      time: "23:28, 24/01/2022",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      status: "processing",
    };

    
    setNamereport(mockUserData.namereport);
    setNamereporter(mockUserData.namereporter);
    setTime(mockUserData.time);
    setDescription(mockUserData.description);
    setStatus(mockUserData.status);
  }, [id]);

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


  const handleUpdate = (e) => {
    e.preventDefault();

    const updateData = {
      username,
      email,
      role,
    };

    if (password.trim() !== "") {
      updateData.password = password; // Include password only if it's not empty
    }

    axios
      .put("http://localhost:3002/update/" + id, updateData)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-white w-full h-full min-h-dvh font-kanit">
      <Nav />
      <Navmenu />
      <form
        onSubmit={handleUpdate}
        className="mt-[120px] px-2 sm:px-4 lg:px-6 max-w-[1250px] mx-auto h-full flex justify-center"
      >
        <div className="mt-[30px] h-[540px] w-[420px] flex flex-col items-center">
          <div className="h-[70px] w-full flex flex-row items-center">
            <Link
              to={"/manageuser"}
              className="flex px-3 py-2 rounded-lg items-center border-2 border-solid border-[#C0A172] text-[#C0A172] hover:bg-[#DBDBDB] transition-all duration-300"
            >
              <IconCom icon="left" size="18" />
              <p className="ml-[2px] text-[14px]">Back</p>
            </Link>
            <div className="ml-[15px] flex flex-col justify-evenly h-full">
              <p className="text-[#C0A172] font-medium text-[16px]">
                00001-{namereport}
              </p>
              <p className="text-black font-medium text-[20px]">Edit Report</p>
            </div>
          </div>
          <div className="mt-[10px] rounded-md bg-white w-full -h-[760px] pt-[20px] text-[14px]">
            <p className="mt-[10px] text-black font-medium text-[14px]">
              {namereport}
            </p>
            <p className="mt-[10px] text-black font-medium text-[14px]">
              {namereporter}
            </p>
            <p className="mt-[10px] text-black font-medium text-[14px]">
              {time}
            </p>
            <p className="mt-[10px] text-black font-medium text-[14px]">
              Detail Report
            </p>
            <p className="mt-[10px] text-black font-medium text-[14px]">
              {description}
            </p>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              name="eventtype"
              className="mt-[10px] h-[40px] w-full rounded-md px-2 bg-[#DBDBDB] text-black focus:outline-none
                focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
            >
              <option value="processing">processing</option>
              <option value="pending">pending</option>
              <option value="completed">completed</option>
              
            </select>
            <button
              type="submit"
              className="mt-[20px] h-[40px] w-full rounded-md bg-[#C0A172] font-medium text-white text-[16px] transition-all duration-300 hover:bg-[#C0A172]"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditReport;
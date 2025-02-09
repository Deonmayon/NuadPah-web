import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import IconCom from "../components/IconCom";
import { useNavigate, useParams, Link } from "react-router-dom";

function EditUser() {
  const { id } = useParams();

  const [image1, setImage1] = useState(null);
  const [previewImage1, setPreviewImage1] = useState(null);

  const [initialUsername, setInitialUsername] = useState("");
  const [username, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Mockup user data
  useEffect(() => {
    // Simulate fetching user data
    const mockUserData = {
      id: 1,
      username: "John",
      lastname: "Doe",
      email: "johndoe@example.com",
      role: "user",
    };

    setInitialUsername(mockUserData.username);
    setUsername(mockUserData.username);
    setLastname(mockUserData.lastname);
    setEmail(mockUserData.email);
    setRole(mockUserData.role);
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
    <div className="bg-[#191414] w-full h-full min-h-dvh font-kanit">
      <Nav />
      <div className="w-full min-h-[60px] bg-[#242424] mt-[60px] fixed top-0 z-10">
        <div className="max-w-[1250px] mx-auto h-full bg-[#242424] px-4 sm:px-6 lg:px-8">
          <div className="h-[60px] flex items-center justify-center sm:justify-start  text-white font-medium">
            <Link
              to="/manageuser"
              className="ml-[20px] transition-all duration-500 px-3 py-2 hover:bg-[#191919] rounded-lg text-[16px] sm:text-[18px] md:text-[20px]"
            >
              Manage Single Massages
            </Link>
            <Link
              to="/manageuser"
              className="ml-[20px] transition-all duration-500 px-3 py-2 hover:bg-[#191919] rounded-lg text-[16px] sm:text-[18px] md:text-[20px]"
            >
              Manage Set of Massages
            </Link>
            <button className="ml-[20px] transition-all duration-500 px-3 py-2 rounded-lg bg-black text-[17px] sm:text-[18px] md:text-[20px]">
              Manage Users
            </button>
            <Link
              to="/manageuser"
              className="ml-[20px] transition-all duration-500 px-3 py-2 hover:bg-[#191919] rounded-lg text-[16px] sm:text-[18px] md:text-[20px]"
            >
              Manage Reports
            </Link>
          </div>
        </div>
      </div>
      <form
        onSubmit={handleUpdate}
        className="mt-[120px] px-2 sm:px-4 lg:px-6 max-w-[1250px] mx-auto h-full flex justify-center"
      >
        <div className="mt-[30px] h-[540px] w-[420px] flex flex-col items-center">
          <div className="h-[70px] w-full flex flex-row items-center">
            <Link
              to={"/manageuser"}
              className="flex px-3 py-2 rounded-lg items-center border-2 border-solid border-[#8A8A8A] text-white hover:bg-[#242424] transition-all duration-300"
            >
              <IconCom icon="left" size="18" />
              <p className="ml-[2px] text-[14px]">Back</p>
            </Link>
            <div className="ml-[15px] flex flex-col justify-evenly h-full">
              <p className="text-[#1DB954] font-medium text-[16px]">
                {id}-{initialUsername}
              </p>
              <p className="text-white font-medium text-[20px]">Edit User</p>
            </div>
          </div>
          <div className="mt-[10px] rounded-md bg-[#242424] w-full -h-[760px] p-[20px] text-[14px]">
            <p className="mb-[10px] text-white font-medium text-[14px]">
              Image
            </p>
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
            <div className="mt-[15px] mb-[10px] flex">
              <div className="w-1/2 pr-[5px]">
                <p className="mb-[10px] text-white font-medium text-[14px]">Username</p>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  name="locationprovice"
                  placeholder="Provice"
                  className="h-[40px] w-full rounded-md pl-2 bg-[#191414] text-white focus:outline-none
                      focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                />
              </div>
              <div className="pl-[5px] w-1/2">
                <p className="mb-[10px] text-white font-medium text-[14px]">Lastname</p>
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  name="locationcountry"
                  placeholder="Country"
                  className="h-[40px] w-full rounded-md pl-2 bg-[#191414] text-white focus:outline-none
                      focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                />
              </div>
            </div> 
            <p className="mt-[10px] text-white font-medium text-[14px]">
              Email
            </p>
            <input
              type="text"
              className="h-[40px] w-full rounded-md my-[10px] pl-2 focus:outline-none bg-[#191414] text-white
              focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <p className="mt-[10px] text-white font-medium text-[14px]">
              Change Password
            </p>
            <input
              type="password"
              className="h-[40px] w-full rounded-md my-[10px] pl-2 focus:outline-none bg-[#191414] text-white
              focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="mt-[20px] h-[40px] w-full rounded-md bg-[#1DB954] font-medium text-white text-[16px] transition-all duration-300 hover:bg-[#1CAA4E]"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditUser;
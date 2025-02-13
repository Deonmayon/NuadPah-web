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
      image:
        "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
    };

    setInitialUsername(mockUserData.username);
    setUsername(mockUserData.username);
    setLastname(mockUserData.lastname);
    setEmail(mockUserData.email);
    setPreviewImage1(mockUserData.image); // Set the initial image preview
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
      lastname,
      email,
      image,
    };

    if (password.trim() !== "") {
      updateData.password = password; // Include password only if it's not empty
    }

    // Simulate updating user data
    console.log("Updated user data:", updateData);
  };

  return (
    <div className="bg-white w-full h-full min-h-dvh font-kanit">
      <Nav />
      <form
        onSubmit={handleUpdate}
        className="mt-[120px] px-2 sm:px-4 lg:px-6 max-w-[1250px] mx-auto h-full flex justify-center"
      >
        <div className="mt-[30px] h-[540px] w-[420px] flex flex-col items-center">
          <div className="h-[70px] w-full flex flex-row items-center">
            <Link
              to={"/usermanage"}
              className="flex px-3 py-2 rounded-lg items-center border-2 border-solid border-[#C0A172] text-[#C0A172] hover:bg-[#DBDBDB] transition-all duration-300"
            >
              <IconCom icon="left" size="18" />
              <p className="ml-[2px] text-[14px]">Back</p>
            </Link>
            <div className="ml-[15px] flex flex-col justify-evenly h-full">
              <p className="text-[#C0A172] font-medium text-[16px]">
                1-{initialUsername}
              </p>
              <p className="text-black font-medium text-[20px]">Edit User</p>
            </div>
          </div>
          <div className="mt-[10px] rounded-md bg-white w-full -h-[760px] pt-[20px] text-[14px]">
            <p className="mb-[10px] text-black font-medium text-[14px]">
              Image
            </p>
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
            <div className="mt-[15px] mb-[10px] flex">
              <div className="w-1/2 pr-[5px]">
                <p className="mb-[10px] text-black font-medium text-[14px]">
                  Username
                </p>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  name="First Name"
                  placeholder="First Name"
                  className="h-[40px] w-full rounded-md pl-2 bg-[#DBDBDB] text-black focus:outline-none
                      focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
                />
              </div>
              <div className="pl-[5px] w-1/2">
                <p className="mb-[10px] text-black font-medium text-[14px]">
                  Lastname
                </p>
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  name="Last Name"
                  placeholder="Last Name"
                  className="h-[40px] w-full rounded-md pl-2 bg-[#DBDBDB] text-black focus:outline-none
                      focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
                />
              </div>
            </div>
            <p className="mt-[10px] text-black font-medium text-[14px]">
              Email
            </p>
            <input
              type="text"
              className="h-[40px] w-full rounded-md my-[10px] pl-2 focus:outline-none bg-[#DBDBDB] text-black
              focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <p className="mt-[10px] text-black font-medium text-[14px]">
              Change Password
            </p>
            <input
              type="password"
              className="h-[40px] w-full rounded-md my-[10px] pl-2 focus:outline-none bg-[#DBDBDB] text-black
              focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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

export default EditUser;

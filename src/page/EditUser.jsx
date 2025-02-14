/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import IconCom from "../components/IconCom";
import { useNavigate, Link } from "react-router-dom";

function EditUser() {
  const [image1, setImage1] = useState(null);
  const [previewImage1, setPreviewImage1] = useState(null);
  const [editData, setEditData] = useState({
    id: 0,
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    image_name: "",
  });

  const navigate = useNavigate();

  // Mockup user data
  useEffect(() => {
    GetSelectedUser();
  }, []);

  const GetSelectedUser = async () => {
    const oldData = await JSON.parse(localStorage.getItem("edit_user_id"));

    setPreviewImage1(oldData.image_name);
    setEditData(oldData);

    console.log(oldData);
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

    if (file) {
      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage1(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage1(null);
    }
  };

  function extractFileName(url) {
    const cleanFileName = url.split("/").pop().split("?")[0];

    return cleanFileName;
  }

  const EditUser = async (image_name) => {
    console.log(editData);
    console.log(image_name);

    try {
      const response = await axios.put(
        `http://localhost:3000/admin/edit-user/${editData.id}`,
        {
          email: editData.email,
          firstname: editData.firstname,
          lastname: editData.lastname,
          password: editData.password,
          image_name: image_name,
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (image1) {
        const formData = new FormData();
        formData.append("image", image1);

        const upload_response = await axios.post(
          "http://localhost:3000/image/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        EditUser(upload_response.data.data);
      } else {
        const oldFileName = extractFileName(editData.image_name);
        EditUser(oldFileName);
      }

      alert("User edited successfully!");
      navigate("/usermanage");
    } catch (error) {
      console.error("Error editing single massage:", error);
    }
  };

  return (
    <div className="bg-white w-full h-full min-h-dvh font-kanit">
      <Nav />
      <form
        onSubmit={handleSubmit}
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
                {editData.firstname} {editData.lastname}
              </p>
              <p className="text-black font-medium text-[20px]">Edit User</p>
            </div>
          </div>
          <div className="mt-[10px] rounded-md bg-white w-full -h-[760px] pt-[20px] text-[14px]">
            <p className="mb-[10px] text-black font-medium text-[14px]">
              Image
            </p>
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
            <div className="mt-[15px] mb-[10px] flex">
              <div className="w-1/2 pr-[5px]">
                <p className="mb-[10px] text-black font-medium text-[14px]">
                  Firstname
                </p>
                <input
                  type="text"
                  value={editData.firstname}
                  onChange={handleInput}
                  name="firstname"
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
                  value={editData.lastname}
                  onChange={handleInput}
                  name="lastname"
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
              value={editData.email}
              placeholder="email"
              onChange={handleInput}
              name="email"
            />

            <p className="mt-[10px] text-black font-medium text-[14px]">
              New Password
            </p>
            <input
              type="password"
              className="h-[40px] w-full rounded-md my-[10px] pl-2 focus:outline-none bg-[#DBDBDB] text-black
              focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
              placeholder="New Password"
              value={editData.password}
              onChange={handleInput}
              name="password"
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

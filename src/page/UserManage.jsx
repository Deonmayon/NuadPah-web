import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import IconCom from "../components/IconCom";

import { Link, useParams, useNavigate } from "react-router-dom";

function UserManage() {
  const mockData = [
    {
      _id: "1",
      username: "John Doe",
      email: "john@example.com",
      role: "admin",
      formattedCreatedAt: "2025-01-01",
      eventimage: "event1.jpg",
    },
    {
      _id: "2",
      username: "Jane Smith",
      email: "jane@example.com",
      role: "user",
      formattedCreatedAt: "2025-02-01",
      eventimage: "event1.jpg",
    },
    {
      _id: "3",
      username: "Alice Johnson",
      email: "alice@example.com",
      role: "user",
      formattedCreatedAt: "2025-03-01",
      eventimage: "event1.jpg",
    },
    {
      _id: "4",
      username: "Bob Brown",
      email: "bob@example.com",
      role: "admin",
      formattedCreatedAt: "2025-04-01",
      eventimage: "event1.jpg",
    },
    {
      _id: "5",
      username: "Emma Davis",
      email: "emma@example.com",
      role: "user",
      formattedCreatedAt: "2025-05-01",
      eventimage: "event1.jpg",
    },
    // เพิ่มข้อมูลเพิ่มเติมหากจำเป็น
  ];
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const totalPages = Math.ceil(data.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = Array.isArray(data)
    ? data.slice(indexOfFirstUser, indexOfLastUser)
    : [];

  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setData(mockData);
    }, 500);
  }, []);

  const togglePopup = (user) => {
    setShowPopup(!showPopup);
    setSelectedUser(user);

    // Toggle body scrolling
    document.body.style.overflow = showPopup ? "auto" : "hidden";
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleEdit = () => {
    togglePopup();
  };

  const ConfirmDelete = () => {
    confirm("Are you sure to delete this user");
  };

  const handleDelete = (id) => {
    togglePopup();
    const confirmed = window.confirm("Are you sure to delete this event?");
    if (confirmed) {
      setData((prevData) => prevData.filter((event) => event._id !== id));
    }
  };

  return (
    <div className="bg-white w-full h-full min-h-dvh font-kanit">
      <Nav className="z-20" />
      <div className="mt-[120px] px-2 sm:px-4 lg:px-6 max-w-[1440px] mx-auto h-full">
        <p className="font-medium text-[#C0A172] text-[35px] md:text-[40px] my-[30px]">
          Manage Users
        </p>
        <div className="min-h-[840px] max-h-[840px] min-w-[382px] max-w-[1440px] h-full w-full rounded-md flex flex-col">
          <div className="block md:hidden">
            <div className="w-full min-h-[70px] max-h-[70px] h-full flex flex-row items-center px-4 text-white justify-between bg-white rounded-t-md">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full flex justify-center items-center rounded-lg bg-[#C0A172] text-[16px] hover:bg-[#C0A172] transition-all duration-300"
              >
                <IconCom icon="left" size="22" />
              </button>
              <p className="text-[#C0A172] text-[16px] font-medium">
                Page {currentPage} of {totalPages}
              </p>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full flex justify-center items-center rounded-lg bg-[#C0A172] text-[16px] hover:bg-[#C0A172] transition-all duration-300"
              >
                <IconCom icon="right" size="22" />
              </button>
            </div>
          </div>
          {data.length > 0 && (
            <table className="table text-[#C0A172] text-[16px] min-h-[70px] max-h-[70px] h-full w-full items-center bg-white md:rounded-t-md">
              <thead className="table-header-group">
                <tr className="md:table-row hidden">
                  <th className="h-[70px] table-cell text-left align-middle px-4 font-medium">
                    Name
                  </th>
                  <th className="h-[70px] table-cell text-left align-middle px-4 font-medium">
                    Email
                  </th>
                  <th className="h-[70px] table-cell text-left align-middle px-4 font-medium">
                    Created At
                  </th>
                  <th className="h-[70px] table-cell text-left align-middle px-4"></th>
                </tr>
              </thead>
              <tbody className="table-row-group">
                {currentUsers.map((user, index) => (
                  <React.Fragment key={index}>
                    <tr className="text-black border-y border-solid border-[#C0A172] hidden md:table-row hover:bg-[#DBDBDB] transition-all duration-300">
                      <td className="max-w-[90px] sm:max-w-[130px] md:max-w-[200px] h-[70px] table-cell text-left align-middle px-4">
                        <div className="flex items-center">
                          <div className="min-h-[45px] min-w-[45px] max-h-[45px] max-w-[45px] w-full h-full bg-[#C0A172] rounded-full flex justify-center items-center mr-[8px]">
                            <img
                              key={index}
                              src={"./images/" + user.eventimage}
                              alt="Event"
                              className="object-cover min-h-[45px] min-w-[45px] h-full w-full rounded-full"
                            />
                          </div>
                          <p className="truncate overflow-hidden whitespace-nowrap">
                            {user.username}
                          </p>
                        </div>
                      </td>

                      <td className="h-[70px] table-cell text-left align-middle px-4">
                        {user.email}
                      </td>

                      <td className="h-[70px] table-cell text-left align-middle px-4">
                        {user.formattedCreatedAt}
                      </td>
                      <td className="h-[70px] table-cell text-left align-middle px-4">
                        <div className="flex justify-end">
                          <Link
                            to={`/edituser`}
                            className="transition-all text-white duration-300 hover:bg-[#C0A172] min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full bg-[#C0A172] rounded-lg flex justify-center items-center"
                          >
                            <IconCom icon="edit" />
                          </Link>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="transition-all text-white duration-300 bg-[#FF5757] ml-4 min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full hover:bg-[#942423] rounded-lg flex justify-center items-center"
                          >
                            <IconCom icon="trash" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr
                      key={index}
                      className="table-row md:hidden border-y border-solid border-[#C0A172] hover:bg-[#DBDBDB] transition-all duration-300"
                    >
                      <td className="h-[70px] table-cell text-left align-middle px-4">
                        <div className="flex items-center">
                          <div className="min-h-[45px] min-w-[45px] max-h-[45px] max-w-[45px] w-full h-full bg-[#C0A172] rounded-full flex justify-center items-center mr-[8px]">
                            <img
                              src={"./images/" + user.eventimage}
                              alt="Event"
                              className="object-cover min-h-[45px] min-w-[45px] h-full w-full rounded-full"
                            />
                          </div>
                          <div className="flex flex-col">
                            <p className="text-black">{user.username}</p>
                            <p className="font-extralight text-black">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="h-[70px] table-cell text-left align-middle px-4 text-[13px] font-medium">
                        <div className="flex items-center text-white justify-end">
                          <button
                            onClick={() => togglePopup(user)}
                            className="ml-4 min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full bg-[#C0A172] rounded-lg flex justify-center items-center transition-all duration-300 hover:bg-[#C0A172]"
                          >
                            <IconCom icon="point" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}
          {/* Bottom content */}
          <div className="w-full min-h-[70px] min-w-[382px] max-h-[70px] h-full flex flex-row items-center px-4 text-white justify-between bg-white rounded-b-md">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full flex justify-center items-center rounded-lg bg-[#C0A172] text-[16px] hover:bg-[#C0A172] transition-all duration-300"
            >
              <IconCom icon="left" size="22" />
            </button>
            <p className="text-[#C0A172] text-[16px] font-medium">
              Page {currentPage} of {totalPages}
            </p>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full flex justify-center items-center rounded-lg bg-[#C0A172] text-[16px] hover:bg-[#C0A172] transition-all duration-300"
            >
              <IconCom icon="right" size="22" />
            </button>
          </div>
        </div>
      </div>
      {showPopup && (
        <>
          {/* Backdrop */}
          <div
            className="fixed top-0 left-0 w-full h-full bg-opacity-50 backdrop-filter backdrop-blur z-10"
            onClick={togglePopup}
          ></div>
          {/* Popup Content */}
          <div className="fixed z-20 bottom-0 inset-x-0 flex items-center justify-center mb-5">
            <div className="px-5 py-3 w-full h-full max-w-[420px] max-h-[170px] bg-[#C0A172] rounded-md shadow-lg text-white">
              <div className="flex justify-between py-2">
                <p className="font-medium text-[20px]">Select</p>
                <button
                  onClick={togglePopup}
                  className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-white text-[#C0A172] hover:bg-[#FF5757]"
                >
                  <IconCom icon="x" />
                </button>
              </div>
              <Link
                to={selectedUser ? `/editevent/${selectedUser._id}` : "#"}
                onClick={handleEdit}
                className="transition-all duration-300 mb-2 w-full flex items-center px-4 py-3 text-sm text-left rounded-md hover:bg-[#DBDBDB]"
              >
                <IconCom icon="edit" />
                <p className="ml-[10px] text-[16px] font-medium">Edit</p>
              </Link>
              <button
                onClick={() => selectedUser && handleDelete(selectedUser._id)}
                className="transition-all duration-300 flex w-full items-center px-4 py-3 text-sm text-left bg-[#FF5757] rounded-md hover:bg-[#FF5757]"
              >
                <IconCom icon="trash" />
                <p className="ml-[10px] text-[16px] font-medium">Delete</p>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UserManage;

import React, { useEffect, useState } from "react";
import IconCom from "../components/IconCom";
import Nav from "../components/Nav";
import Navmenu from "../components/Navmenu";

import { Link, useNavigate } from "react-router-dom";

function ReportManage() {
  const navigate = useNavigate();

  const mockEvents = [
    {
      _id: "000001",
      eventname: "Have a problem",
      artistname: "Leslie Alexander",
      eventtype: "pending",
      eventimage: "event1.jpg",
      formattedCreatedAt: "2025-02-01",
    },
    {
      _id: "000002",
      eventname: "Have a question",
      artistname: "Guy Hawkins",
      eventtype: "processing",
      eventimage: "event2.jpg",
      formattedCreatedAt: "2025-01-20",
    },
    {
      _id: "000003",
      eventname: "Have a jookroo",
      artistname: "Marvin McKinney",
      eventtype: "completed",
      eventimage: "event3.jpg",
      formattedCreatedAt: "2025-01-15",
    },
    {
      _id: "000004",
      eventname: "Have a Showcase",
      artistname: "Arlene McCoy",
      eventtype: "pending",
      eventimage: "event4.jpg",
      formattedCreatedAt: "2025-01-10",
    },
  ];

  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const eventPerPage = 10;
  const totalPages = Math.ceil(data.length / eventPerPage);
  const indexOfLastEvent = currentPage * eventPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventPerPage;
  const currentEvents = Array.isArray(data)
    ? data.slice(indexOfFirstEvent, indexOfLastEvent)
    : [];

  const [showPopup, setShowPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setData(mockEvents);
    }, 500);
  }, []);

  const togglePopup = (event) => {
    setShowPopup(!showPopup);
    setSelectedEvent(event);

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
      <Navmenu />
      <div className="mt-[120px] px-2 sm:px-4 lg:px-6 max-w-[1440px] mx-auto h-full">
        <div className="hidden sm:block my-[30px]">
          <div className="flex justify-start items-center">
            <p className="font-medium text-[#C0A172] text-[35px] md:text-[40px]">
              Manage Report
            </p>
          </div>
        </div>
        <div className="block sm:hidden my-[30px]">
          <div className="flex flex-col">
            <p className="font-medium text-[#C0A172] text-[35px] md:text-[40px] mb-[20px]">
              Manage Report
            </p>
          </div>
        </div>
        <div className="min-h-[840px] max-h-[840px] min-w-[382px] max-w-[1440px] h-full w-full rounded-md flex flex-col">
          <div className="block md:hidden">
            <div className="w-full min-h-[70px] max-h-[70px] h-full flex flex-row items-center px-4 text-white justify-between bg-white rounded-t-md">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="transition-all duration-300 min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full flex justify-center items-center rounded-lg bg-[#C0A172] text-[16px] hover:bg-[#C0A172]"
              >
                <IconCom icon="left" size="22" />
              </button>
              <p className="text-[#C0A172] text-[16px] font-medium">
                Page {currentPage} of {totalPages}
              </p>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="transition-all duration-300 min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full flex justify-center items-center rounded-lg bg-[#C0A172] text-[16px] hover:bg-[#C0A172]"
              >
                <IconCom icon="right" size="22" />
              </button>
            </div>
          </div>
          <table className="table text-[#C0A172] text-[16px] min-h-[70px] max-h-[70px] h-full w-full items-center bg-white md:rounded-t-md">
            <thead className="table-header-group">
              <tr className="md:table-row hidden">
                <th className="h-[70px] table-cell text-left align-middle px-4 font-medium">
                  No.
                </th>
                <th className="h-[70px] table-cell text-left align-middle px-4 font-medium">
                  Name Report
                </th>
                <th className="h-[70px] table-cell text-left align-middle px-4 font-medium">
                  Name Reporter
                </th>
                <th className="h-[70px] table-cell text-left align-middle px-4 font-medium">
                  Status
                </th>
                <th className="h-[70px] table-cell text-left align-middle px-4 font-medium">
                  Created At
                </th>
                <th className="h-[70px] table-cell text-left align-middle px-4"></th>
              </tr>
            </thead>
            <tbody className="table-row-group">
              {currentEvents.map((event, index) => (
                <React.Fragment key={index}>
                  <tr className="text-black border-y border-solid border-[#C0A172] hidden md:table-row hover:bg-[#DBDBDB] transition-all duration-300">
                    <td className="h-[70px] table-cell text-left align-middle px-4">
                      {event._id}
                    </td>
                    <td className="h-[70px] table-cell text-left align-middle px-4">
                      {event.eventname}
                    </td>
                    <td className="h-[70px] table-cell text-left align-middle px-4">
                      {event.artistname}
                    </td>
                    <td className="h-[70px] table-cell text-left align-middle px-4 text-[13px] font-medium text-white">
                      {(() => {
                        switch (event.eventtype) {
                          case "pending":
                            return (
                              <div className="px-2 py-0 rounded-2xl bg-[#B1B1B1] flex items-center justify-center border border-solid border-white">
                                <p>pending</p>
                              </div>
                            );
                          case "processing":
                            return (
                              <div className="px-2 py-0 rounded-2xl bg-[#C0A172] flex items-center justify-center border border-solid border-white">
                                <p>processing</p>
                              </div>
                            );
                          case "completed":
                            return (
                              <div className="px-2 py-0 rounded-2xl bg-[#5A7654] flex items-center justify-center border border-solid border-white">
                                <p>completed</p>
                              </div>
                            );
                          default:
                            return (
                              <div className="px-2 py-0 rounded-2xl bg-[#54174E] flex items-center justify-center border border-solid border-white">
                                <p>{event.eventtype}</p>
                              </div>
                            );
                        }
                      })()}
                    </td>
                    <td className="h-[70px] table-cell text-left align-middle px-4">
                      {event.formattedCreatedAt}
                    </td>
                    <td className="h-[70px] table-cell text-left align-middle px-4">
                      <div className="flex justify-end">
                        <Link
                          to={`/editreport`}
                          className="text-white min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full bg-[#C0A172] rounded-lg flex justify-center items-center transition-all duration-300 hover:bg-[#C0A172]"
                        >
                          <IconCom icon="edit" />
                        </Link>
                        <button
                          onClick={() => handleDelete(event._id)}
                          className="text-white ml-4 min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full bg-[#FF5757] rounded-lg flex justify-center items-center transition-all duration-300 hover:bg-[#7D1D1C]"
                        >
                          <IconCom icon="trash" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr
                    key={index}
                    className="table-row md:hidden border-y border-solid border-[#C0A172] hover:bg-[#DBDBDB]"
                  >
                    <td className="h-[70px] table-cell text-left align-middle px-4">
                      <div className="flex">
                        <div className="flex flex-col max-w-[170px] ">
                          <p className="text-black truncate overflow-hidden whitespace-nowrap">
                            {event._id}-{event.eventname}
                          </p>
                          <p className="font-extralight text-black">
                            {event.formattedCreatedAt}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="h-[70px] table-cell text-left align-middle px-4 text-[13px] font-medium">
                      <div className="flex items-center text-white justify-end">
                        {(() => {
                          switch (event.eventtype) {
                            case "pending":
                              return (
                                <div className="px-2 py-0 rounded-2xl bg-[#B1B1B1] flex items-center justify-center border border-solid border-white">
                                  <p>pending</p>
                                </div>
                              );
                            case "processing":
                              return (
                                <div className="px-2 py-0 rounded-2xl bg-[#C0A172] flex items-center justify-center border border-solid border-white">
                                  <p>processing</p>
                                </div>
                              );
                            case "completed":
                              return (
                                <div className="px-2 py-0 rounded-2xl bg-[#5A7654] flex items-center justify-center border border-solid border-white">
                                  <p>completed</p>
                                </div>
                              );
                            default:
                              return (
                                <div className="px-2 py-0 rounded-2xl bg-[#54174E] flex items-center justify-center border border-solid border-white">
                                  <p>{event.eventtype}</p>
                                </div>
                              );
                          }
                        })()}
                        <button
                          onClick={() => togglePopup(event)}
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
          {/* Bottom content */}
          <div className="w-full min-h-[70px] min-w-[382px] max-h-[70px] h-full flex flex-row items-center px-4 text-white justify-between bg-white rounded-b-md">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="transition-all duration-300 min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full flex justify-center items-center rounded-lg bg-[#C0A172] text-[16px] hover:bg-[#C0A172]"
            >
              <IconCom icon="left" size="22" />
            </button>
            <p className="text-[#C0A172] text-[16px] font-medium">
              Page {currentPage} of {totalPages}
            </p>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="transition-all duration-300 min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full flex justify-center items-center rounded-lg bg-[#C0A172] text-[16px] hover:bg-[#C0A172]"
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
                to={selectedEvent ? `/editevent/${selectedEvent._id}` : "#"}
                onClick={handleEdit}
                className="transition-all duration-300 mb-2 w-full flex items-center px-4 py-3 text-sm text-left rounded-md hover:bg-[#DBDBDB]"
              >
                <IconCom icon="edit" />
                <p className="ml-[10px] text-[16px] font-medium">Edit</p>
              </Link>
              <button
                onClick={() => selectedEvent && handleDelete(selectedEvent._id)}
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

export default ReportManage;

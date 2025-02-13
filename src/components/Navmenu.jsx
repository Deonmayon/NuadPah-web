import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navmenu() {
    const location = useLocation();

  return (
    <div className="w-full min-h-[60px] bg-[#C0A172] mt-[60px] fixed top-0 z-50">
      <div className="max-w-[1440px] mx-auto h-full bg-[#C0A172] px-4 sm:px-6 lg:px-8">
        <div className="h-[60px] flex items-center justify-center sm:justify-start  text-white font-medium">
          <Link
            to="/singlemanage"
            className={`h-full transition-all duration-100 px-3 py-2 text-[12px] sm:text-[14px] md:text-[18px] ${
                location.pathname === "/singlemanage"
                  ? "border-b-4 border-white"
                  : "hover:border-b-4"}`}
          >
            Manage Single Massages
          </Link>
          <Link
            to="/setofmanage"
            className={`h-full ml-[20px] transition-all duration-100 px-3 py-2 text-[12px] sm:text-[14px] md:text-[18px] ${
                location.pathname === "/setofmanage"
                  ? "border-b-4 border-white"
                  : "hover:border-b-4"}`}
          >
            Manage Set of Massages
          </Link>
          <Link
            to="/usermanage"
            className={`h-full ml-[20px] transition-all duration-100 px-3 py-2 text-[12px] sm:text-[14px] md:text-[18px] ${
                location.pathname === "/usermanage"
                  ? "border-b-4 border-white"
                  : "hover:border-b-4"}`}
          >
            Manage Users
          </Link>
          <Link
            to="/reportmanage"
            className={`h-full ml-[20px] transition-all duration-100 px-3 py-2 text-[12px] sm:text-[14px] md:text-[18px] ${
                location.pathname === "/reportmanage"
                  ? "border-b-4 border-white"
                  : "hover:border-b-4"}`}
          >
            Manage Reports
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navmenu;

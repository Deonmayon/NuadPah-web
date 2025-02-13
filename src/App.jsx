import { useState, useEffect } from "react";
import SingleManage from "./page/SingleManage";
import UserManage from "./page/UserManage";
import ReportManage from "./page/ReportManage";
import SetofManage from "./page/SetofManage";
import CreateSingle from "./page/CreateSingle";
import EditUser from "./page/EditUser";
import EditReport from "./page/EditReport";
import EditSingleMassge from "./page/EditSingleMassage";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SingleManage />}></Route>
        <Route path="/singlemanage" element={<SingleManage />}></Route>
        <Route path="/usermanage" element={<UserManage />}></Route>
        <Route path="/reportmanage" element={<ReportManage />}></Route>
        <Route path="/setofmanage" element={<SetofManage />}></Route>
        <Route path="/createsingle" element={<CreateSingle />}></Route>
        <Route path="/edituser" element={<EditUser />}></Route>
        <Route path="/editreport" element={<EditReport />}></Route>
        <Route path="/editsinglemassage" element={<EditSingleMassge />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { useState, useEffect } from "react";
import SingleManage from './page/SingleManage'
import UserManage from './page/UserManage'
import ReportManage from "./page/ReportManage";
import SetofManage from "./page/SetofManage";

import { BrowserRouter, Routes, Route , Link } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/singlemanage" element={<SingleManage />}></Route>
        <Route path="/usermanage" element={<UserManage />}></Route>
        <Route path="/reportmanage" element={<ReportManage />}></Route>
        <Route path="/setofmanage" element={<SetofManage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

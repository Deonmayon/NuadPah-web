import SingleManage from "./page/SingleManage";
import UserManage from "./page/UserManage";
import ReportManage from "./page/ReportManage";
import SetofManage from "./page/SetofManage";
import CreateSingle from "./page/CreateSingle";
import EditUser from "./page/EditUser";
import EditReport from "./page/EditReport";
import EditSingleMassge from "./page/EditSingleMassage";
import CreateSet from "./page/CreateSet";
import EditSet from "./page/EditSet";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/singlemanage" />} />
        <Route path="/singlemanage" element={<SingleManage />} />
        <Route path="/usermanage" element={<UserManage />} />
        <Route path="/reportmanage" element={<ReportManage />} />
        <Route path="/setofmanage" element={<SetofManage />} />
        <Route path="/createsingle" element={<CreateSingle />} />
        <Route path="/edituser" element={<EditUser />} />
        <Route path="/editreport" element={<EditReport />} />
        <Route path="/editsinglemassage" element={<EditSingleMassge />} />
        <Route path="/createset" element={<CreateSet />} />
        <Route path="/editset" element={<EditSet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import AdminPage from "./components/AdminPage";
import UserPage from "./components/Userpage";
import EmployeeLeavesTable from "./components/EmployeeLeavesTable";
import RequestLeaveForm from "../src/components/RequestLeaveForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/user/*" element={<UserPage />} />
      <Route path="/admin/*" element={<AdminPage />} />
      <Route path="/user/request-leave" element={<RequestLeaveForm />}></Route>
      <Route
        path="/user/leave-history"
        element={<EmployeeLeavesTable />}
      ></Route>
      <Route path="/user/leave-info" element={<UserPage />}></Route>
    </Routes>
  );
}

export default App;

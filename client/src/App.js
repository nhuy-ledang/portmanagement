import "./App.scss";
import NavBar from "./components/NavBar";
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home";
import UserManagement from "./pages/user/UserManagement";
import RightAssignment from "./pages/user/RightAssignment";
import LayoutManagement from "./pages/port/LayoutManagement";
import PortAssignment from "./pages/port/PortAssignment";
import PortScheduler from "./pages/port/PortScheduler";
import Administrator from "./pages/admin/Administrator";
import AuditLog from "./pages/admin/AuditLog";
import DeviceDetection from "./pages/admin/DeviceDetection";
import Report from "./pages/admin/Report";

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user-management' element={<UserManagement />} />
          <Route path='/right-assignment' element={<RightAssignment />} />
          <Route path='/layout-management' element={<LayoutManagement />} />
          <Route path='/port-assignment' element={<PortAssignment />} />
          <Route path='/port-scheduler' element={<PortScheduler />} />
          <Route path='/administrator' element={<Administrator />} />
          <Route path='/audit-log' element={<AuditLog />} />
          <Route path='/device-detection' element={<DeviceDetection />} />
          <Route path='/report' element={<Report />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cuenta from '../pages/Cuenta';
import Login2 from '../pages/Login2';
import Dashboard2 from '../pages/Dashboard2';
import Layout2 from '../pages/Layout2';
import ReportAudit from '../pages/ReportAudit';

function App2() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login2" element={<Login2 />} />
        <Route element={<Layout2 />}>
          <Route path="dashboard2" element={<Dashboard2 />} />
          <Route path="cuenta" element={<Cuenta />} />
          <Route path="reportes" element={<ReportAudit />} />
          <Route path="/login2" element={<Login2 />} />
        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App2;
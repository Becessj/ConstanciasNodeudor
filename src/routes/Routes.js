import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Consulta from '../pages/Consulta';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Layout from '../pages/Layout';
import ReportAudit from '../pages/ReportAudit';
import Login2 from '../pages/Login2';
import Cuenta from '../pages/Cuenta';
import Dashboard2 from '../pages/Dashboard2';
import Layout2 from '../pages/Layout2';

import Login3 from '../pages/Login3';
import Prueba from '../pages/Prueba';
import Dashboard3 from '../pages/Dashboard3';
import Layout3 from '../pages/Layout3';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="consulta" element={<Consulta />} />
          <Route path="reportes" element={<ReportAudit />} />
          <Route path="/" element={<Login />} />

        </Route>
        <Route path="/login2" element={<Login2 />} />
        <Route element={<Layout2 />}>
          <Route path="dashboard2" element={<Dashboard2 />} />
          <Route path="cuenta" element={<Cuenta />}  />
          <Route path="reportes" element={<ReportAudit />} />
          <Route path="/login2" element={<Login2 />}  />

        </Route>
        
        <Route path="/login3" element={<Login3 />} />
        <Route element={<Layout3 />}>
          <Route path="dashboard3" element={<Dashboard3 />} />
          <Route path="prueba" element={<Prueba />}  />
          <Route path="/login3" element={<Login3 />}  />

        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;

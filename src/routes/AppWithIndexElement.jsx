import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './component/menu/Sidebar';

import Viewgoods from './component/good/Viewgoods';




function AppWithIndexElement() {
  return (
    <Sidebar>
      <Routes>
        <Route index element={<Viewgoods />} />
      </Routes>
    </Sidebar>
  );
}

export default AppWithIndexElement;
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddCommentForm from './component/comment/AddCommentForm'
import Comments from './component/comment/Comments'
import Viewgoodsinshop from './component/shop/ViewgoodsinshopComponent'
import Viewonegoodinshop from './component/shop/ViewonegoodinshopComponent'

function AppWithCustomerRoute() {
  return (
    
      <Routes>
        <Route index element={<Viewgoodsinshop />} />
        <Route path='viewgoodsinshop' element={<Viewgoodsinshop />} />
        <Route path='viewonegoodinshop/:id' element={<Viewonegoodinshop />} />
        <Route path='addcommentform' element={<AddCommentForm />} />
        <Route path='comments' element={<Comments />} />
      </Routes>
  );
}

export default AppWithCustomerRoute;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from '../component/menu/Sidebar'; // Імпорт Sidebar

import Viewgoods from '../component/good/Viewgoods';
import Addgood from '../component/good/Addgood';
// import Viewsubcategoriesgoods from './component/subcategory/Viewsubcategoriesgoods';
import Viewsubcategories from '../component/subcategory/ViewSubcategoriesComponent';
import Viewcategories from '../component/category/ViewCategoriesComponent';
import Viewonegood from '../component/good/Viewonegood';
import Addphotosgood from '../component/good/Addphotosgood';
import AddProperties from '../property/AddPropertiesComponent';
import AddPropertiesByCategory from '../property/AddPropertiesByCategoryComponent';
import AddCategory from '../component/category/AddCategoriesComponent';
import AddSubcategory from '../component/subcategory/AddSubcategoriesComponent';
import AddGoodToShop from '../component/shop/AddGoodToShopComponent';

function AppWithSidebar() {
  return (
    <div>
      <Sidebar /> {/* Відображаємо бокове меню */}
      <Routes>
        <Route path='addgood' element={<Addgood />} />
        <Route path='viewgoods' element={<Viewgoods />} />
        <Route path='viewonegood/:id' element={<Viewonegood />} />
        <Route path='viewcategories' element={<Viewcategories />} />
        <Route path='viewsubcategories' element={<Viewsubcategories />} />
        <Route path='addphotosgood/:id' element={<Addphotosgood />} />
        <Route path='addproperties' element={<AddProperties />} />
        <Route path='addpropertiesbycategory/:id' element={<AddPropertiesByCategory />} />
        <Route path='addcategory' element={<AddCategory />} />
        <Route path='addsubcategory' element={<AddSubcategory />} />
        <Route path='addgoodtoshop' element={<AddGoodToShop />} />
      </Routes>
    </div>
  );
}

export default AppWithSidebar;

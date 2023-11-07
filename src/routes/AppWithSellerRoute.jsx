import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from '../../component/menu/Sidebar';
import AddCategory from '../../component/category/AddCategoriesComponent';
import Addgood from '../../component/good/Addgood';
import AddGoodToShop from '../../component/shop/AddGoodToShopComponent';
import Addphotosgood from '../../component/good/Addphotosgood';
import AddProperties from '../../property/AddPropertiesComponent';
import AddPropertiesByCategory from '../../property/AddPropertiesByCategoryComponent';
import AddSubcategory from '../../component/subcategory/AddSubcategoriesComponent';
import Viewcategories from '../../component/category/ViewCategoriesComponent';
import Viewgoods from '../../component/good/Viewgoods';
import Viewonegood from '../../component/good/Viewonegood';
import Viewsubcategories from '../../component/subcategory/ViewSubcategoriesComponent';

function AppWithSellerRoute() {
  return (
    <Sidebar>
      <Routes>
        <Route index element={<Viewgoods />} />
        <Route path='addgood' element={<Addgood />} />
        <Route path='viewgoods' element={<Viewgoods />} />
        <Route path='viewonegood/:id' element={<Viewonegood />} />
        {/* <Route path='viewsubcategoriesgoods' element={<Viewsubcategoriesgoods />} /> */}
        <Route path='viewcategories' element={<Viewcategories />} />
        <Route path='viewsubcategories' element={<Viewsubcategories />} />
        <Route path='addphotosgood/:id' element={<Addphotosgood />} />
        <Route path='addproperties' element={<AddProperties />} />
        <Route path='addpropertiesbycategory/:id' element={<AddPropertiesByCategory />} />
        <Route path='addcategory' element={<AddCategory />} />
        <Route path='addsubcategory' element={<AddSubcategory />} />
        <Route path='addgoodtoshop' element={<AddGoodToShop />} />
      </Routes>
    </Sidebar>
  );
}

export default AppWithSellerRoute;
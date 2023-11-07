// import React, { Component } from 'react'
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
// import Addgood from './Addgood'
// import Addphotosgood from './Addphotosgood'
// import Viewgoods from './Viewgoods'
// import Viewonegood from './Viewonegood'
// import Viewscsubcategoriesgoods from './Viewscsubcategoriesgoods'

// export default class Navmenu extends Component {
//     render() {
//         return (
//             <div>
               
//                     <div>
//                         <nav>
//                             <ul>
//                                 <li>
//                                     <Link to='/Addgood'>Addgood</Link>
//                                 </li>
//                                 <li>
//                                     <Link to='/Addphotosgood'>Addphotosgood</Link>
//                                 </li>
//                                 <li>
//                                     <Link to='/Viewgoods'>Viewgoods</Link>
//                                 </li>
//                                 <li>
//                                     <Link to='/Viewonegood'>Viewonegood</Link>
//                                 </li>
//                                 <li>
//                                     <Link to='/Viewscsubcategoriesgoods'>Viewscsubcategoriesgoods</Link>
//                                 </li>
//                             </ul>
//                         </nav>
//                         <BrowserRouter>
//                             <Routes>
//                                 <Route path='/Addgood'>
//                                     <Addgood />
//                                 </Route>
//                                 <Route path='/Addphotosgood'>
//                                     <Addphotosgood />
//                                 </Route>
//                                 <Route path='/Viewgoods'>
//                                     <Viewgoods />
//                                 </Route>
//                                 <Route path='/Viewonegood'>
//                                     <Viewonegood />
//                                 </Route>
//                                 <Route path='/Viewscsubcategoriesgoods'>
//                                     <Viewscsubcategoriesgoods />
//                                 </Route>
//                             </Routes>
//                         </BrowserRouter>
//                     </div>
                
//             </div>
//         )
//     }
// }








// import React, { Component } from 'react'

// export default class Navmenu extends Component {
//   render() {
//     return (
//       <div>
        
//       </div>
//     )
//   }
// }

import React, { useState } from 'react';

const AddSubcategoryForm = ({ onAddSubcategory }) => {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const subcategory = {
      name,
      categoriesGoodsId: parseInt(categoryId)
    };

    onAddSubcategory(subcategory);
    setName('');
    setCategoryId('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Назва"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="ID категорії"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      />
      <button type="submit">Додати</button>
    </form>
  );
};

export default AddSubcategoryForm;

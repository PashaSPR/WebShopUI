import { NavLink, Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <>
            <header>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/addgood'>Addgood</NavLink>
                <NavLink to='/viewgoods'>Viewgoods</NavLink>
                <NavLink to='/viewonegood'>Viewonegood</NavLink>
                <NavLink to='/viewscsubcategoriesgoods'>Viewscsubcategoriesgoods</NavLink>
                <NavLink to='/addphotosgood'>Addphotosgood</NavLink>
            </header>

            <Outlet />

            <footer>My WebShop 2023</footer>
        </>
    )
}
export { Layout }
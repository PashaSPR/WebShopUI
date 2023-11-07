import React from 'react'
import { Sidebar } from '../../component/menu/Sidebar'
import { Routes } from 'react-router-dom'
import ManagerRoutes from './ManagerRoutes'

export default function AppWithSidebar() {
    return (
        <Sidebar>
            <Routes>
                <ManagerRoutes>

                </ManagerRoutes>
    
            </Routes>
        </Sidebar>
    )
}

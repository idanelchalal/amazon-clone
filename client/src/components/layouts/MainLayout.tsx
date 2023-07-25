import { Outlet } from 'react-router-dom'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import AuthProvider from '../../providers/AuthProvider'

const MainLayout = () => {
    return (
        <>
            <AuthProvider>
                <main
                    id="main-layout-container"
                    className="w-full min-h-screen overflow-x-hidden relative flex flex-col"
                >
                    <Header />

                    <Outlet />

                    <Footer />
                </main>
            </AuthProvider>
        </>
    )
}

export default MainLayout

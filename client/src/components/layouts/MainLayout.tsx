import { Outlet } from 'react-router-dom'
import Header from '../UI/Header/Header'
import Footer from '../UI/Footer/Footer'

const MainLayout = () => {
    return (
        <>
            <main
                id="main-layout-container"
                className="w-full h-screen overflow-x-hidden relative"
            >
                <Header />

                <Outlet />

                <Footer />
            </main>
        </>
    )
}

export default MainLayout

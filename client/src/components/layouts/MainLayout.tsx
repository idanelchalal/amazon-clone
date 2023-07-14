import { Outlet } from 'react-router-dom'
import Header from '../UI/Header/Header'
import Footer from '../UI/Footer/Footer'

const MainLayout = () => {
    return (
        <>
            <main
                id="main-layout-container"
                className="w-full min-h-screen overflow-x-hidden relative flex flex-col"
            >
                <Header />

                <Outlet />

                <Footer />
            </main>
        </>
    )
}

export default MainLayout

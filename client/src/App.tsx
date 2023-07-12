import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './components/layouts/MainLayout'
import MainPage from './pages/MainPage'

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route index element={<MainPage />} />
                        <Route path="*" element={'404'} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App

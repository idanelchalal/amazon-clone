import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './components/layouts/MainLayout'

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route index element={'main'} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App

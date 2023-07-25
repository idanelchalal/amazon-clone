import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './components/layouts/MainLayout'
import MainPage from './pages/MainPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import FormLayout from './components/layouts/FormLayout'
import ProductPage from './pages/ProductPage'

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<MainPage />} />
                        <Route
                            path="/product/:productId"
                            element={<ProductPage />}
                        />
                    </Route>
                    <Route path="auth" element={<FormLayout />}>
                        <Route path="signup" element={<RegisterPage />} />
                        <Route path="signin" element={<LoginPage />} />
                    </Route>
                    <Route path="*" element={'404'} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App

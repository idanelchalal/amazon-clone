import { BrowserRouter, Route, Routes } from 'react-router-dom'

// LAYOUT
import MainLayout from './components/layouts/MainLayout'

// PAGES
import MainPage from './pages/MainPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'

import { AuthContext } from './providers/AuthProvider'
import { useContext } from 'react'

// ROUTES
import ProtectedRoute from './providers/ProtectedRoute'
import AuthRoutesProtector from './providers/AuthRoutesProtector'
import CartProvider from './providers/CartProvider'

const App = () => {
    const { session } = useContext(AuthContext)
    return (
        <>
            <CartProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainLayout />}>
                            <Route index element={<MainPage />} />
                            <Route
                                path="/product/:productId"
                                element={<ProductPage />}
                            />
                            <Route path="cart">
                                <Route
                                    index
                                    element={
                                        <ProtectedRoute
                                            session={session}
                                            fallback="/auth/signin"
                                        >
                                            <CartPage />
                                        </ProtectedRoute>
                                    }
                                />

                                <Route
                                    path="checkout"
                                    element={
                                        <ProtectedRoute
                                            session={session}
                                            fallback="/auth/signin"
                                        >
                                            <CheckoutPage />
                                        </ProtectedRoute>
                                    }
                                />
                            </Route>
                        </Route>
                        <Route
                            path="auth"
                            element={
                                <AuthRoutesProtector
                                    fallback={'/'}
                                    session={session}
                                />
                            }
                        >
                            <Route path="signup" element={<RegisterPage />} />
                            <Route path="signin" element={<LoginPage />} />
                        </Route>
                        <Route path="*" element={'404'} />
                    </Routes>
                </BrowserRouter>
            </CartProvider>
        </>
    )
}

export default App

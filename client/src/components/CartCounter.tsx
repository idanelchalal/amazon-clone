import { useContext } from 'react'
import { BsCart } from 'react-icons/bs'
import { CartContext } from '../providers/CartProvider'

const CartCounter = () => {
    const { itemsQty } = useContext(CartContext)
    return (
        <div id="cart-nav" className="flex gap-x-1 items-center relative">
            <BsCart className="text-[33px] relative" />
            <span className="absolute left-[12px] top-[2.5px] text-cyan-400 font-semibold">
                {itemsQty || 0}
            </span>

            <span className="text-lg font-semibold">Cart</span>
        </div>
    )
}

export default CartCounter

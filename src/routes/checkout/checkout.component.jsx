import './checkout.styles.scss';
import { useCurrentCartDropdownState } from '../../contexts/cart.context'
import { useContext } from 'react';

const Checkout = () => {
    const { cartItems, addItemToCart, removeItemFromCart } = useCurrentCartDropdownState();

    return(
        <div className='cart-item-container'>
            <div>
                {
                    cartItems.map((cartItem) => {
                        const { id, name, imageUrl, price, quantity } = cartItem;
                        return ( 
                            <div key={id}>
                                <img src={imageUrl} alt={`${name}`}/>
                                <span className='name'>{ name }</span>
                                <span className='price'>{quantity} x ${price}</span>
                                <br />
                                <span onClick={() => removeItemFromCart(cartItem)}>decrement</span>
                                <br />
                                <span onClick={() => addItemToCart(cartItem)}>increment</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Checkout;
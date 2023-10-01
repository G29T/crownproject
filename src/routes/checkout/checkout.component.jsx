import './checkout.styles.scss';
import { useCurrentCartDropdownState } from '../../contexts/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

const Checkout = () => {
    const { cartItems, addItemToCart, removeItemFromCart } = useCurrentCartDropdownState();

    return(
        <div className='checkout-container'>
            <div  className='checkout-header'>
                <div  className='header-block'>
                    <span>Product</span>
                </div>
                <div  className='header-block'>
                    <span>Description</span>
                </div>
                <div  className='header-block'>
                    <span>Quantity</span>
                </div>
                <div  className='header-block'>
                    <span>Price</span>
                </div>
                <div  className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map((cartItem) => {
                    return(
                        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                    )
                    // const { id, name, imageUrl, price, quantity } = cartItem;
                    // return ( 
                    //     <div key={id}>
                    //         <img src={imageUrl} alt={`${name}`}/>
                    //         <span className='name'>{ name }</span>
                    //         <span className='price'>{quantity} x ${price}</span>
                    //         <br />
                    //         <span onClick={() => removeItemFromCart(cartItem)}>decrement</span>
                    //         <br />
                    //         <span onClick={() => addItemToCart(cartItem)}>increment</span>
                    //     </div>
                    // )
                })
            }
            <span className='Total'>Total</span>
        </div>
    )
}

export default Checkout;
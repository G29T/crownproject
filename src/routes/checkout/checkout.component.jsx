import './checkout.styles.scss';
import { useCurrentCartDropdownState } from '../../contexts/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

const Checkout = () => {
    const { cartItems, cartTotal } = useCurrentCartDropdownState();

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
                })
            }
            <span className='Total'>{cartTotal}</span>
        </div>
    )
}

export default Checkout;
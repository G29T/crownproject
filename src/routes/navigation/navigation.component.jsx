import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom'
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import CartIcon from '../../components/cart-icon/cart-icon-component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { UserContext } from '../../contexts/user.context'
import { useCurrentCartDropdownState } from '../../contexts/cart.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import './navigation.styles.scss';

const Navigation = () => {
  //whenever a value inside Context update then re-render
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useCurrentCartDropdownState();

  const signOutHandler = async() => {
    await signOutUser();
  }

  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
            <CrownLogo className='crown-logo' />
        </Link>
        <div className='nav-links-container'>
            <Link className='nav-link' to='/shop'>Shop</Link>
            {
              currentUser ? (
                <span className='nav-link' onClick={signOutHandler}>Sign Out</span>
                ):(
                <Link className='nav-link' to='/auth'>Sign In</Link>
                )
            } 
            <CartIcon />
        </div>
        {
          isCartOpen && <CartDropdown /> 
        }
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
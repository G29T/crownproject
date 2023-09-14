import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom'
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';
import { UserContext } from '../../contexts/user.context'

const Navigation = () => {
  //whenever a value inside Context update then re-render
  const { currentUser } = useContext(UserContext);
  return (
    <Fragment>
      <div className='navigation'>
        <div>
            <Link className='logo-container' to='/'>
                <CrownLogo className='crown-logo' />
            </Link>
        </div>
        <div className='nav-links-container'>
            <Link className='nav-link' to='/shop'>Shop</Link>
            <Link className='nav-link' to='/auth'>Sign In</Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
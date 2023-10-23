import './directory-item.styles';
import {
    BackgroundImage,
    DirectoryItemContainer,
    Body
  } from './directory-item.styles';

import { useNavigate } from 'react-router-dom'; //Hook

// this is a functional component
const DirectoryItem = ({category}) => {
    const {imageUrl, title, route} = category
    const navigate = useNavigate();
    
    const onNavigateHandler = () => navigate(route);

    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage imageUrl={imageUrl} />
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem;
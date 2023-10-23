import './directory-item.styles';
import {
    BackgroundImage,
    DirectoryItemContainer,
    Body
  } from './directory-item.styles';

// this is a functional component
const DirectoryItem = ({category}) => {
    const {id, imageUrl,title} = category
    return (
        <DirectoryItemContainer>
            <BackgroundImage imageUrl={imageUrl} />
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem;
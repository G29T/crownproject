import CategoryItemBody from "../category-item-body/category-item-body.component";

// this is a functional component
const CategoryItem = ({category}) => {
    const {id, imageUrl,title} = category
    return (
        <div className="category-container" key={id}>
            <div className="background-image" style={{
            backgroundImage: `url(${imageUrl})`
            }}/>
            <CategoryItemBody title={title}/>
      </div>
    )
}

export default CategoryItem;
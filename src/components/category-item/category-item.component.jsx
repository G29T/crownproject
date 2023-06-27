import CategoryBodyContainer from "../category-body-container/category-body-container.component";

// this is a functional component
const CategoryItem = ({category}) => {
    const {id, imageUrl,title} = category
    return (
        <div className="category-container" key={id}>
            <div className="background-image" style={{
            backgroundImage: `url(${imageUrl})`
            }}/>
            <CategoryBodyContainer title={title}/>
      </div>
    )
}

export default CategoryItem;
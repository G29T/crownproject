import './category-preview.styles.scss'
import ProductCard from '../../components/product-card/product-card-component';

const CategoryPreview = ({ title, products }) => {
    return (
        <div className='category-preview-container'>
            <h2>
                <span className='title'>{title.toUpperCase()}</span>
            </h2>
            <div className='preview'>
                {
                    // we want to filter out anything but the first 4
                    // the call back (_, index) is getting a product which I'll ignore (the _)
                    //as I don't want to use it, and the second argument is the index
                    //we keep whatever has an index lower than 4
                    products.filter((_, index) => index < 4)
                    .map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </div>
        </div>
    )
}

export default CategoryPreview;
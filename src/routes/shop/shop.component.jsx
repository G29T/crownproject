import { useCurrentProducts } from '../../contexts/products.context';

const Shop = () => {
    const { products } = useCurrentProducts();
    return (
        <div>
            {products.map(({id, name}) => (
                <div key={id}>
                    <h1>{name}</h1>
                </div>
            ))}
        </div>
    )
}

export default Shop;
import type { Product } from "../types/product";
// import "../App.css";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="product">
      <img src={product.image} alt={product.name} width="200" />

      <h2>{product.name}</h2>
      <p>Category: {product.category}</p>
      <p>Price: Nrs.{product.price}</p>

      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;

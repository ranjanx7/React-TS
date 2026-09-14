import { useState } from "react";
import type { Product } from "../types/product";
import { useCartContext } from "../context/CartContext";

interface HomeProps {
  products: Product[];
}

function Home({ products }: HomeProps) {
  const { addToCart } = useCartContext();
  const [searchInput, setSearchInput] = useState("");
  const [disabledButtons, setDisabledButtons] = useState<Set<number>>(
    new Set(),
  );

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchInput.toLowerCase()),
  );

  function handleAddToCart(product: Product) {
    setDisabledButtons((prev) => new Set(prev).add(product.id));
    addToCart(product);

    setTimeout(() => {
      setDisabledButtons((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 3000);
  }

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product">
            <img src={product.image} alt={product.name} width="200" />

            <h2>{product.name}</h2>
            <p>Category: {product.category}</p>
            <p className="price">Nrs.{product.price}</p>

            <button
              onClick={() => handleAddToCart(product)}
              disabled={disabledButtons.has(product.id)}
            >
              {disabledButtons.has(product.id) ? "Item Added!" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

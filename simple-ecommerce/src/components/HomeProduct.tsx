import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { useCartContext } from "../context/CartContext";

interface HomeProps {
  products: Product[];
}

function Home({ products }: HomeProps) {
  const { addToCart } = useCartContext();

  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("all");

  const [disabledButtons, setDisabledButtons] = useState<Set<number>>(
    new Set(),
  );

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchInput]);

  // Get unique categories
  const categories = [...new Set(products.map((product) => product.category))];

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

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
        {/* Search */}
        <input
          type="text"
          className="search-input-left"
          placeholder="Search products..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        {/* Category Filter */}
        <select
          className="category-select-right"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
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

import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { useCartContext } from "../context/CartContext";
import { useProductContext } from "../context/ProductContext";
import { ShoppingCartOutlined, EyeOutlined } from "@ant-design/icons";
import { Modal, message } from "antd";

function Home() {
  const { addToCart } = useCartContext();
  const { products } = useProductContext();

  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("all");

  const [disabledButtons, setDisabledButtons] = useState<Set<number>>(
    new Set(),
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
    message.success(`${product.name} added to cart!`);

    setTimeout(() => {
      setDisabledButtons((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 3000);
  }

  function handleViewDetails(product: Product) {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedProduct(null);
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

            <div className="button-group">
              <button
                onClick={() => handleViewDetails(product)}
                className="view-details-btn"
              >
                <EyeOutlined /> View
              </button>
              <button
                onClick={() => handleAddToCart(product)}
                disabled={disabledButtons.has(product.id)}
              >
                {disabledButtons.has(product.id) ? (
                  <>
                    <ShoppingCartOutlined /> Added!
                  </>
                ) : (
                  <>
                    <ShoppingCartOutlined /> Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        title={selectedProduct?.name}
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width={600}
      >
        {selectedProduct && (
          <div className="product-details">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              style={{ width: "100%", maxWidth: "400px", marginBottom: "20px" }}
            />
            <p>
              <strong>Category:</strong> {selectedProduct.category}
            </p>
            <p>
              <strong>Price:</strong> Nrs.{selectedProduct.price}
            </p>
            <p>
              <strong>Product ID:</strong> {selectedProduct.id}
            </p>
            <p>
              <strong>Description:</strong> {selectedProduct.description}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Home;

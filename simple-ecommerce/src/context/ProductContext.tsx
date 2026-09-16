import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "../types/product";
import { products as initialProducts } from "../data/products";

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  getProductById: (id: number) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  function addProduct(product: Omit<Product, "id">) {
    const newId = Math.max(...products.map((p) => p.id), 0) + 1;
    setProducts([...products, { ...product, id: newId }]);
  }

  function updateProduct(id: number, updatedFields: Partial<Product>) {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, ...updatedFields } : product,
      ),
    );
  }

  function deleteProduct(id: number) {
    setProducts(products.filter((product) => product.id !== id));
  }

  function getProductById(id: number): Product | undefined {
    return products.find((product) => product.id === id);
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
}

import React, { createContext, useContext, useState } from 'react';

const ProductsContext = createContext();

export const useProductsContext = () => useContext(ProductsContext);

export const ProductsProvider = ({ children }) => {
   const [products, setProducts] = useState([]);

   const saveProduct = (product) => {
      setProducts(currentProducts => {
         // check if the product with the given id already exists
         const index = currentProducts.findIndex(p => p.id === product.id);

         if (index !== -1) {
            // product exists, replace it
            const newProducts = [...currentProducts];
            newProducts[index] = product;
            return newProducts;
         } else {
            // product doesn't exist, add it as a new product
            // if the product doesn't have an id, generate one
            const newProduct = product.id ? product : {...product, id: Date.now()};
            return [...currentProducts, newProduct];
         }
      });
   };

   return (
      <ProductsContext.Provider value ={{ products, setProducts, saveProduct }}>
         {children}
      </ProductsContext.Provider>
   );
};
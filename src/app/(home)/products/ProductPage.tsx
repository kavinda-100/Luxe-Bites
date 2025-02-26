import React from "react";
import SearchBar from "./_components/search/SearchBar";
import Categories from "./_components/categories/Categories";
import ProductList from "./_components/products/ProductList";

const ProductPage = () => {
  return (
    <section className={"container mx-auto mt-4 flex flex-col gap-3"}>
      {/* Header */}
      <div className={"flex items-center justify-between gap-6"}>
        <h1
          className={"text-lg font-bold tracking-tight text-muted-foreground"}
        >
          Find Your <span className={"text-primary"}>Favorite</span> Foods
        </h1>
        <SearchBar />
      </div>
      {/*  categories */}
      <Categories />
      {/*  products */}
      <ProductList />
    </section>
  );
};
export default ProductPage;

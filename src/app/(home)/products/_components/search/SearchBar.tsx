"use client";

import React from "react";
import { CommandIcon, SearchIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../../components/ui/dialog";
import { DialogBody } from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import { useDebounce } from "../../../../../hooks/useDebounce";
import { useSearchProducts } from "../../../../../hooks/api/users/products/useSearchProducts";
import { Skeleton } from "../../../../../components/ui/skeleton";
import SearchList from "./SearchList";

const SearchBar = () => {
  // Dialog open state
  const [isOpen, setIsOpen] = React.useState(false);
  // Search query for input
  const [searchQuery, setSearchQuery] = React.useState("");
  // Debounce search query
  const debouncedValue = useDebounce(searchQuery, 1500);
  // Search for food
  const { searchProducts, isSearchLoading, searchError, setSearchTerm } =
    useSearchProducts();

  // Search for food
  React.useEffect(() => {
    setSearchTerm(debouncedValue);
  }, [debouncedValue, setSearchTerm]);

  // Open dialog on key press
  const KeyPressDialogOpen = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === "k") {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  // Listen for key press
  React.useEffect(() => {
    document.addEventListener("keydown", KeyPressDialogOpen);

    return () => {
      document.removeEventListener("keydown", KeyPressDialogOpen);
    };
  }, []);

  return (
    <>
      <div
        className="flex min-w-[300px] cursor-pointer items-center gap-2 rounded-md border bg-muted p-2"
        onClick={() => setIsOpen(true)}
      >
        <SearchIcon className="size-4" />
        <p className={"w-full text-sm font-medium text-muted-foreground"}>
          Search for food
        </p>
        <span className={"flex items-center gap-1 text-muted-foreground"}>
          <CommandIcon className="size-3" /> K
        </span>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={"sr-only"}>Search for food</DialogTitle>
            <div className={"flex justify-center gap-3 border-b p-2"}>
              <SearchIcon className="size-5" />
              <input
                placeholder={"Type a food name or search"}
                className={
                  "w-full border-none bg-transparent shadow-none focus:outline-none focus:ring-0"
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </DialogHeader>
          <DialogBody className={"max-h-[400px] overflow-y-auto"}>
            {searchError && (
              <div className={"w-full bg-muted p-2"}>
                <p className={"text-sm font-medium text-red-500"}>
                  {searchError.message}
                </p>
              </div>
            )}
            {isSearchLoading &&
              Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className={"h-12 w-full"} />
              ))}
            {searchProducts?.data && searchProducts.data.length > 0 ? (
              searchProducts.data.map((product) => (
                <SearchList
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  image={product.image}
                />
              ))
            ) : (
              <div className={"w-full bg-muted p-2"}>
                <p className={"text-sm font-medium text-muted-foreground"}>
                  No results found
                </p>
              </div>
            )}
          </DialogBody>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default SearchBar;

import { prisma } from "../server/db";

const products = [
  {
    name: "Chocolate Croissant",
    description:
      "A buttery, flaky croissant with a rich dark chocolate filling, perfect for breakfast or an afternoon snack.",
    price: 2.99,
    discount: 0.5,
    stock: 100,
    image:
      "https://62966vzr5x.ufs.sh/f/Ay4pssvNA9trAIFgi7vNA9tr0sLCUcIWPxodT3ezYM7FlHhu",
    categoryId: "cm8mo2u7g0001vvzhlgljniz5",
    active: true,
    rating: 4.8,
  },
  {
    name: "Banana Bread",
    description:
      "Moist and soft banana-flavored bread made with ripe bananas, walnuts, and a hint of cinnamon.",
    price: 5.49,
    discount: 1.0,
    stock: 80,
    image:
      "https://62966vzr5x.ufs.sh/f/Ay4pssvNA9tryfx12x6ADTXwxg1QlasV9N5jKfYBJWGLHhq3",
    categoryId: "cm8mo2u7g0001vvzhlgljniz5",
    active: true,
    rating: 4.7,
  },
  {
    name: "Cheese Danish",
    description:
      "A sweet, flaky pastry filled with a creamy cheese center and topped with a light sugar glaze.",
    price: 3.29,
    discount: 0.3,
    stock: 120,
    image:
      "https://62966vzr5x.ufs.sh/f/Ay4pssvNA9tr1plsg2kD3bBguj4SfamT6rqneXiJGFozhAvk",
    categoryId: "cm8mo2u7g0001vvzhlgljniz5",
    active: true,
    rating: 4.6,
  },
  {
    name: "Fresh Strawberries",
    description:
      "Sweet and juicy strawberries picked fresh from the farm, perfect for desserts or healthy snacks.",
    price: 6.99,
    discount: 1.5,
    stock: 60,
    image:
      "https://62966vzr5x.ufs.sh/f/Ay4pssvNA9trC1lQ4uZx8rqYLTmcOXp12nZVlhkRowyN03a7",
    categoryId: "cm8mo2vl10002vvzh4y1eeyav",
    active: true,
    rating: 4.9,
  },
  {
    name: "Organic Spinach",
    description:
      "Fresh and pesticide-free spinach rich in iron and essential vitamins for a healthy diet.",
    price: 4.49,
    discount: 0.5,
    stock: 70,
    image:
      "https://62966vzr5x.ufs.sh/f/Ay4pssvNA9trhwgEaKuZjbsW1X4dqSiD6YBkQnztMvPu8AEe",
    categoryId: "cm8mo2vl10002vvzh4y1eeyav",
    active: true,
    rating: 4.8,
  },
  {
    name: "Carrot Pack (1kg)",
    description:
      "Crunchy and fresh orange carrots, great for salads, juices, and cooking.",
    price: 3.99,
    discount: 0.2,
    stock: 90,
    image:
      "https://62966vzr5x.ufs.sh/f/Ay4pssvNA9trmG4yJhzfL2xWqyCPdEXzlBnbpureD4T83vcg",
    categoryId: "cm8mo2vl10002vvzh4y1eeyav",
    active: true,
    rating: 4.7,
  },
  {
    name: "Whole Milk (1L)",
    description:
      "Creamy and fresh whole milk sourced from organic dairy farms, rich in calcium.",
    price: 2.99,
    discount: 0.0,
    stock: 150,
    image:
      "https://62966vzr5x.ufs.sh/f/Ay4pssvNA9trZ9tcCFwy58MT4aeW9pE6dJ7YqXkuf1xjwARt",
    categoryId: "cm8mo2wda0003vvzh8fgix2oc",
    active: true,
    rating: 4.9,
  },
  {
    name: "Cheddar Cheese Block (250g)",
    description:
      "Aged cheddar cheese with a rich and bold flavor, great for sandwiches and cooking.",
    price: 4.99,
    discount: 0.8,
    stock: 85,
    image:
      "https://62966vzr5x.ufs.sh/f/Ay4pssvNA9tr1jGB9RkD3bBguj4SfamT6rqneXiJGFozhAvk",
    categoryId: "cm8mo2wda0003vvzh8fgix2oc",
    active: true,
    rating: 4.8,
  },
  {
    name: "Farm Fresh Eggs (12 pcs)",
    description:
      "Nutrient-rich eggs from free-range hens, perfect for breakfast or baking.",
    price: 3.49,
    discount: 0.5,
    stock: 110,
    image:
      "https://62966vzr5x.ufs.sh/f/Ay4pssvNA9trFhujM4NDsuD1tdirh8HFjpRJmvaWw625oQb9",
    categoryId: "cm8mo2wda0003vvzh8fgix2oc",
    active: true,
    rating: 4.9,
  },
  {
    name: "Boneless Chicken Breast (500g)",
    description:
      "Lean and protein-packed boneless chicken breast, perfect for healthy meals.",
    price: 6.99,
    discount: 1.0,
    stock: 75,
    image:
      "https://62966vzr5x.ufs.sh/f/Ay4pssvNA9trc5ehqF0mBfqtybiwXPaJjCUHoZu6kWnThSp8",
    categoryId: "cm8mo2x5c0004vvzhja14py1s",
    active: true,
    rating: 4.8,
  },
  {
    name: "Fresh Salmon Fillet (250g)",
    description:
      "High-quality, omega-3 rich salmon fillet, perfect for grilling or baking.",
    price: 12.99,
    discount: 2.0,
    stock: 50,
    image:
      "https://62966vzr5x.ufs.sh/f/Ay4pssvNA9trh6OLZHuZjbsW1X4dqSiD6YBkQnztMvPu8AEe",
    categoryId: "cm8mo2x5c0004vvzhja14py1s",
    active: true,
    rating: 4.9,
  },
  {
    name: "Beef Ribeye Steak (300g)",
    description:
      "Juicy and tender ribeye steak, ideal for a premium steak dinner.",
    price: 14.99,
    discount: 2.5,
    stock: 45,
    image:
      "https://62966vzr5x.ufs.sh/f/Ay4pssvNA9tr6HWfHiNFwQLE7OK3xHBMaS4GrWlgUz8YRnNo",
    categoryId: "cm8mo2x5c0004vvzhja14py1s",
    active: true,
    rating: 4.9,
  },
];

async function main() {
  console.log("Seeding products...");

  for (const product of products) {
    await prisma.product.createMany({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        discount: product.discount,
        stock: product.stock,
        image: product.image,
        categoryId: product.categoryId,
        active: product.active,
        rating: product.rating,
      },
      skipDuplicates: true,
    });
  }

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error("Seeding failed with cancel:", e);
  })
  .finally(() => {
    console.log("Closing database connection...");
  });

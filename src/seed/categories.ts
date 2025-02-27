import { prisma } from "../server/db";

const categories = [
  {
    name: "Bakery & Pastries",
    description:
      "Freshly baked bread, cakes, cookies, and pastries made with high-quality ingredients for a delightful taste experience.",
  },
  {
    name: "Fruits & Vegetables",
    description:
      "A variety of fresh, organic, and seasonal fruits and vegetables, carefully sourced to ensure maximum nutrition and freshness.",
  },
  {
    name: "Dairy & Eggs",
    description:
      "A selection of fresh milk, yogurt, cheese, and eggs, sourced from trusted farms to guarantee quality and taste.",
  },
  {
    name: "Meat & Seafood",
    description:
      "Premium cuts of chicken, beef, lamb, and fresh seafood, including fish, shrimp, and shellfish, for a protein-rich diet.",
  },
  {
    name: "Fast Food & Snacks",
    description:
      "Quick, tasty, and satisfying fast food options, including burgers, fries, fried chicken, and crispy snacks for any craving.",
  },
  {
    name: "Frozen Foods",
    description:
      "Convenient and ready-to-eat frozen meals, pizzas, and desserts, perfect for quick meal preparations and sweet treats.",
  },
  {
    name: "Beverages",
    description:
      "Refreshing juices, soft drinks, coffee, tea, and energy drinks to keep you hydrated and energized throughout the day.",
  },
  {
    name: "Grains & Pulses",
    description:
      "Nutritious staples like rice, lentils, quinoa, and oats, perfect for preparing wholesome meals rich in fiber and protein.",
  },
  {
    name: "Condiments & Sauces",
    description:
      "Flavor-enhancing sauces, seasonings, and spreads, including ketchup, mayonnaise, and dressings to elevate any dish.",
  },
  {
    name: "Healthy & Organic Foods",
    description:
      "A variety of organic, gluten-free, and superfood options, catering to health-conscious and diet-specific needs.",
  },
];

async function main() {
  console.log("Seeding categories...");

  for (const category of categories) {
    await prisma.category.createMany({
      data: {
        name: category.name,
        description: category.description,
      },
      skipDuplicates: true,
    });
  }

  console.log("Seeding completed.");
}

main()
  .then(() => {
    console.log("Seeding successful.");
  })
  .catch((e) => {
    console.error("Seeding failed with error:", e);
  })
  .finally(() => {
    console.log("Closing database connection...");
  });

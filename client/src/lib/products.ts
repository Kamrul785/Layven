import blueSweatshirt from "@assets/generated_images/powder_blue_sweatshirt_product_shot.png";
import charcoalSweatshirt from "@assets/generated_images/charcoal_sweatshirt_product_shot.png";
import beigeSweatshirt from "@assets/generated_images/beige_sweatshirt_product_shot.png";

export interface Product {
  id: number;
  name: string;
  color: string;
  price: number;
  image: string;
  description: string;
  sizes: string[];
}

export const products: Product[] = [
  { 
    id: 1, 
    name: "Samurai Hoodie", 
    color: "Powder Blue", 
    price: 85, 
    image: blueSweatshirt,
    description: "Heavyweight french terry cotton. Oversized fit inspired by traditional Japanese silhouettes. Features reinforced stitching and a raw hem.",
    sizes: ["M", "L", "XL"] 
  },
  { 
    id: 2, 
    name: "Ronin Sweatshirt", 
    color: "Charcoal", 
    price: 75, 
    image: charcoalSweatshirt,
    description: "The wanderer's essential. Stone-washed charcoal finish for a lived-in feel. Drop shoulder construction for unrestricted movement.",
    sizes: ["M", "L", "XL"] 
  },
  { 
    id: 3, 
    name: "Dojo Crewneck", 
    color: "Beige", 
    price: 75, 
    image: beigeSweatshirt,
    description: "Minimalist warmth. Crafted from premium organic cotton blend. The neutral tone embodies the calm before the strike.",
    sizes: ["M", "L", "XL"] 
  },
  { 
    id: 4, 
    name: "Katana Hoodie", 
    color: "Powder Blue", 
    price: 85, 
    image: blueSweatshirt,
    description: "Sharp lines and soft fabric. A staple piece for the modern warrior.",
    sizes: ["M", "L", "XL"] 
  },
  { 
    id: 5, 
    name: "Bushido Sweatshirt", 
    color: "Charcoal", 
    price: 75, 
    image: charcoalSweatshirt,
    description: "Embodying the code. Dark, resilient, and enduring.",
    sizes: ["M", "L", "XL"] 
  },
  { 
    id: 6, 
    name: "Zen Pullover", 
    color: "Beige", 
    price: 75, 
    image: beigeSweatshirt,
    description: "Simplicity is the ultimate sophistication. Clean lines, perfect fit.",
    sizes: ["M", "L", "XL"] 
  },
];

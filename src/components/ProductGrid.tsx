"use client";

import { useState } from "react";
import { products, type Product } from "../data/site";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import CrystalWave from "./CrystalWave";
import Reveal from "./Reveal";

export default function ProductGrid() {
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <>
      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <Reveal key={product.id} delay={i * 130} className="h-full">
            <ProductCard product={product} index={i} onQuickView={setSelected} />
          </Reveal>
        ))}

        <Reveal delay={products.length * 130} className="h-full sm:col-span-2 lg:col-span-3">
          <CrystalWave />
        </Reveal>
      </div>

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

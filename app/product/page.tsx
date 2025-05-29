'use client';

import React, { useEffect, useState } from 'react';

type Product = {
  product_id: number;
  name: string;
  description: string;
  price: number;
  // เพิ่มตาม model ที่มี
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/product')  // เรียก API route ของเรา
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Product List</h1>
      {products.map((p) => (
        <div key={p.product_id}>
          <h2>{p.name}</h2>
          <p>{p.description}</p>
          <p>Price: {p.price}</p>
        </div>
      ))}
    </div>
  );
}

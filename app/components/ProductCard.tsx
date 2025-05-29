'use client';

import Image from 'next/image';

export default function ProductCard({ product }: { product: any }) {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="relative w-full h-40">
        <Image
          src={product.image || '/images/placeholder.png'}
          alt={product.name}
          fill
          className="object-cover rounded"
        />
      </div>
      <h3 className="mt-2 font-semibold text-lg truncate">{product.name}</h3>
      <p className="text-sm text-gray-500">฿{product.price}</p>
    </div>
  );
}

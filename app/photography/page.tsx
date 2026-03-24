"use client"; // Wajib karena ada interaksi klik

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { getOptimizedImageUrl } from '@/lib/supabase-image';

export default function PhotographyPage() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [finalPhotos, setFinalPhotos] = useState<any[]>([]);

  // 1. Ambil data dari Supabase saat halaman di-load
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('photography').select('*');
      if (data) {
        // Logika Pengelompokan & Shuffle (Sama seperti sebelumnya)
        const pool3 = data.filter(p => p.layout_type === 3);
        const pool2 = data.filter(p => p.layout_type === 2);
        const pool1 = data.filter(p => p.layout_type === 1);

        const rows: any[][] = [];
        for (let i = 0; i + 2 < pool3.length; i += 3) rows.push([pool3[i], pool3[i+1], pool3[i+2]]);
        for (let i = 0; i + 1 < pool2.length; i += 2) rows.push([pool2[i], pool2[i+1]]);
        for (let i = 0; i < pool1.length; i++) rows.push([pool1[i]]);

        // Shuffle
        for (let i = rows.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [rows[i], rows[j]] = [rows[j], rows[i]];
        }
        setFinalPhotos(rows.flat());
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto pt-20 pb-16 px-10 min-h-screen flex flex-col items-center bg-white text-black">
      
      <h1 className="text-[40px] font-[300] tracking-[0.15em] mb-12 uppercase text-center">
        PHOTOGRAPHY
      </h1>

      {/* Grid Utama */}
      <div className="grid grid-cols-6 gap-3 mb-24 w-full">
        {finalPhotos.map((photo, index) => {
          let colSpan = "col-span-6"; 
          let aspect = "aspect-[16/9]"; 

          if (photo.layout_type === 2) { colSpan = "col-span-3"; aspect = "aspect-square"; }
          if (photo.layout_type === 3) { colSpan = "col-span-2"; aspect = "aspect-square"; }

          const optimizedSrc = getOptimizedImageUrl(photo.image_url, 1200, 80);

          return (
            <div 
              key={`${photo.id}-${index}`} 
              className={`relative w-full ${colSpan} ${aspect} bg-gray-100 group overflow-hidden cursor-zoom-in`}
              onClick={() => setSelectedImage(photo.image_url)} // KLIK UNTUK ZOOM
            >
              {optimizedSrc && (
                <Image 
                  src={optimizedSrc} 
                  alt={photo.title || "Photography"} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* --- LIGHTBOX MODAL (EFEK ZOOM) --- */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-4 md:p-10 cursor-zoom-out animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)} // KLIK DI MANA SAJA UNTUK TUTUP
        >
          <div className="relative w-full h-full max-w-5xl max-h-[85vh]">
            <Image 
              src={selectedImage} 
              alt="Zoomed Photography"
              fill
              className="object-contain" // Contain agar gambar tidak terpotong saat zoom
              priority
            />
          </div>
          {/* Tombol Close (X) */}
          <button className="absolute top-10 right-10 text-white text-4xl font-light hover:text-gray-400 transition-colors">
            &times;
          </button>
        </div>
      )}

      <div className="mt-auto text-center w-full">
        <Link href="#top" className="text-[#999999] font-[300] hover:text-black transition-colors flex items-center justify-center gap-2 text-[15px]">
          <span>↑</span> Back to Top
        </Link>
      </div>
    </div>
  );
}
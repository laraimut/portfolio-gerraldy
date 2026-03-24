import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase'; // Pastikan path ini sesuai dengan file supabase.ts kamu

export const metadata: Metadata = {
  title: 'Photography - Gerraldy Parikesit',
  description: 'Photography portfolio by Gerraldy Parikesit.',
};

export default async function PhotographyPage() {
  // 1. Ambil data foto dari tabel 'photography' di Supabase
  const { data: photos, error } = await supabase
    .from('photography')
    .select('*')
    .order('created_at', { ascending: false }); // Foto terbaru di atas

  if (error) {
    console.error('Error fetching photography data:', error);
  }

  // Jika data kosong, gunakan array kosong
  const photoGallery = photos || [];

  return (
    <div className="max-w-6xl mx-auto pt-20 pb-16 px-10 min-h-screen flex flex-col items-center bg-white text-black">

      {/* Judul */}
      <h1 className="text-[40px] font-[300] tracking-[0.15em] mb-12 uppercase text-center">
        PHOTOGRAPHY
      </h1>

      {/* Grid Foto (2 Kolom dengan gap kecil) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-24 w-full">
        {photoGallery.map((photo) => (
          <div key={photo.id} className="relative w-full aspect-[3/2] bg-gray-100 group overflow-hidden">
            {photo.image_url && (
              <Image 
                src={photo.image_url} 
                alt={photo.title || "Photography Work"} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            )}
          </div>
        ))}
      </div>

      {/* Pesan jika galeri kosong */}
      {photoGallery.length === 0 && (
        <p className="text-gray-400 font-[300] mb-20">No photos added yet.</p>
      )}

      {/* Tombol Back to Top */}
      <div className="mt-auto text-center w-full">
        <Link href="#top" className="text-[#999999] font-[300] hover:text-black transition-colors flex items-center justify-center gap-2 text-[15px]">
          <span>↑</span> Back to Top
        </Link>
      </div>

    </div>
  );
}
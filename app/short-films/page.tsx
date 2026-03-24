import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase'; // Panggil klien Supabase

export const metadata: Metadata = {
  title: 'Short Films - Gerraldy Parikesit',
  description: 'A collection of short films directed by Gerraldy Parikesit.',
};

export default async function ShortFilmsPage() {
  // 1. Fetch data dari tabel short_films di Supabase
  const { data: films, error } = await supabase
    .from('short_films')
    .select('*')
    .order('created_at', { ascending: true }); // Ubah ke false jika ingin yang terbaru di atas

  if (error) {
    console.error('Error fetching short films:', error);
  }

  // Jika data kosong, berikan array kosong sebagai fallback
  const shortFilms = films || [];

  return (
    <div className="flex-1 overflow-y-auto bg-white text-black min-h-screen">
      <div className="pt-20 pb-16 px-10">
        
        {/* Grid 2 Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {shortFilms.map((film) => {
            // A. Ambil tahun dari kolom created_at (Contoh: "2024")
            const releaseYear = new Date(film.created_at).getFullYear().toString();
            
            // B. Gunakan screenshot pertama sebagai thumbnail, jika tidak ada pakai poster
            const thumbnailSrc = (film.photos && film.photos.length > 0) 
              ? film.photos[0] 
              : (film.poster_url || '');

            return (
              <Link 
                key={film.id} 
                href={`/short-film/${film.slug}`} 
                className="relative group overflow-hidden aspect-[16/9] block bg-gray-100"
              >
                {/* Pastikan thumbnailSrc ada isinya sebelum render Image */}
                {thumbnailSrc && (
                  <Image 
                    src={thumbnailSrc} 
                    alt={film.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                )}
                
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6 gap-1.5">
                  <span className="font-[300] text-[16px] text-white tracking-[0.2em]">
                    {releaseYear}
                  </span>
                  <h2 className="font-[800] text-[32px] text-white tracking-[0.3em] uppercase leading-tight">
                    {film.title}
                  </h2>
                </div>
              </Link>
            );
          })}

        </div>

        {/* State Kosong (Jika belum ada data di Supabase) */}
        {shortFilms.length === 0 && (
          <div className="text-center py-20 text-gray-400 font-[300]">
            Belum ada film yang ditambahkan.
          </div>
        )}

        <div className="mt-20 text-center">
          <Link href="#top" className="text-[#999999] font-[300] hover:text-black transition-colors flex items-center justify-center gap-2 text-[15px]">
            <span>↑</span> Back to Top
          </Link>
        </div>

      </div>
    </div>
  );
}
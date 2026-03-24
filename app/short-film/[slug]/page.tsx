import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase'; // Import jembatan Supabase

export default async function ShortFilmDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // 1. Ambil data film dari Supabase berdasarkan slug
  const { data: film, error } = await supabase
    .from('short_films')
    .select('*')
    .eq('slug', slug)
    .single(); // Mengambil satu data saja

  // 2. Jika data tidak ditemukan atau error, tampilkan 404
  if (error || !film) {
    notFound();
  }

  // Helper untuk memisahkan teks credits yang dipisah enter (\n) menjadi array
  const creditsList = film.credits ? film.credits.split('\n') : [];
  
  // 3. Ambil array screenshot dari kolom 'photos', batasi maksimal 10
  const screenshots = film.photos ? film.photos.slice(0, 10) : [];

  return (
    <div className="max-w-4xl mx-auto pt-20 pb-16 px-10 min-h-screen flex flex-col items-center bg-white text-black">
      
      {/* 1. Judul */}
      <h1 className="text-[40px] font-[300] tracking-[0.15em] mb-12 uppercase text-center">
        {film.title}
      </h1>

      {/* 2. Summary */}
      <p className="text-center text-[16px] font-[300] leading-relaxed mb-16 max-w-2xl">
        {film.summary}
      </p>

      {/* 3. Poster */}
      {film.poster_url && (
        <div className="relative w-[320px] h-[450px] mb-16 bg-gray-100">
          <Image
            src={film.poster_url}
            alt={`${film.title} Poster`}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* 4. Credits */}
      <div className="flex flex-col gap-4 text-center text-[15px] font-[300] mb-16">
        {creditsList.map((credit: string, index: number) => (
          <p key={index}>{credit}</p>
        ))}
      </div>

      {/* 5. Accolades */}
      {film.accolades && (
        <p className="text-center text-[15px] font-[300] mb-20 italic text-gray-600">
          {film.accolades}
        </p>
      )}

      {/* 6. Screenshots Gallery (Semua berjejer ke bawah, maks 10) */}
      {screenshots.length > 0 && (
        <div className="w-full flex flex-col gap-10 mb-24 items-center">
          {screenshots.map((photoUrl: string, index: number) => (
            // Menggunakan aspect-video (16:9) agar sinematik
            <div key={index} className="relative w-full aspect-video bg-gray-100 overflow-hidden">
              <Image 
                src={photoUrl} 
                alt={`${film.title} scene ${index + 1}`} 
                fill 
                className="object-cover" 
              />
            </div>
          ))}
        </div>
      )}

      {/* 7. Tombol Back to Top */}
      <div className="mt-auto text-center w-full">
        <Link href="#top" className="text-[#999999] font-[300] hover:text-black transition-colors flex items-center justify-center gap-2 text-[15px]">
          <span>↑</span> Back to Top
        </Link>
      </div>

    </div>
  );
}
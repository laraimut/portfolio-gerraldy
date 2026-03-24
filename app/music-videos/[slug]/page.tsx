import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase'; // Import jembatan Supabase

export default async function MusicVideoDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // 1. Ambil data MV dari Supabase berdasarkan slug
  const { data: mv, error } = await supabase
    .from('music_videos')
    .select('*')
    .eq('slug', slug)
    .single();

  // 2. Jika tidak ditemukan, tampilkan 404
  if (error || !mv) {
    notFound();
  }

  // 3. Ambil array foto, batasi maksimal 10 seperti permintaan sebelumnya
  const photos = mv.photos ? mv.photos.slice(0, 10) : [];

  return (
    <div className="max-w-4xl mx-auto pt-20 pb-16 px-10 min-h-screen flex flex-col items-center bg-white text-black">
      
      {/* 1. Judul */}
      <h1 className="text-[40px] font-[300] tracking-[0.15em] mb-12 uppercase text-center">
        {mv.title}
      </h1>

      {/* 2. Deskripsi */}
      <p className="text-center text-[16px] font-[300] leading-relaxed mb-16 max-w-2xl">
        {mv.description}
      </p>

      {/* 3. Galeri Foto (Memanjang ke bawah) */}
      <div className="w-full flex flex-col gap-10 mb-24 items-center">
        {photos.map((photoUrl: string, index: number) => (
          <div key={index} className="relative w-full aspect-video bg-gray-100 overflow-hidden">
            <Image 
              src={photoUrl} 
              alt={`${mv.title} scene ${index + 1}`} 
              fill 
              className="object-cover" 
            />
          </div>
        ))}
      </div>

      {/* Tombol Back to Top */}
      <div className="mt-auto text-center w-full">
        <Link href="#top" className="text-[#999999] font-[300] hover:text-black transition-colors flex items-center justify-center gap-2 text-[15px]">
          <span>↑</span> Back to Top
        </Link>
      </div>

    </div>
  );
}
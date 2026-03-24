import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase'; // Import jembatan Supabase

export const metadata: Metadata = {
  title: 'Music Videos - Gerraldy Parikesit',
  description: 'Music videos directed by Gerraldy Parikesit.',
};

export default async function MusicVideosPage() {
  // 1. Fetch data dari tabel music_videos di Supabase
  const { data: videos, error } = await supabase
    .from('music_videos')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching music videos:', error);
  }

  const musicVideos = videos || [];

  return (
    <div className="flex-1 overflow-y-auto bg-white text-black min-h-screen">
      <div className="pt-20 pb-16 px-10">
        
        {/* Grid 2 Kolom dengan aspect-square */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {musicVideos.map((mv) => {
            // Ambil gambar pertama dari array photos sebagai thumbnail
            const thumbnailSrc = (mv.photos && mv.photos.length > 0) ? mv.photos[0] : '';

            return (
              <Link 
                key={mv.id} 
                href={`/music-videos/${mv.slug}`} 
                className="relative group overflow-hidden aspect-square block bg-gray-100"
              >
                {thumbnailSrc && (
                  <Image 
                    src={thumbnailSrc} 
                    alt={mv.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                )}
                
                {/* Overlay Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-center p-6">
                  <h2 className="font-[800] text-[24px] text-white tracking-[0.2em] uppercase leading-tight">
                    {mv.title}
                  </h2>
                </div>
              </Link>
            );
          })}
        </div>

        {/* State Kosong */}
        {musicVideos.length === 0 && (
          <div className="text-center py-20 text-gray-400 font-[300]">
            Belum ada music video yang ditambahkan.
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
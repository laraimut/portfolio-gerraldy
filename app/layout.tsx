import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { supabase } from '@/lib/supabase'; // Memanggil jembatan Supabase

const jost = Jost({ 
  subsets: ['latin'],
  weight: ['300', '400', '700', '800']
});

export const metadata: Metadata = {
  title: 'Gerraldy Parikesit',
  description: 'Film director and photographer portfolio.',
};

// Fungsi dinamis mengambil data dari Supabase
async function getShortFilmsMenu() {
  const { data } = await supabase
    .from('short_films')
    .select('title, slug')
    .order('created_at', { ascending: true }); // Mengurutkan dari yang terlama ke terbaru (atau ganti false)
  return data || [];
}

async function getMusicVideosMenu() {
  const { data } = await supabase
    .from('music_videos')
    .select('title, slug')
    .order('created_at', { ascending: true });
  return data || [];
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Menjalankan pengambilan data
  const shortFilms = await getShortFilmsMenu();
  const musicVideos = await getMusicVideosMenu();

  return (
    <html lang="en">
      <body className={`${jost.className} bg-white text-black antialiased flex min-h-screen`}>
        
        {/* SIDEBAR */}
        <aside className="w-[300px] h-screen sticky top-0 flex flex-col items-center py-16 overflow-y-auto shrink-0 bg-white">
          
          <Link href="/" className="font-[800] text-[28px] text-center leading-[1.1] tracking-wide mb-16 uppercase text-black">
            GERRALDY<br />PARIKESIT
          </Link>

          <nav className="flex flex-col items-center text-center w-full text-black">
            
            <Link href="/about" className="font-bold mb-6 text-[15px] hover:text-gray-400 transition-colors">About</Link>
            <Link href="/contact" className="font-bold mb-12 text-[15px] hover:text-gray-400 transition-colors">Contact</Link>

            {/* Short Film Submenu (Dinamis dari Supabase) */}
            <h2 className="font-bold uppercase tracking-wider text-[15px] mb-5">
              <Link href="/short-films" className="hover:text-gray-400 transition-colors">SHORT FILM</Link>
            </h2>
            <div className="flex flex-col gap-3 mb-12">
              {shortFilms.length > 0 ? (
                shortFilms.map((film) => (
                  <Link 
                    key={film.slug} 
                    href={`/short-film/${film.slug}`} 
                    className="font-[300] text-[16px] hover:text-gray-400 transition-colors"
                  >
                    {film.title}
                  </Link>
                ))
              ) : (
                <span className="text-gray-300 text-sm font-light">Belum ada film</span>
              )}
            </div>

            {/* Music Videos Submenu (Dinamis dari Supabase) */}
            <h2 className="font-bold uppercase tracking-wider text-[15px] mb-5">
              <Link href="/music-videos" className="hover:text-gray-400 transition-colors">MUSIC VIDEOS</Link>
            </h2>
            <div className="flex flex-col gap-3 mb-12">
              {musicVideos.length > 0 ? (
                musicVideos.map((mv) => (
                  <Link 
                    key={mv.slug} 
                    href={`/music-videos/${mv.slug}`} 
                    className="font-[300] text-[16px] hover:text-gray-400 transition-colors"
                  >
                    {mv.title}
                  </Link>
                ))
              ) : (
                <span className="text-gray-300 text-sm font-light">Belum ada video</span>
              )}
            </div>

            <Link href="/photography" className="font-bold uppercase tracking-wider text-[15px] hover:text-gray-400 transition-colors">
              PHOTOGRAPHY
            </Link>

          </nav>
        </aside>

        {/* AREA KONTEN UTAMA */}
        <main id="top" className="flex-1 overflow-y-auto relative bg-white">
          {children}
        </main>

      </body>
    </html>
  );
}
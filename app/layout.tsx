import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const jost = Jost({ 
  subsets: ['latin'],
  weight: ['300', '400', '700', '800']
});

export const metadata: Metadata = {
  title: 'Gerraldy Parikesit',
  description: 'Film director and photographer portfolio.',
};

// Fungsi fetch dipindah ke luar agar rapi
async function getMenuData() {
  const [films, vids] = await Promise.all([
    supabase.from('short_films').select('title, slug').order('created_at', { ascending: true }),
    supabase.from('music_videos').select('title, slug').order('created_at', { ascending: true })
  ]);
  return {
    shortFilms: films.data || [],
    musicVideos: vids.data || []
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { shortFilms, musicVideos } = await getMenuData();

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${jost.className} bg-white text-black antialiased flex min-h-screen`}>
        
        {/* SIDEBAR */}
        <aside className="w-[300px] h-screen sticky top-0 flex flex-col items-center py-16 overflow-y-auto shrink-0 bg-white border-r border-gray-50">
          
          {/* Logo / Home Link - Diarahkan ke / (home) bukan /about agar lebih umum */}
          <Link href="/" className="font-[800] text-[28px] text-center leading-[1.1] tracking-wide mb-16 uppercase text-black hover:opacity-70 transition-opacity">
            GERRALDY<br />PARIKESIT
          </Link>

          <nav className="flex flex-col items-center text-center w-full text-black px-4">
            
            <Link href="/" className="font-bold mb-6 text-[15px] hover:text-gray-400 transition-colors">About</Link>
            <Link href="/contact" className="font-bold mb-12 text-[15px] hover:text-gray-400 transition-colors">Contact</Link>

            {/* Short Film Submenu */}
            <h2 className="font-bold uppercase tracking-wider text-[15px] mb-5">
              <Link href="/short-films" className="hover:text-gray-400 transition-colors">SHORT FILM</Link>
            </h2>
            <div className="flex flex-col gap-3 mb-12">
              {shortFilms.map((film) => (
                <Link 
                  key={film.slug} 
                  href={`/short-film/${film.slug}`} 
                  className="font-[300] text-[16px] hover:text-gray-400 transition-colors"
                >
                  {film.title}
                </Link>
              ))}
            </div>

            {/* Music Videos Submenu */}
            <h2 className="font-bold uppercase tracking-wider text-[15px] mb-5">
              <Link href="/music-videos" className="hover:text-gray-400 transition-colors">MUSIC VIDEOS</Link>
            </h2>
            <div className="flex flex-col gap-3 mb-12">
              {musicVideos.map((mv) => (
                <Link 
                  key={mv.slug} 
                  href={`/music-videos/${mv.slug}`} 
                  className="font-[300] text-[16px] hover:text-gray-400 transition-colors"
                >
                  {mv.title}
                </Link>
              ))}
            </div>

            <Link href="/photography" className="font-bold uppercase tracking-wider text-[15px] hover:text-gray-400 transition-colors">
              PHOTOGRAPHY
            </Link>

          </nav>
        </aside>

        {/* AREA KONTEN UTAMA */}
        <main className="flex-1 relative bg-white">
          {children}
        </main>

      </body>
    </html>
  );
}
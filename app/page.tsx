import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

// 1. Tambahkan Metadata agar SEO web kamu bagus saat muncul di Google
export const metadata: Metadata = {
  title: "Gerraldy Parikesit | Filmmaker & Photographer",
  description: "Official portfolio of Gerraldy Parikesit, a filmmaker and visual storyteller.",
};

export default function Home() {
  return (
    // ID "top" agar tombol Back to Top berfungsi
    <div id="top" className="max-w-6xl mx-auto pt-20 pb-16 px-10 min-h-screen flex flex-col items-center bg-white text-black">

      {/* 2. Judul Utama (Bisa diganti WELCOME atau tetap nama kamu) */}
      <h1 className="text-[40px] font-[300] tracking-[0.15em] mb-12 uppercase text-center">
        ABOUT
      </h1>

      {/* 3. Foto Profil Utama */}
      <div className="flex justify-center w-full mb-20">
        <div className="w-[380px] h-[550px] relative bg-gray-100 overflow-hidden shadow-sm">
          <Image
            src="https://vpksinruqmdyarwjcxzl.supabase.co/storage/v1/object/public/portfolio/about/POST%20GERRALDY%201.jpg"
            alt="Portrait of Gerraldy Parikesit"
            fill
            className="object-cover grayscale hover:grayscale-0 transition duration-700"
            priority 
          />
        </div>
      </div>

      {/* 4. Teks Biografi */}
      <div className="max-w-4xl mx-auto mb-20 text-center">
        <p className="text-[17px] font-[300] leading-[2.2] text-[#111111]">
          Gerraldy Parikesit is a filmmaker and visual storyteller whose work spans narrative films, music videos, and photography. 
          A Film graduate from BINUS University, his films have been screened at festivals such as the 100% Manusia Film Festival. 
          Drawn to cinema as an emotional medium, he approaches filmmaking with a focus on feeling, atmosphere, and visual language, 
          while also maintaining a strong interest in photography and visual art more broadly.
          A Fan of art in many forms, he explores different mediums with curiosity as part of developing his voice.
          He also has experience working in art department in short films and commercial.
          He previously interned at Europe on Screen 2024, and to date has directed four short films and one music video.
        </p>
      </div>

      {/* 5. Tombol Back to Top */}
      <div className="mt-auto text-center">
        <Link href="#top" className="text-[#999999] font-[300] hover:text-black transition-colors flex items-center justify-center gap-2 text-[15px]">
          <span>↑</span> Back to Top
        </Link>
      </div>

    </div>
  );
}
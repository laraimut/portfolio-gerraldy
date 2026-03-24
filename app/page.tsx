import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto pt-20 pb-16 px-10 min-h-screen flex flex-col bg-white text-black">
      
      {/* Judul ABOUT */}
      <h1 className="text-[40px] font-[300] text-center tracking-[0.15em] mb-12">
        ABOUT
      </h1>

            {/* Grid Foto */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-10 mb-24">
        <div className="w-[340px] h-[450px] relative bg-gray-100">
          <Image
            src="https://vpksinruqmdyarwjcxzl.supabase.co/storage/v1/object/public/portfolio/about/cropped-8efd3a65-952d-455a-ae8b-a8e32f6666dc.jpg"
            alt="Portrait of Gerraldy"
            fill
            className="object-cover grayscale hover:grayscale-0 transition duration-500" // Tambahan efek hitam-putih seperti gambarmu
          />
        </div>
        <div className="w-[340px] h-[450px] relative bg-gray-100">
          <Image
            src="https://vpksinruqmdyarwjcxzl.supabase.co/storage/v1/object/public/portfolio/about/Cassssspture.PNG"
            alt="Behind the scenes"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Teks Biografi (Sama persis dengan line-height yang lega) */}
      <p className="text-center text-[17px] font-[300] leading-[2] mb-20 max-w-4xl mx-auto text-[#111111]">
      Gerraldy Parikesit is a filmmaker and visual storyteller whose work spans narrative films, music videos, and photography. A Film graduate from BINUS University, his films have been screened at festivals such as the 100% Manusia Film Festival. Drawn to cinema as an emotional medium, he approaches filmmaking with a focus on feeling, atmosphere, and visual language, while also maintaining a strong interest in photography and visual art more broadly. A fan of art in many forms, he explores different mediums with curiosity as part of developing his voice. He also has experience working in art department in short films and commercial. He previously interned at Europe on Screen 2024, and to date has directed four short films and one music video.
      </p>



      {/* Tombol Back to Top */}
      <div className="mt-auto text-center">
        <Link href="#top" className="text-[#999999] font-[300] hover:text-black transition-colors flex items-center justify-center gap-2 text-[15px]">
          <span>↑</span> Back to Top
        </Link>
      </div>

    </div>
  );
}
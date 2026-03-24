import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto pt-20 pb-16 px-10 min-h-screen flex flex-col bg-white text-black">
      
      {/* Judul CONTACT */}
      <h1 className="text-[40px] font-[300] text-center tracking-[0.15em] mb-12">
        CONTACT
      </h1>

      {/* Info Kontak Teks */}
      <div className="text-center text-[20px] font-[300] leading-[1.6] mb-16 text-black">
        <p>+62 82126286629</p>
        <p>gerraldy17@gmail.com</p>
        <p>@___gerraldy___</p>
      </div>

      {/* Formulir Kontak */}
      <form className="w-full max-w-lg mx-auto flex flex-col gap-6 mb-24">
        
        {/* Input Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-[14px] font-[700] text-black">
            Name *
          </label>
          <input 
            type="text" 
            id="name" 
            placeholder="Your Name..." 
            className="border border-gray-300 rounded-[3px] px-4 py-3 text-[15px] font-[300] placeholder:text-gray-400 focus:outline-none focus:border-gray-500 transition-colors"
            required
          />
        </div>

        {/* Input Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-[14px] font-[700] text-black">
            Email Address *
          </label>
          <input 
            type="email" 
            id="email" 
            placeholder="Your Email Address..." 
            className="border border-gray-300 rounded-[3px] px-4 py-3 text-[15px] font-[300] placeholder:text-gray-400 focus:outline-none focus:border-gray-500 transition-colors"
            required
          />
        </div>

        {/* Input Message */}
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-[14px] font-[700] text-black">
            Message *
          </label>
          <textarea 
            id="message" 
            rows={5}
            placeholder="Your Message..." 
            className="border border-gray-300 rounded-[3px] px-4 py-3 text-[15px] font-[300] placeholder:text-gray-400 focus:outline-none focus:border-gray-500 transition-colors resize-y"
            required
          ></textarea>
        </div>

        {/* Tombol Submit */}
        <div className="mt-2">
          <button 
            type="submit" 
            className="border border-gray-400 text-black font-[700] text-[15px] px-8 py-2.5 rounded-[3px] hover:bg-gray-100 transition-colors"
          >
            Submit
          </button>
        </div>

      </form>

      {/* Tombol Back to Top */}
      <div className="mt-auto text-center">
        <Link href="#top" className="text-[#999999] font-[300] hover:text-black transition-colors flex items-center justify-center gap-2 text-[15px]">
          <span>↑</span> Back to Top
        </Link>
      </div>

    </div>
  );
}
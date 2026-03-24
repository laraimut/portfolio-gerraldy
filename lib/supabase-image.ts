// lib/supabase-image.ts

/**
 * Fungsi untuk mendapatkan URL gambar yang sudah dioptimasi dari Supabase Storage.
 * @param fullUrl URL asli dari Supabase Storage
 * @param width Lebar gambar yang diinginkan (default 1200)
 * @param quality Kualitas gambar 1-100 (default 75)
 */
 export function getOptimizedImageUrl(fullUrl: string | null, width = 1200, quality = 75) {
    if (!fullUrl) return null;
  
    // Pastikan URL berasal dari Supabase Storage kamu
    if (!fullUrl.includes('vpksinruqmdyarwjcxzl.supabase.co')) {
      return fullUrl; // Jika bukan dari Supabase, kembalikan URL asli
    }
  
    // Trik Supabase: Tambahkan query parameter untuk resize
    // Contoh: https://xyz.supabase.co/storage/v1/object/public/bucket/image.jpg
    // Menjadi: https://xyz.supabase.co/storage/v1/render/image/public/bucket/image.jpg?width=1200&quality=75
    
    const optimizedUrl = fullUrl
      .replace('/object/public/', '/render/image/public/') + `?width=${width}&quality=${quality}`;
  
    return optimizedUrl;
  }
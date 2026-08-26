// FASE 6 - REFACTORING (API.JS)
export async function ambilKutipan() { const response = await fetch( "https://dummyjson.com/quotes/random");
    if (!response.ok) { throw new Error("Kutipan gagal dimuat.") }
    return await response.json(); }
export async function ambilCuaca(kota, apiKey) {
    const url = "https://api.openweathermap.org/data/2.5/weather" + "?q=" + encodeURIComponent(kota) + "&appid=" + apiKey + "&units=metric" + "&lang=id";
    const response = await fetch(url);
    if (!response.ok) { throw new Error("Kota tidak ditemukan."); }
    return await response.json();}
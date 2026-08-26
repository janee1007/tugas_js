// FASE 6 - REFACTORING (storage.js)
export function simpanTugas(daftarTugas){ localStorage.setItem("dailyboard_tugas", JSON.stringify(daftarTugas));}
export function muatTugas(){ const data=localStorage.getItem("dailyboard_tugas");
    if(!data){return [];}
    try{ return JSON.parse(data);}catch(error){return []; }}
export function simpanCatatan(daftarCatatan){ localStorage.setItem("dailyboard_catatan",JSON.stringify(daftarCatatan));}
export function muatCatatan(){ const data=localStorage.getItem("dailyboard_catatan");
    if(!data){ return [];}
    try{return JSON.parse(data);}catch(error){return [];}}
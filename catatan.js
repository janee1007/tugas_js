// FASE 6 - REFACTORING (catatan.js)
export function tambahCatatan(daftarCatatan, isi){ return [ ...daftarCatatan,
        { id:Date.now(), isi:isi, tanggal:new Date().toLocaleDateString("id-ID") } ]; }
export function hapusCatatan(daftarCatatan, id){ return daftarCatatan.filter(function(catatan){ return catatan.id!==id; });}
export function editCatatan(daftarCatatan, id, isiBaru){ return daftarCatatan.map(function(catatan){
        if(catatan.id===id){ return { ...catatan, isi:isiBaru };}
     return catatan;
    });}
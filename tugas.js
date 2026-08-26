// FASE 6 - REFACTORING (tugas.js)
export function buatTugas(nama, id) {
    return {id: id,nama: nama, selesai: false };}
export function tambahTugas(daftarTugas, nama, nextId) {const tugasBaru = buatTugas(nama, nextId);
return [ ...daftarTugas, tugasBaru];}
export function hapusTugas(daftarTugas, id) {
    return daftarTugas.filter(function(tugas) { return tugas.id !== id; });}
export function toggleSelesai(daftarTugas, id) {
    return daftarTugas.map(function(tugas) { if (tugas.id === id) {
    return { ...tugas,selesai: !tugas.selesai};}
    return tugas;});}
export function editTugas(daftarTugas, id, namaBaru) {
    return daftarTugas.map(function(tugas) {
   if (tugas.id === id) {
   return {...tugas, nama: namaBaru}; }
  return tugas;});}
import { buatTugas,hapusTugas as hapusTugasModule,toggleSelesai as toggleSelesaiModule,editTugas as editTugasModule } from "./tugas.js";
import { ambilKutipan as ambilKutipanAPI,ambilCuaca as ambilCuacaAPI } from "./api.js";
import { tambahCatatan as tambahCatatanModule,hapusCatatan as hapusCatatanModule,editCatatan as editCatatanModule } from "./catatan.js";
import { simpanTugas,muatTugas,simpanCatatan,muatCatatan } from "./storage.js";

// MINGGU 1 - SETUP PROJECT
console.log("DailyBoard dimulai.");

// MINGGU 2 - SELEKSI & MANIPULASI DOM
const app=document.getElementById("app");
const barisAtas=document.createElement("div");
barisAtas.className="baris-atas";

const sectionTugas=document.createElement("section");
const sectionCatatan=document.createElement("section");
const sectionCuaca=document.createElement("section");

sectionTugas.className="dashboard-section";
sectionCatatan.className="dashboard-section";
sectionCuaca.className="dashboard-section";

sectionTugas.innerHTML="<h2>📜 tugas hari ini</h2>";
sectionCatatan.innerHTML="<h2>📚 catatan singkat</h2>";
sectionCuaca.innerHTML="<h2>🌤 cuaca hari ini</h2>";

barisAtas.appendChild(sectionTugas);
barisAtas.appendChild(sectionCatatan);
app.appendChild(barisAtas);
app.appendChild(sectionCuaca);

// MINGGU 3 - EVENT HANDLING
const inputTugas=document.createElement("input");
inputTugas.placeholder="masukkan tugas baru...";

const tombolTambah=document.createElement("button");
tombolTambah.textContent="Tambah";

sectionTugas.appendChild(inputTugas);
sectionTugas.appendChild(tombolTambah);

// MINGGU 4 - MENAMPILKAN DAFTAR TUGAS
const inputCari=document.createElement("input");
inputCari.id="cari-tugas";
inputCari.placeholder="🔎 cari tugas...";

const filterBox=document.createElement("div");
const daftarTugasHTML=document.createElement("ul");
daftarTugasHTML.id="daftar-tugas";

sectionTugas.appendChild(inputCari);
sectionTugas.appendChild(filterBox);
sectionTugas.appendChild(daftarTugasHTML);

let daftarTugas=[];
let nextId=1;
let filterAktif="semua";
let kataKunci="";

// MINGGU 5 - TAMBAH & HAPUS TUGAS
function tambahTugas(nama){
    const tugasBaru=buatTugas(nama,nextId);
    daftarTugas=[...daftarTugas,tugasBaru];
    nextId++;
    simpanTugas(daftarTugas);
    renderTugas();
}

tombolTambah.addEventListener("click",function(){
    const nama=inputTugas.value.trim();

    if(nama===""){
        alert("Tugas tidak boleh kosong!");
        return;
    }

    if(!validasiInput(nama,100)){
        return;
    }

    tambahTugas(nama);
    inputTugas.value="";
});

inputTugas.addEventListener("keydown",function(event){
    if(event.key==="Enter"){
        tombolTambah.click();
    }
});

// MINGGU 6 - TANDA SELESAI & FILTER
function toggleSelesai(id){
    daftarTugas=toggleSelesaiModule(daftarTugas,id);
    simpanTugas(daftarTugas);
    renderTugas();
}

const tombolSemua=document.createElement("button");
tombolSemua.textContent="Semua";

const tombolSelesai=document.createElement("button");
tombolSelesai.textContent="Selesai";

const tombolBelum=document.createElement("button");
tombolBelum.textContent="Belum Selesai";

filterBox.appendChild(tombolSemua);
filterBox.appendChild(tombolSelesai);
filterBox.appendChild(tombolBelum);

tombolSemua.onclick=function(){
    filterAktif="semua";
    renderTugas();
};

tombolSelesai.onclick=function(){
    filterAktif="selesai";
    renderTugas();
};

tombolBelum.onclick=function(){
    filterAktif="belum";
    renderTugas();
};

// MINGGU 7 - LOCAL STORAGE
// Fungsi simpan dan muat tugas berada di tugas.js

// MINGGU 8 - CATATAN CEPAT
const inputCatatan=document.createElement("textarea");
inputCatatan.placeholder="tulis catatan cepat...";

const tombolCatatan=document.createElement("button");
tombolCatatan.textContent="simpan catatanmu";

const daftarCatatanHTML=document.createElement("div");

sectionCatatan.appendChild(inputCatatan);
sectionCatatan.appendChild(tombolCatatan);
sectionCatatan.appendChild(daftarCatatanHTML);

let daftarCatatan=[];

function tambahCatatan(isi){
    daftarCatatan=tambahCatatanModule(daftarCatatan,isi);
    simpanCatatan(daftarCatatan);
    renderCatatan();
}

function hapusCatatan(id){
    daftarCatatan=hapusCatatanModule(daftarCatatan,id);
    simpanCatatan(daftarCatatan);
    renderCatatan();
}

tombolCatatan.onclick=function(){
    const isi=inputCatatan.value.trim();

    if(!validasiInput(isi,300)){
        return;
    }

    tambahCatatan(isi);
    inputCatatan.value="";
};

// MINGGU 9 - EDIT DATA & VALIDASI
function validasiInput(nilai,batas=100){
    if(nilai.trim()===""){
        alert("Input tidak boleh kosong!");
        return false;
    }

    if(nilai.length>batas){
        alert("Input maksimal "+batas+" karakter!");
        return false;
    }

    return true;
}

function editTugas(id){
    const tugas=daftarTugas.find(function(item){
        return item.id===id;
    });

    if(!tugas){
        return;
    }

    const namaBaru=prompt("Edit tugas:",tugas.nama);

    if(namaBaru===null){
        return;
    }

    if(!validasiInput(namaBaru,100)){
        return;
    }

    daftarTugas=editTugasModule(daftarTugas,id,namaBaru.trim());
    simpanTugas(daftarTugas);
    renderTugas();
}

function editCatatan(id){
    const catatan=daftarCatatan.find(function(item){
        return item.id===id;
    });

    if(!catatan){
        return;
    }

    const isiBaru=prompt("Edit catatan:",catatan.isi);

    if(isiBaru===null){
        return;
    }

    if(!validasiInput(isiBaru,300)){
        return;
    }

    daftarCatatan=editCatatanModule(daftarCatatan,id,isiBaru.trim());
    simpanCatatan(daftarCatatan);
    renderCatatan();
}

function renderTugas(){
    daftarTugasHTML.innerHTML="";

    let hasil=daftarTugas.filter(function(tugas){
        if(filterAktif==="selesai"){
            return tugas.selesai;
        }

        if(filterAktif==="belum"){
            return !tugas.selesai;
        }

        return true;
    });

    hasil=hasil.filter(function(tugas){
        return tugas.nama.toLowerCase().includes(kataKunci);
    });

    hasil.forEach(function(tugas){
        const li=document.createElement("li");
        li.className="tugas-item";
        li.dataset.id=tugas.id;
        li.draggable=true;

        const nama=document.createElement("span");
        nama.className="tugas-nama";
        nama.textContent="• "+tugas.nama;

        if(tugas.selesai){
            nama.style.textDecoration="line-through";
        }

        li.appendChild(nama);

        const tombolHapus=document.createElement("button");
        tombolHapus.textContent="Hapus";

        tombolHapus.onclick=function(event){
            event.stopPropagation();
            daftarTugas=hapusTugasModule(daftarTugas,tugas.id);
            simpanTugas(daftarTugas);
            renderTugas();
        };

        li.appendChild(tombolHapus);

        li.onclick=function(){
            toggleSelesai(tugas.id);
        };

        li.ondblclick=function(event){
            event.stopPropagation();
            editTugas(tugas.id);
        };

        daftarTugasHTML.appendChild(li);
    });

    aktifkanDragDrop();
}

function renderCatatan(){
    daftarCatatanHTML.innerHTML="";

    daftarCatatan.forEach(function(catatan){
        const div=document.createElement("div");
        div.className="catatan-item";

        const isi=document.createElement("p");
        isi.textContent=catatan.isi;

        const tanggal=document.createElement("small");
        tanggal.textContent="Dibuat: "+catatan.tanggal;

        const tombolHapus=document.createElement("button");
        tombolHapus.textContent="Hapus";

        tombolHapus.onclick=function(event){
            event.stopPropagation();
            hapusCatatan(catatan.id);
        };

        div.appendChild(isi);
        div.appendChild(tanggal);
        div.appendChild(tombolHapus);

        div.ondblclick=function(){
            editCatatan(catatan.id);
        };

        daftarCatatanHTML.appendChild(div);
    });
}

// MINGGU 10 - FETCH API KUTIPAN
const sectionKutipan=document.createElement("section");
sectionKutipan.className="dashboard-section";
sectionKutipan.innerHTML="<h2>🍃 kata-kata hari ini</h2>";

const kutipanBox=document.createElement("p");
kutipanBox.className="kutipan-teks";
kutipanBox.textContent="memuat kutipan hari ini...";

const tombolRefreshKutipan=document.createElement("button");
tombolRefreshKutipan.textContent="🔄 Refresh";

sectionKutipan.appendChild(kutipanBox);
sectionKutipan.appendChild(tombolRefreshKutipan);
app.insertBefore(sectionKutipan,sectionCuaca);

async function ambilKutipan(){
    try{
        kutipanBox.textContent="memuat kutipan hari ini...";

        const data=await ambilKutipanAPI();

        kutipanBox.textContent="\""+data.quote+"\" — "+data.author;
    }catch(error){
        kutipanBox.textContent="kutipan sedang tidak tersedia.";
        console.log("Error kutipan:",error);
    }
}

tombolRefreshKutipan.addEventListener("click",function(){
    ambilKutipan();
});

// MINGGU 11 - WIDGET CUACA
const API_KEY="b01069e06db5ab9067e928885c20306a";

const inputKota=document.createElement("input");
inputKota.placeholder="masukkan nama kota...";

const tombolCuaca=document.createElement("button");
tombolCuaca.textContent="Cek Cuaca";

const infoCuaca=document.createElement("div");
infoCuaca.className="cuaca-box";
infoCuaca.textContent="Masukkan nama kota untuk melihat cuaca.";

sectionCuaca.appendChild(inputKota);
sectionCuaca.appendChild(tombolCuaca);
sectionCuaca.appendChild(infoCuaca);

async function ambilCuaca(kota){
    try{
        infoCuaca.textContent="🐭 memuat cuaca...";

        const data=await ambilCuacaAPI(kota,API_KEY);

        infoCuaca.innerHTML="<h3>🍀 "+data.name+"</h3>"+
            "<p>🌡️ Suhu: "+data.main.temp+"°C</p>"+
            "<p>☁️ Kondisi: "+data.weather[0].description+"</p>";
    }catch(error){
        infoCuaca.textContent="❌ "+error.message;
        console.log("Error cuaca:",error);
    }
}

tombolCuaca.onclick=function(){
    const kota=inputKota.value.trim();

    if(kota===""){
        infoCuaca.textContent="Nama kota tidak boleh kosong.";
        return;
    }

    ambilCuaca(kota);
};

inputKota.addEventListener("keydown",function(event){
    if(event.key==="Enter"){
        tombolCuaca.click();
    }
});

// MINGGU 12 - MENGGABUNGKAN BEBERAPA SUMBER DATA
async function muatSemuaWidget(){
    kutipanBox.textContent="memuat kutipan hari ini...";
    infoCuaca.textContent="🌤 memuat cuaca...";

    await Promise.all([
        ambilKutipan(),
        ambilCuaca("Jakarta")
    ]);
}

// MINGGU 13 - DRAG AND DROP URUTAN TUGAS
function aktifkanDragDrop(){
    const items=document.querySelectorAll(".tugas-item");

    items.forEach(function(item){
        item.ondragstart=function(event){
            event.dataTransfer.setData("text/plain",item.dataset.id);
        };

        item.ondragover=function(event){
            event.preventDefault();
        };

        item.ondrop=function(event){
            event.preventDefault();

            const idDipindah=Number(event.dataTransfer.getData("text/plain"));
            const idTujuan=Number(item.dataset.id);

            if(idDipindah===idTujuan){
                return;
            }

            const indexAwal=daftarTugas.findIndex(function(tugas){
                return tugas.id===idDipindah;
            });

            const indexTujuan=daftarTugas.findIndex(function(tugas){
                return tugas.id===idTujuan;
            });

            if(indexAwal===-1||indexTujuan===-1){
                return;
            }

            const tugasDipindah=daftarTugas.splice(indexAwal,1)[0];
            daftarTugas.splice(indexTujuan,0,tugasDipindah);

            simpanTugas(daftarTugas);
            renderTugas();
        };
    });
}

// MINGGU 14 - DARK MODE & PENCARIAN
const tombolTema=document.createElement("button");
tombolTema.id="toggle-tema";
tombolTema.textContent="🌙 Dark Mode";

document.body.insertBefore(tombolTema,app);

function muatTema(){
    const tema=localStorage.getItem("tema");

    if(tema==="gelap"){
        document.body.classList.add("dark-mode");
        tombolTema.textContent="☀️ Light Mode";
    }
}

tombolTema.onclick=function(){
    document.body.classList.toggle("dark-mode");

    const modeAktif=document.body.classList.contains("dark-mode");

    localStorage.setItem("tema",modeAktif?"gelap":"terang");

    tombolTema.textContent=modeAktif?"☀️ Light Mode":"🌙 Dark Mode";
};

// DEBOUNCE PENCARIAN
let timeoutCari;

inputCari.oninput=function(event){
    kataKunci=event.target.value.toLowerCase();

    clearTimeout(timeoutCari);

    timeoutCari=setTimeout(function(){
        renderTugas();
    },300);
};

// INISIALISASI PROGRAM
daftarTugas=muatTugas();

if(daftarTugas.length>0){
    const idTerbesar=Math.max(...daftarTugas.map(function(tugas){
        return tugas.id;
    }));

    nextId=idTerbesar+1;
}

daftarCatatan=muatCatatan();

muatTema();
renderTugas();
renderCatatan();
muatSemuaWidget();
console.log("DailyBoard berhasil dijalankan.");
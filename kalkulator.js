function hitungKarbon() {
    let perangkat = document.getElementById("perangkat").value;
    let jumlah = parseFloat(document.getElementById("jumlah").value);
    let lama = parseFloat(document.getElementById("lama").value);

    if (isNaN(jumlah) || isNaN(lama)) {
        alert("Masukkan jumlah dan lama penggunaan dengan benar!");
        return;
    }

    // Konsumsi daya per perangkat dalam Watt (rata-rata)
    let konsumsiDaya = {
        dispenser: 300,
        kipas: 50,
        komputer: 200,
        kulkas: 100,
        laptop: 65,
        ricecooker: 400,
        televisi: 90
    };

    let watt = konsumsiDaya[perangkat]; // Mengambil konsumsi daya perangkat yang dipilih

    // Menghitung konsumsi energi dalam kWh
    let energiHarian = (watt * jumlah * lama) / 1000;

    // Faktor emisi karbon (0.85 kg CO2 per kWh)
    let emisiKarbon = energiHarian * 0.85;

    // Menampilkan hasil
    document.getElementById("hasil").innerHTML = 
        `Emisi karbon harian: <strong>${emisiKarbon.toFixed(2)}</strong> kg CO₂`;
}
function ubahPeriode() {
    let periode = document.getElementById("periode").value;
    let emisiHarian = parseFloat(document.getElementById("hasilKarbon").dataset.emisi) || 0;

    let emisi;
    if (periode === "bulanan") {
        emisi = emisiHarian * 30; 
    } else if (periode === "tahunan") {
        emisi = emisiHarian * 365; 
    } else {
        emisi = emisiHarian;
    }

    document.getElementById("hasilKarbon").innerText = (emisi / 1000).toFixed(2) + " Ton CO₂";
}

function hitungKarbon() {
    let perangkat = document.getElementById("perangkat").value;
    let jumlah = parseFloat(document.getElementById("jumlah").value);
    let lama = parseFloat(document.getElementById("lama").value);

    if (isNaN(jumlah) || isNaN(lama)) {
        alert("Masukkan jumlah dan lama penggunaan dengan benar!");
        return;
    }

    let konsumsiDaya = {
        dispenser: 300,
        kipas: 50,
        komputer: 200,
        kulkas: 100,
        laptop: 65,
        ricecooker: 400,
        televisi: 90
    };

    let watt = konsumsiDaya[perangkat];
    let energiHarian = (watt * jumlah * lama) / 1000;
    let emisiKarbon = energiHarian * 0.85; // Faktor emisi karbon (kg CO2/kWh)

    document.getElementById("hasilKarbon").innerText = (emisiKarbon / 1000).toFixed(2) + " Ton CO₂";
    document.getElementById("hasilKarbon").dataset.emisi = emisiKarbon; 
    ubahPeriode();
}
document.getElementById("hitung").addEventListener("click", function() {
    let daya = parseFloat(document.getElementById("batasDaya").value);
    let provinsi = document.getElementById("provinsi").value;

    if (provinsi === "") {
        alert("Pilih provinsi terlebih dahulu!");
        return;
    }

    if (isNaN(daya) || daya <= 0) {
        alert("Masukkan batas daya yang valid!");
        return;
    }

    let faktorEmisi = 0.0008; // Faktor emisi standar (Ton CO2 per VA)
    let jejakKarbon = daya * faktorEmisi;

    // Animasi loading sebelum menampilkan hasil
    let hasilKarbon = document.getElementById("hasilKarbon");
    hasilKarbon.innerText = "Menghitung...";
    setTimeout(() => {
        hasilKarbon.innerText = jejakKarbon.toFixed(2) + " Ton CO2";
    }, 1000);
});

/* Reset input otomatis setelah 10 detik */
setInterval(() => {
    document.getElementById("batasDaya").value = "";
    document.getElementById("hasilKarbon").innerText = "0.00 Ton CO2";
}, 10000);

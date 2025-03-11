document.addEventListener("DOMContentLoaded", function() {
    const provinsiSelect = document.getElementById("jaringan-listrik");
    const dayaInput = document.getElementById("batas-daya");
    const periodeSelect = document.getElementById("periode");
    const hitungButton = document.getElementById("hitung");
    const resetButton = document.getElementById("reset");
    const hasilKarbon = document.getElementById("hasilKarbon");

    // Data daya berdasarkan wilayah
    const dataDaya = {
        "Jakarta": 1300,
        "Jawa Barat": 900,
        "Jawa Tengah": 1200,
        "Jawa Timur": 1000,
        "Madura": 950,
        "Sumatera": 1100,
        "Kalimantan": 850,
        "Sulawesi": 950,
        "Papua": 800
    };

    // Isi dropdown wilayah secara otomatis
    function isiWilayah() {
        for (let provinsi in dataDaya) {
            let option = document.createElement("option");
            option.value = provinsi;
            option.textContent = provinsi;
            provinsiSelect.appendChild(option);
        }
    }

    isiWilayah(); // Jalankan saat halaman dimuat

    // Saat wilayah dipilih, isi daya otomatis
    provinsiSelect.addEventListener("change", function() {
        dayaInput.value = dataDaya[provinsiSelect.value] || "";
    });

    // Fungsi hitung jejak karbon
    function hitungJejakKarbon() {
        let daya = parseInt(dayaInput.value);
        
        if (isNaN(daya) || daya <= 0) {
            alert("Masukkan daya listrik yang valid!");
            return;
        }

        let karbonHarian = (daya * 0.00002).toFixed(2); // Perhitungan dasar harian
        let periode = periodeSelect.value;
        let hasil;

        // Konversi berdasarkan periode
        if (periode === "harian") {
            hasil = karbonHarian;
        } else if (periode === "bulanan") {
            hasil = (karbonHarian * 30).toFixed(2); // 30 hari dalam sebulan
        } else if (periode === "tahunan") {
            hasil = (karbonHarian * 365).toFixed(2); // 365 hari dalam setahun
        }

        hasilKarbon.textContent = `Jejak Karbonmu: ${hasil} Ton CO₂ (${periode})`;
    }

    // Reset form
    function resetForm() {
        provinsiSelect.selectedIndex = 0;
        dayaInput.value = "";
        periodeSelect.selectedIndex = 0;
        hasilKarbon.textContent = "0.00 Ton CO₂";
    }

    // Event listener tombol
    hitungButton.addEventListener("click", hitungJejakKarbon);
    resetButton.addEventListener("click", resetForm);
});

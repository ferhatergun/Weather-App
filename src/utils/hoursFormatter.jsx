

export const hoursFormatter = (saat) => {
    const saatDilimleri = [
      { baslangic: 6, bitis: 10, isim: "sabah", icon: "1.png" },
      { baslangic: 10, bitis: 13, isim: "öğle", icon: "2.png" },
      { baslangic: 13, bitis: 18, isim: "öğleden sonra", icon: "3.png" },
      { baslangic: 18, bitis: 21, isim: "ikindi", icon: "6.png" },
      { baslangic: 21, bitis: 24, isim: "akşam", icon: "4.png" },
      { baslangic: 0, bitis: 6, isim: "gece", icon: "5.png" },
    ];


    const saatDilimi = saatDilimleri.find((dilim) => {
      return (
        saat.getHours() >= dilim.baslangic && saat.getHours() < dilim.bitis
      );
    });

    if (saatDilimi) {
      return saatDilimi.icon;
    } else {
      console.log("Saat dilimi bulunamadı.");
      return null; // veya başka bir değer döndürebilirsiniz
    }
};

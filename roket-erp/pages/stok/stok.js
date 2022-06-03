var baglanti = require('../../baglanti')

function yonlendir(id) {
    return new Promise(resolve => {
        location.href = "./stokDuzenle.html";
        resolve(id);
    })
}
async function yazdir(id) {
    await yonlendir(id);
    var sonuc = []
    baglanti.connection.query("SELECT * FROM stok_takip WHERE id= " + id, (err, res) => {
        if (err) throw err;
        if (res.length > 0) {
            sonuc = res;
            alert(sonuc[0]["miktar"]);
            let miktar=sonuc[0]["miktar"];
            let eklenecek = document.getElementById("eklenecek").value;
            let sMiktar=miktar+eklenecek;
            console.log(sMiktar);
            let giren = document.getElementById("stok_giren").value;
            var kullanici_adi = document.getElementById("kullanici_adi")
            kullanici_adi.setAttribute("value", sonuc[0]['kullanici_adi'])
            var aciklama = document.getElementById("aciklama")
            bolum.setAttribute("value", sonuc[0]['aciklama'])
    
        }
    })
    baglanti.connection.query("UPDATE `stok_takip` SET `miktar` = '"+ sMiktar +
                            "', `Giris_tarih` = NULL, `Cikis_tarih` = '"+ cikis_tarih +
                            "', `stok_giren` = '"+ giren +
                            "', `aciklama` = '"+aciklama +
                            "' WHERE `stok_takip`.`id` =", + id, (err, res) => {
        if (err) throw err;
        alert("Stok Başarı ile Düşüldü!!!")
        document.getElementById("duzenleme-formu").reset();
    })
}
module.exports = {
    yonlendir, yazdir
}
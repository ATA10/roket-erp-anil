var baglanti = require('../../baglanti')

function yonlendir1(id) {
    return new Promise(resolve => {
        location.href = "./stokdus.html";
        resolve(id);
    })
}
async function yazdir1(id) {
    await yonlendir1(id);
    var sonuc = []
    baglanti.connection.query("SELECT * FROM stok_takip WHERE id= " + id, (err, res) => {
        if (err) throw err;
        if (res.length > 0) {
            sonuc = res;
            alert(sonuc[0]["miktar"]);
            let miktarr=sonuc[0]["miktar"];
            let dusulecek = document.getElementById("dusulecek").value;
            let sMiktar=miktarr-dusulecek;
            console.log(sMiktar);
            let giren = document.getElementById("stok_giren").value;
            var kullanici_adi = document.getElementById("kullanici_adi")
            kullanici_adi.setAttribute("value", sonuc[0]['kullanici_adi'])
            var aciklama = document.getElementById("aciklama")
            bolum.setAttribute("value", sonuc[0]['aciklama'])
    
        }
    })
    baglanti.connection.query("UPDATE `stok_takip` SET `miktar` = '"+ sMiktar +
                            "', `stok_cikis` = NULL, `stok_giris` = '"+ "''" +
                            "', `stok_giren` = '"+ giren +
                            "', `aciklama` = '"+aciklama +
                            "' WHERE `stok_takip`.`id` =", + id, (err, res) => {
        if (err) throw err;
        alert("Stok Başarı ile Düşüldü!!!")
        document.getElementById("stokdus-formu").reset();
    })
}
module.exports = {
    yonlendir1, yazdir1
}
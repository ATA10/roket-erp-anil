var baglanti = require('../../baglanti')

let miktar;
let eklenecek;
let sMiktar;
let giren;
let aciklama;
let a,b;

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
            a=res[0]["miktar"];
            b=res[0]["aciklama"]; 
            alert(a);
            alert(b); 
            alert(a+3);
            eklenecek = document.getElementById("eklenecek").value;
            sMiktar=miktar+eklenecek;                       
            alert(sMiktar);
            giren = document.getElementById("stok_giren").value;
            aciklama = document.getElementById("aciklama")
            aciklama.setAttribute("value", sonuc[a]['aciklama']) 
                            
    
            baglanti.connection.query("UPDATE stok_takip SET miktar="+ sMiktar +
                                        "', `stok_cikis` = '" +  "'' " +
                                        ", stok_giren='"+ giren +
                                        "', aciklama='"+aciklama +
                                        "' WHERE id=" + id, (err, res) => {
            if (err) throw err; 
            alert("Stok Başarı ile Düşüldü!!!")
            document.getElementById("duzenleme-formu").reset();
            location.href="./stokListele.html";
            })
        }
    }) 
}
module.exports = {
    yonlendir, yazdir
}
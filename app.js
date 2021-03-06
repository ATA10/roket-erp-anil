const { app, BrowserWindow, ipcMain, Notification } = require('electron')
const path = require('path')
const mysql = require('mysql');
const veritabanıBaglan = require('./veritabani-baglanti.js');
var sonuc=[];

const result = veritabanıBaglan();
if(result) {
  console.log("başarısız");
} else {
  console.log("başarılı");
}

let win, indexPenceresi, personelPenceresi, musteriPenceresi, stokPenceresi;

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, '/preloads/' + 'giris.js')
    },
    autoHideMenuBar: true,
  })

  win.loadFile('./pages/giris.html')

  win.on('close', () => {
    win.hide();
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})



ipcMain.on("admin-giris", () => {
  anaSayfayiOlusur()
  win.hide();
});

ipcMain.on("personel", () => {
  personelSayfasiniOlusur()
  // indexPenceresi.hide();
});

ipcMain.on("musteri", () => {
  musteriSayfasiniOlusur()
  // indexPenceresi.hide();
});

ipcMain.on("stok", () => {
  stokSayfasiniOlusur()
  // indexPenceresi.hide();
});

ipcMain.on('auth-failed', () => {
  new Notification({ title: "Giriş Başarısız!", silent : false}).show()
})

ipcMain.on('activate', () => {
win.show()
})
ipcMain.on("veriYolla",(event,arg)=>{
  sonuc=arg;
  console.log(sonuc+" veriyolla")
})
ipcMain.on("veriCek",(event,arg)=>{
  console.log(sonuc[0])
  event.reply("veriCek",sonuc)
})


function anaSayfayiOlusur() {
  indexPenceresi = new BrowserWindow({
    width: 800,
    height: 600,

    webPreferences: {
      nodeIntegration:true,
      contextIsolation:false
     
    },
    autoHideMenuBar: true,
    })
    indexPenceresi.loadFile('./pages/index.html')
    indexPenceresi.on('close', () => {
      indexPenceresi.hide()
    })
}

function personelSayfasiniOlusur() {
  personelWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration:true,
      contextIsolation:false
    },
    autoHideMenuBar: true,
    })
    personelWindow.loadFile('./pages/personel/personelYonetimi.html')
    personelWindow.on('close', () => {
      personelWindow.hide()
    })
}

function musteriSayfasiniOlusur() {
  musteriPenceresi = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration:true,
      contextIsolation:false
    },
    autoHideMenuBar: true,
    })
    musteriPenceresi.loadFile('./pages/musteri/musteriYonetim.html')
    musteriPenceresi.on('close', () => {
      musteriPenceresi.hide()
    })
}

function stokSayfasiniOlusur() {
  stokPenceresi = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration:true,
      contextIsolation:false
    },
    autoHideMenuBar: true,
    })
    stokPenceresi.loadFile('./pages/stok/stokYonetim.html')
    stokPenceresi.on('close', () => {
    stokPenceresi.hide()
    })
}

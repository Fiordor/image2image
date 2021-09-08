const fs = require('fs');
var ipc = require('electron').ipcRenderer;

var files = [];

function comunicar() {
  //poner a escuchar la respuesta
  ipc.once('respuesta', function (event, data) {
    console.log(data);
  });
  ipc.send('showOpenDialog');
}

//comunicar();

document.addEventListener('drop', (event) => {
  event.preventDefault();
  event.stopPropagation();

  for (const f of event.dataTransfer.files) {
    files = [];
    files.push(f.path);
  }
});

document.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.stopPropagation();
});

//Drag encima de la ventana
document.addEventListener('dragenter', (event) => {
  console.log('File is in the Drop Space');
});

document.addEventListener('dragleave', (event) => {
  console.log('File has left the Drop Space');
});




















//console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }));

/*Convert webp image to other image format
const webp=require('webp-converter');

//pass input image(.webp image) path ,output image(.jpeg,.pnp .....)

//dwebp(input,output,option)

const result = webp.dwebp("nodejs_logo.webp","nodejs_logo.jpg","-o",logging="-v");
result.then((response) => {
  console.log(response);
});
*/

/*
var webps = [];

fs.readdir('./', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);

    data.forEach((element, index) => {

        console.log('element', element);
        console.log('index', index);
        console.log('data[index]', data[index]);


        fs.readFile('./' + element, 'utf-8', (err, data) => {
            if (err) webps[index] = undefined;
            webps[index] = data;
            console.log(data)
        });

    });

})
*/
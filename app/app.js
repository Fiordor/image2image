const fs = require('fs');
const ipc = require('electron').ipcRenderer;

const btButtonOpen = document.getElementById('button-open');
const btBackgroundNavbar = document.getElementById('background-navbar');
const btFirstOpenFiles = document.getElementById('first-open-files');

var files = [];

const openNavbar = (event) => {
  const NAVBAR_OPEN = 'navbar-open';
  const BACKGROUND_OPEN = 'background-navbar-open';
  const navbar = document.getElementsByClassName('navbar')[0].classList;
  const background = document.getElementsByClassName('background-navbar')[0].classList;

  if (navbar.contains(NAVBAR_OPEN)) {
    navbar.remove(NAVBAR_OPEN);
    background.remove(BACKGROUND_OPEN);
  } else {
    navbar.add(NAVBAR_OPEN);
    background.add(BACKGROUND_OPEN);
  }
}

function updateImages(images) {

  if (files.length == 0) { btFirstOpenFiles.style.display = 'none'; }

  files = images;

  const container = document.getElementById('container');
  files.forEach(file => {
    let div = document.createElement('div');
    div.className = 'container-img';
    div.title = file
    let img = document.createElement('img');
    img.src = file;
    img.alt = file;
    div.appendChild(img);
    container.appendChild(div);
  });
}

function showOpenDialog() {
  //poner a escuchar la respuesta
  ipc.once('showOpenDialog-result', function (event, data) {
    if (!data.canceled) { updateImages(data.filePaths); }
  });
  ipc.send('showOpenDialog');
}

document.addEventListener('drop', (event) => {
  event.preventDefault();
  event.stopPropagation();

  console.log( event.dataTransfer.files);

  let dropFiles = [];
  for (const f of event.dataTransfer.files) {
    //if (type != imagen) alerta!
    dropFiles.push(f.path);
  }
  updateImages(dropFiles);
});

document.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.stopPropagation();
});

//Drag encima de la ventana
document.addEventListener('dragenter', (event) => {
  let background = document.getElementById('drag-and-drop');
  
});
//Drag sale de la ventana
document.addEventListener('dragleave', (event) => {
  let background = document.getElementById('drag-and-drop');
});

btFirstOpenFiles.onclick = (event) => { showOpenDialog(); }

btBackgroundNavbar.onclick = openNavbar;

btButtonOpen.onclick = openNavbar;



















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
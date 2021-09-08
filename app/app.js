const fs = require('fs');

/*Convert webp image to other image format
const webp=require('webp-converter');

//pass input image(.webp image) path ,output image(.jpeg,.pnp .....)

//dwebp(input,output,option)

const result = webp.dwebp("nodejs_logo.webp","nodejs_logo.jpg","-o",logging="-v");
result.then((response) => {
  console.log(response);
});
*/

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
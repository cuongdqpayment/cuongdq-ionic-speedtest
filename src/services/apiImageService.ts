
import { Injectable } from '@angular/core';

@Injectable()
export class ApiImageService {
    constructor() { }
    //dua vao doi tuong file image
    //tra ve doi tuong file image co kich co nho hon
    resizeImage(filename: string, file: File, newSize: number) {
        return new Promise((resolve, reject) => {
            try {
                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');
                var maxW = newSize;
                var maxH = newSize;
                var img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                img.onload = () => {
                    var iw = img.width;
                    var ih = img.height;
                    var scale = Math.min((maxW / iw), (maxH / ih));
                    var iwScaled = iw * scale;
                    var ihScaled = ih * scale;
                    canvas.width = iwScaled;
                    canvas.height = ihScaled;
                    context.drawImage(img, 0, 0, iwScaled, ihScaled);
                    //image.src=canvas.toDataURL(); //gan canvas cho image viewer
                    //xu ly chat luong anh qua cac tham so cua ham toDataURL()
                    //chuyen sang file de ghi xuong dia hoac truyen tren mang
                    //su dung ham toBlob sau
                    canvas.toBlob((blob) => {
                        var reader = new FileReader();
                        reader.readAsArrayBuffer(blob);//ket qua la mot mang Uint8Array 
                        reader.onload = () => { //hoac tham so ketqua.target.result == reader.result
                            //console.log(reader.result); //ket qua la mot mang Uint8Array 
                            //newFile la mot file image da duoc resize roi nhe
                            resolve({
                                imageViewer: canvas.toDataURL(),//gan cho img.src= this.src 
                                file: new Blob([reader.result], { type: 'image/png' }),
                                name: filename
                            });
                        }
                    });
                }
            } catch (err) {
                reject(err);
            }
        });
    }
}
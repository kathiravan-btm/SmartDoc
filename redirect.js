
document.addEventListener("DOMContentLoaded", () => {

    const uploadItems = document.querySelectorAll(".overalldiv");

    uploadItems.forEach(item => {
        const uploadButton = item.querySelector(".elementsub");
        const divbox = item.querySelector(".divbox");
        const fileInput = item.querySelector(".file-upload");
        const responseDiv = item.querySelector(".response-div");
        const editdiv = item.querySelector(".edit-div");
        const overlay = item.querySelector('#popupOverlay');
        const imagediv = item.querySelector(".image-workspace");
        const closebutton = item.querySelector(".btn-close-popup , .crop-button ");
        const zoom = item.querySelectorAll('.left-tool .zoom svg');
        const rotate = item.querySelectorAll('.top-tool .rotate svg');
        const flip = item.querySelectorAll('.top-tool .flip svg');
        const aspectRatio = item.querySelectorAll(' .aspect li');
        const download = item.querySelector('.download-image')
        const reset = item.querySelector('.reset');
        const submit = item.querySelector('.setheightwidth');
        const measure = item.querySelector('.measuremetdiv');
        const measurementvalue = item.querySelector("#measurement");
        const dpivalue = item.querySelector("#dpivalue");
        const qualitykbmax = item.querySelector("#qualitykbmax");
        const qualitykbmin = item.querySelector("#qualitykbmin");
        // console.log(measurementvalue.value);
        editdiv.addEventListener("click", () => togglePopup(overlay));
        
        // Add event listener to the upload button
        uploadButton.addEventListener("click", () => fileInput.click());

        // Add event listener to the file input
        fileInput.addEventListener("change", () => loadImage(clientname,qualitykbmax,qualitykbmin,dpivalue,measurementvalue,closebutton,fileInput, responseDiv, divbox, editdiv, imagediv, zoom, rotate, flip, aspectRatio,download,reset,submit,measure,overlay,uploadButton));
    });
});

const togglePopup = (overlay) => {
    overlay.classList.toggle('show');
}

const loadImage = (clientname,qualitykbmax,qualitykbmin,dpivalue,measurementvalue,closebutton,fileInput, responseDiv, divbox, editdiv, imagediv, zoom, rotate, flip, aspectRatio,download,reset,submit,measure,overlay,uploadButton
    ) => {  

        let filetype = "";
    let file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();


        reader.onload = (e) => {
            divbox.style.display = "block";
            responseDiv.innerHTML = `<img src="${e.target.result}" alt="Selected Image" />`;
            overlay.classList.toggle('show');
            uploadButton.style.borderRadius = "20px 20px 0px 0px";
        };

        reader.readAsDataURL(file);

        const url = window.URL.createObjectURL(new Blob([file], { type: 'image/jpg' }));
        imagediv.innerHTML = `<img src="${url}" alt="Selected Image" />`;

        const image_Workspace = imagediv.querySelector('img');

        closebutton.addEventListener("click", () => {
            overlay.classList.toggle('show');
            cropper.getCroppedCanvas().toBlob((blob) => {
                var downloadUrl = window.URL.createObjectURL(blob)
                responseDiv.innerHTML = `<img src="${downloadUrl}" alt="Selected Image" />`;
            })
        });

        const options = {
            dragMode: 'move',
            autocrop:true,
            responsive:true,
            Highlight:true,
            movable:true,
            checkOrientation:false,
            toggleDragModeOnDblclick:false,
            viewMode: 2,
            background: true   ,
            ready: function() {

                zoom[0].onclick = () => cropper.zoom(0.1);
                zoom[1].onclick = () => cropper.zoom(-0.1);

                // rotate image
                rotate[0].onclick = () => cropper.rotate(90);
                rotate[1].onclick = () => cropper.rotate(-90);

                // flip image
                let flipX = -1;
                let flipY = -1;
                flip[0].onclick = () => {
                    cropper.scale(flipX, 1);
                    flipX = -flipX;
                };
                flip[1].onclick = () => {
                    cropper.scale(1, flipY);
                    flipY = -flipY;
                };

                // set aspect ratio
                aspectRatio[0].onclick = () => cropper.setAspectRatio(1.7777777777777777);
                aspectRatio[1].onclick = () => cropper.setAspectRatio(1.3333333333333333);
                aspectRatio[2].onclick = () => cropper.setAspectRatio(1);
                aspectRatio[3].onclick = () => cropper.setAspectRatio(0.6666666666666666);
                aspectRatio[4].onclick = () => cropper.setAspectRatio(0);                
                let initwidth = 0;
                let initheight = 0;


                let pixelsheight = 0;
                let pixelswidth = 0;

                
                submit.onclick = () => {

                let dpi = 200;
                let  initwidth =  measure.querySelector("#width").value;
                let  initheight  = measure.querySelector('#height').value;
                let output = measurementvalue.value;
                console.log(output)
                if (dpivalue.value){
                    dpi = dpivalue.value;
                }
                switch(output) {
                    case 'mm':
                        pixelswidth = (initwidth / 25.4) * dpi;
                        pixelsheight = (initheight / 25.4) * dpi;
                        console.log("mm");
                        cropper.setCropBoxData({
                            minCropBoxHeight: pixelsheight,
                            minCropBoxWidth:pixelswidth
                          });
                          cropper.options.minCropBoxWidth = pixelswidth;
                          cropper.options.minCropBoxHeight = pixelsheight;  
                        break;
                    case 'cm':
                        pixelswidth = (initwidth / 2.54) * dpi;
                        pixelsheight = (initheight / 2.54) * dpi;   
                        console.log("cm");
                        cropper.setCropBoxData({
                            minCropBoxHeight: pixelsheight,
                            minCropBoxWidth:pixelswidth
                          });
                          cropper.options.minCropBoxWidth = pixelswidth;
                          cropper.options.minCropBoxHeight = pixelsheight;  
                        break;
                    case 'in':
                        pixelswidth = initwidth * dpi;
                        pixelsheight = initheight * dpi;
                        console.log("in");
                        cropper.setCropBoxData({
                            minCropBoxHeight: pixelsheight,
                            minCropBoxWidth:pixelswidth
                          });
                          cropper.options.minCropBoxWidth = pixelswidth;
                          cropper.options.minCropBoxHeight = pixelsheight;  
                        break;
                    case 'px':
                        pixelsheight = initheight;
                        pixelswidth = initwidth;
                        console.log("px");
                        cropper.setCropBoxData({
                            minCropBoxHeight: 100,
                            minCropBoxWidth:100
                          });
                        cropper.options.minCropBoxWidth = 100;
                        cropper.options.minCropBoxHeight = 100;
                        break;
                    default:
                        throw new Error('Unsupported unit type');}
                var sizeInBytes = file.size;
                var sizeInKB = sizeInBytes / 1024; 
                console.log(`${file.name} has a size of ${sizeInKB} KB.\n`);
                cropper.getCroppedCanvas().toBlob((blob) => {   
                    var downloadUrl = window.URL.createObjectURL(blob)
                    console.log((blob.size)/1024 , "kb")
                },'image/jpeg', 0.9);

                  console.log(pixelswidth);
                  console.log(pixelsheight);
                  let calculatedaspectratio = pixelswidth/pixelsheight;
                  cropper.setAspectRatio(calculatedaspectratio);
                }
                //custom aspect ratio



                //reset the cropper

                reset.onclick = () =>{
                    cropper.setAspectRatio(0);
                    cropper.reset();
                   
                }

                //resize the cropper


                
                
                download.onclick = () => {
                    let qualityvalue=1;
                    cropper.getCroppedCanvas().toBlob((blob) => {
                        
                        var downloadUrl = resizeImage(pixelsheight,pixelswidth); 
                        var a = document.createElement('a')
                        a.href = downloadUrl
                        let clientnames = "cropped-image"
                        if (document.querySelector("#clientname").value){
                        clientnames = document.querySelector("#clientname").value;
                    }
                        if (filetype === "jpg") {
                            a.download = `${clientnames}.jpg`;
                            console.log(clientnames);
                        } else if (filetype === "jpeg") {
                            a.download = `${clientnames}.jpg`;
                            console.log(clientnames);

                        } else {
                            a.download = `${clientnames}.jpg`;     
                            console.log(clientnames);
                        }
                        
                        a.click() 
                    },'image/jpeg', qualityvalue);
                }
            }
        };
        var cropper = new Cropper(image_Workspace, options);
    }
};


  // Function to convert a blob to an image element
function createImageFromBlob(blob) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(blob);

        img.onload = () => {
            resolve(img);  // Resolve the promise with the image element once it's loaded
            URL.revokeObjectURL(url);  // Clean up the object URL
        };

        img.onerror = () => {
            reject(new Error('Failed to load image from blob'));  // Reject if there's an error
            URL.revokeObjectURL(url);  // Clean up even in case of error
        };

        img.src = url;
    });
}


function resizeImage(imgToResize, pixelsheight, pixelswidth) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Set canvas dimensions
    canvas.width = pixelswidth;
    canvas.height = pixelsheight;

    // Draw the image onto the canvas with the new dimensions
    context.drawImage(
        imgToResize,
        0, 0,
        pixelswidth, pixelsheight
    );

    // Convert the canvas content to a data URL (base64 encoded image)
    return canvas.toDataURL();
}

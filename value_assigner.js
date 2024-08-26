
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
        const attribute = item.querySelector(".attributedefine");

        // console.log(measurementvalue.value);
        editdiv.addEventListener("click", () => togglePopup(overlay));
        
        // Add event listener to the upload button
        uploadButton.addEventListener("click", () => fileInput.click());

        // Add event listener to the file input
        fileInput.addEventListener("change", () => loadImage(attribute,clientname,qualitykbmax,qualitykbmin,dpivalue,measurementvalue,closebutton,fileInput, responseDiv, divbox, editdiv, imagediv, zoom, rotate, flip, aspectRatio,download,reset,submit,measure,overlay,uploadButton));
    });
});

const togglePopup = (overlay) => {
    overlay.classList.toggle('show');
}

const loadImage = (attribute,clientname,qualitykbmax,qualitykbmin,dpivalue,measurementvalue,closebutton,fileInput, responseDiv, divbox, editdiv, imagediv, zoom, rotate, flip, aspectRatio,download,reset,submit,measure,overlay,uploadButton
    ) => {  

        let filetype = attribute.getAttribute("format");
        console.log(filetype);
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
            minCropBoxHeight: parseInt(attribute.getAttribute("minheight")),
            minCropBoxWidth:parseInt(attribute.getAttribute("minwidth")),
            minCropBoxWidth:parseInt(attribute.getAttribute("minheight")),
            minCropBoxHeight:parseInt(attribute.getAttribute("minwidth")),
            background: true,

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

              
                
                cropper.setAspectRatio(attribute.getAttribute("aspectvalue"));
                cropper.setCropBoxData({
                    minCropBoxHeight: parseInt(attribute.getAttribute("minheight")),
                    minCropBoxWidth:parseInt(attribute.getAttribute("minwidth"))
                    
                  });

                download.onclick = () => {
                    let qualityvalue=1;
                    cropper.getCroppedCanvas().toBlob((blob) => {
                        
                        var downloadUrl = URL.createObjectURL(blob); 
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

// Function to resize the image
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



                        // // let qualityvalue=1;
                        // console.log(qualitykbmax.value);   
                        // console.log(qualitykbmin.value);   
                        // console.log(qualityvalue);   
                        // console.log(blob.size/1024);  
                        // if (qualitykbmax.value < blob.size/1024) {
                        //     qualityvalue= 1;
                        //     console.log(qualitykbmax.value);   
                        //     console.log(qualitykbmin.value);   
                        //     console.log(qualityvalue);   
                        //     console.log(blob.size/1024);   
                           
                        //     while (qualitykbmax.value < blob.size/1024 && blob.size/1024 > qualitykbmin.value ) {
                        //         qualityvalue -= 0.01;
                        //         console.log(qualitykbmax.value);   
                        //     console.log(qualitykbmin.value);   
                        //     console.log(qualityvalue);   
                        //     console.log(blob.size/1024);
                        //         // Adjust qualitykb or blob.size here if necessary to avoid an infinite loop
                        //     }
                        // } 
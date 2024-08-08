
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
        const resize = item.querySelector('.resize');
        const submit = item.querySelector('.setheightwidth');
        const measure = item.querySelector('.measuremetdiv');
        
    
        closebutton.addEventListener("click", () => togglePopup(overlay));
        editdiv.addEventListener("click", () => togglePopup(overlay));
        
        // Add event listener to the upload button
        uploadButton.addEventListener("click", () => fileInput.click());

        // Add event listener to the file input
        fileInput.addEventListener("change", () => loadImage(fileInput, responseDiv, divbox, editdiv, imagediv, zoom, rotate, flip, aspectRatio,download,reset,resize,submit,measure,overlay,uploadButton));
    });
});

const togglePopup = (overlay) => {
    overlay.classList.toggle('show');
}

const loadImage = (fileInput, responseDiv, divbox, editdiv, imagediv, zoom, rotate, flip, aspectRatio,download,reset,resize,submit,measure,overlay,uploadButton
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
        
        const options = {
            dragMode: 'move',
            autocrop:true,
            responsive:true,
            Highlight:false,
            movable:false,
            toggleDragModeOnDblclick:false,
            viewMode: 1,
            background: true,
            crop(event) {
                console.log(event.detail.x); 
              },
            ready: function() {

                // zoom for image
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
                resize.onclick = () =>    cropper.setAspectRatio(1.2857142857142857142857142857143);
                
                let initwidth = 0;
                let initheight = 0;


                submit.onclick = () => {
                let  initwidth =  measure.querySelector("#width").value;
                let  initheight  = measure.querySelector('#height').value;
                var sizeInBytes = file.size;
                var sizeInKB = sizeInBytes / 1024; 
                console.log(`${file.name} has a size of ${sizeInKB} KB.\n`);

                  console.log(initheight);
                  console.log(initwidth);
                  let calculatedaspectratio = initwidth/initheight;
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
                    cropper.getCroppedCanvas().toBlob((blob) => {
                        var downloadUrl = window.URL.createObjectURL(blob)
                        var a = document.createElement('a')
                        a.href = downloadUrl
                        if (filetype === "jpg") {
                            a.download = 'cropped-image.jpg';
                        } else if (filetype === "jpeg") {
                            a.download = 'cropped-image.jpeg';
                        } else {
                            a.download = 'cropped-image.jpg';
                        }
                                          // output image name
                        a.click()
                    })
                }
            }
        };

        var cropper = new Cropper(image_Workspace, options);
    }
};

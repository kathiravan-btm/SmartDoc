let imgInput = document.getElementsByClassName('file-upload');
imgInput.addEventListener('change', function (e) {
    if (e.target.files) {
        let imageFile = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            var img = document.createElement("img");
            img.onload = function(event) {
                // Actual resizing
            }
            img.src = e.target.result;
        }
        reader.readAsDataURL(imageFile);
    }
});

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

// Actual resizing
ctx.drawImage(img, 0, 0, 300, 300);

// Show resized image in preview element
var dataurl = canvas.toDataURL(imageFile.type);
document.getElementById("preview").src = dataurl;
const search = () =>{
    var inputValue = document.getElementById('search-item').value;
    if(!!inputValue) {
      document.getElementById('result-box').style.display = 'block';
      document.getElementById('search-box').style.borderRadius = '25px 25px 0px 0px';

    }
    else {
      document.getElementById('result-box').style.display = 'none';
      document.getElementById('search-box').style.borderRadius = "25px";

    };


    const searchbox = document.getElementById("search-item").value.toUpperCase();
    const storeitems = document.getElementById("result-box")
    const product = document.querySelectorAll(".exam ")
    const pname = storeitems.getElementsByTagName("h2")
    
    for(var i=0; i< pname.length; i++){
        let match = product[i].getElementsByTagName('h2')[0];
        if(match){
            let textvalue = match.textContent || match.innerHTML

            if(textvalue.toUpperCase().indexOf(searchbox) > -1){
                product[i].style.display = "";

            }
            else{
                product[i].style.display = "none";

            }   
        }
    }
}

document.getElementById('jee').addEventListener('click', function() {
    window.location.href = 'jee.html';
});

    
const hi = () => {
    const elements = document.getElementsByClassName('file-image');
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = 'block';
    }
}




document.addEventListener('DOMContentLoaded', function() {
  const imageLoad = document.getElementById('choose-file');
  const customFileButton = document.querySelector('.choose-button__input');
  const imageUrlInput = document.getElementById('input-url');
  const loadImageButton = document.getElementById('load-button');
  const imageClean = document.getElementById('clean-button');
  const dropContainer = document.querySelector('.page-drop');
  const imageElement = document.getElementById('original-picture');
  const editButton = document.getElementById('edit-button');
  const imageWidth = document.getElementById('width-parametrs');
  const imageHeight = document.getElementById('height-parametrs');
  const imageSave = document.getElementById('save-button');
  const formError = document.querySelector('.error-form__wrapper');
  const emtyErrorText = document.querySelector('.error-form__empty');
  const incorrectErrorText = document.querySelector('.error-form__incorrect');
  const errorSubmit = document.querySelector('.error-form__button');
  const errorFormLoadImage = document.querySelector('.error-form__load-image');
  const errorFormInputParametrs = document.querySelector('.error-form__input-parametrs');
  let canvas = document.getElementById("edited-picture");
  let isInside = false;
  
  function readFile(input) {
    let file = input.files[0];
  
    let reader = new FileReader();
    reader.onload = function() {
      
      imageElement.src = reader.result;
    };

    reader.onerror = function() {
      console.log(reader.error);
    };
    reader.readAsDataURL(file);
  }

  imageLoad.addEventListener('change', function() {
    imageLoad.src = " ";
    readFile(imageLoad);
  });

  customFileButton.addEventListener('click', function() {
    imageLoad.change;
  });

  const isGoodUrl = urlString => {
    const urlPattern = new RegExp('^(https?:\\/\\/)?'   + 
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'  + 
    '((\\d{1,3}\\.){3}\\d{1,3}))'                       + 
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'                   +
    '(\\?[;&a-z\\d%_.~+=-]*)?'                          + 
    '(\\#[-a-z\\d_]*)?$','i');                           

    return !!urlPattern.test(urlString);
  };

  loadImageButton.addEventListener('click', function() {
    if (isGoodUrl(imageUrlInput.value)== true) {
      imageElement.src = imageUrlInput.value;
    }
    if (imageUrlInput.value == ""){
      formError.style = "display: flex";
      emtyErrorText.style = "display: block";
    } else {
      formError.style = "display: flex";
      incorrectErrorText.style = "display: block";
    }
  });

  imageClean.addEventListener('click', function() {
    imageElement.src = ' ';
    imageUrlInput.value = "";
    imageHeight.value = "";
    imageWidth.value = "";
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  document.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropContainer.style = "display: none";
    for (const f of e.dataTransfer.files) {
      imageElement.src=f.path;
    }
  });
  
  document.addEventListener('dragover', (e) => {
    isInside = true;
    dropContainer.style = "display: flex";
    e.preventDefault();
    e.stopPropagation();
  });
  
  document.addEventListener('dragleave', (e) => {
    isInside = false;
    setTimeout(() => {
      if (!isInside) {
        dropContainer.style = "display: none";
      }
    }, 200); 
    e.preventDefault();
    e.stopPropagation();
  });

  editButton.addEventListener('click', function() {
    
    if (imageHeight.value !== ''  &&  imageWidth.value !== '' && imageElement.src!="") {
      document.getElementById('edited-picture').width = imageWidth.value;
      document.getElementById('edited-picture').height = imageHeight.value;
      
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var image = new Image(300, 227); 
      image.onload = drawImageActualSize;
  
      image.src = imageElement.src;
      
      function drawImageActualSize() {
        ctx.drawImage(this, 0, 0, imageWidth.value, imageHeight.value);
      }
    } 
    else if (imageElement.src == ""){
      formError.style = "display: flex";
      errorFormLoadImage.style = "display: block";
    }
    else {
      formError.style = "display: flex";
      errorFormInputParametrs.style = "display: block";
    }  
  });

  imageSave.addEventListener('click', function() {
    var dataURL = canvas.toDataURL("image/jpeg");
    var link = document.createElement("a");
    document.body.appendChild(link); 
    link.href = dataURL;
    link.download = "my-image-name.jpg";
    link.click();
    document.body.removeChild(link);
  });

  errorSubmit.addEventListener('click', function() {
    formError.style = "display: none";
    emtyErrorText.style = "display: none";
    incorrectErrorText.style = "display: none";
    errorFormLoadImage.style = "display: none";
    errorFormInputParametrs.style = "display: none";
  });

});
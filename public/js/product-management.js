const imagePickerElement = document.querySelector(".image-container input");
const imagePreviewElement = document.querySelector(".image-container img");
const logoElement = document.querySelector(".logo img");

const deleteProductElement = document.querySelector(".product-btns .remove-product")

function previewImage() {
  const files = imagePickerElement.files;

  if (files.length === 0 || !files) {
    imagePreviewElement.style.display = "none";
    return;
  }
  const pickedFile = files[0];
  imagePreviewElement.scr = URL.createObjectURL(pickedFile);
  console.dir(imagePreviewElement)
  imagePreviewElement.style.display = "block";
}

imagePickerElement.addEventListener("change", previewImage);


function removeProduct() {
  const e = deleteProductElement.target
  console.dir(e)
  P
}

deleteProductElement.addEventListener("click", removeProduct)

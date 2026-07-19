let slide = document.getElementById("slide");
const viewer = document.getElementById("viewer");

let files = [];
let index = 0;

folderInput.addEventListener("change", (e) => {
  files = [...e.target.files].filter(f => f.type.startsWith("image/"));
  console.log("読み込んだファイル数:", files.length);
});

startBtn.addEventListener("click", () => {
  if (files.length === 0) {
    alert("画像ファイルがありません");
    return;
  }

  ui.style.display = "none";
  viewer.style.display = "block";

  showFile();
});

function showFile() {
  const file = files[index];
  const url = URL.createObjectURL(file);
  slide.src = url;
}

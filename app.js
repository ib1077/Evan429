// ★ slide は画像本体なので let にする（最重要）
let slide = document.getElementById("slide");

const viewer = document.getElementById("viewer");
const fadeMask = document.getElementById("fadeMask");

let files = [];
let index = 0;

// フォルダ選択
folderInput.addEventListener("change", (e) => {
  files = [...e.target.files];
  console.log("読み込んだファイル数:", files.length);
});

// 再生開始
startBtn.addEventListener("click", () => {
  if (files.length === 0) {
    alert("ファイルがありません");
    return;
  }

  ui.style.display = "none";
  viewer.style.display = "block";

  showFile();
});

// ★ 最小構成：まずは画像1枚を確実に表示する
function showFile() {
  const file = files[index];
  const url = URL.createObjectURL(file);

  slide.src = url;
}

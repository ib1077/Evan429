const viewer = document.getElementById("viewer");
const fadeMask = document.getElementById("fadeMask");

let files = [];
let order = [];
let index = 0;
let playing = true;

// ゴミ箱禁止フィルタ
function isTrash(path) {
  return (
    path.includes("Trash") ||
    path.includes("Recently Deleted") ||
    path.includes(".Trash") ||
    path.includes(".Recycle") ||
    path.includes("RecycleBin") ||
    path.includes("Deleted") ||
    path.includes(".thumbnails")
  );
}

// みてね風クロスフェード
function crossFade(nextURL) {
  fadeMask.style.opacity = 0.1; // ほんの少し暗転
  viewer.style.opacity = 0;

  setTimeout(() => {
    viewer.src = nextURL;
    viewer.style.opacity = 1;
    fadeMask.style.opacity = 0;
  }, 200);
}

// 画像・動画対応の読み込み
function showFile() {
  const file = files[order[index]];
  const url = URL.createObjectURL(file);

  if (file.type.startsWith("video")) {
    viewer.src = "";
    viewer.style.opacity = 0;

    const video = document.createElement("video");
    video.src = url;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;

    viewer.replaceWith(video);
    video.id = "viewer";
    viewer = video;

    fadeMask.style.opacity = 0.1;
    setTimeout(() => {
      fadeMask.style.opacity = 0;
      viewer.style.opacity = 1;
    }, 200);

  } else {
    const img = new Image();
    img.onload = () => crossFade(url);
    img.src = url;
  }
}

// 次へ
function next() {
  index++;
  if (index >= order.length) {
    order = [...files.keys()];
    order.sort(() => Math.random() - 0.5);
    index = 0;
  }
  showFile();
}

// 15秒ゆったりスライドショー
setInterval(() => {
  if (playing) next();
}, 15000);

folderInput.addEventListener("change", (e) => {
  files = [...e.target.files].filter(f => f.type.startsWith("image/"));

  console.log("=== フォルダ選択結果 ===");
  console.log("総ファイル数:", e.target.files.length);
  console.log("画像ファイル数:", files.length);
});

startBtn.addEventListener("click", () => {
  if (files.length === 0) {
    alert("フォルダ内に画像がありません");
    return;
  }

  ui.style.display = "none";
  viewer.style.display = "block";
  help.style.display = "block";

  showFile();
});

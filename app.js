const slide = document.getElementById("slide");
const viewer = document.getElementById("viewer");
const fadeMask = document.getElementById("fadeMask");

let files = [];
let order = [];
let index = 0;
let playing = true;

// フォルダ選択
folderInput.addEventListener("change", (e) => {
  files = [...e.target.files].filter(f => f.type.startsWith("image/") || f.type.startsWith("video/"));

  console.log("=== フォルダ選択結果 ===");
  console.log("総ファイル数:", e.target.files.length);
  console.log("画像/動画ファイル数:", files.length);

  order = [...files.keys()];
  order.sort(() => Math.random() - 0.5);

  index = 0;
});

// 再生開始
startBtn.addEventListener("click", () => {
  if (files.length === 0) {
    alert("フォルダ内に画像や動画がありません");
    return;
  }

  ui.style.display = "none";
  viewer.style.display = "block";
  help.style.display = "block";

  showFile();
});

// クロスフェード
function crossFade(nextURL) {
  fadeMask.style.opacity = 0.1;
  slide.style.opacity = 0;

  setTimeout(() => {
    slide.src = nextURL;
    slide.style.opacity = 1;
    fadeMask.style.opacity = 0;
  }, 200);
}

// 表示処理（画像・動画対応）
function showFile() {
  const file = files[order[index]];
  const url = URL.createObjectURL(file);

  // 動画
  if (file.type.startsWith("video")) {
    const video = document.createElement("video");
    video.src = url;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.id = "slide";
    video.style.width = "100vw";
    video.style.height = "100vh";
    video.style.objectFit = "contain";

    slide.replaceWith(video);
    slide = video;

    fadeMask.style.opacity = 0.1;
    setTimeout(() => {
      fadeMask.style.opacity = 0;
      slide.style.opacity = 1;
    }, 200);

  } else {
    // 画像
    if (slide.tagName !== "IMG") {
      const newImg = document.createElement("img");
      newImg.id = "slide";
      newImg.style.width = "100vw";
      newImg.style.height = "100vh";
      newImg.style.objectFit = "contain";
      slide.replaceWith(newImg);
      slide = newImg;
    }

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

// 15秒ごとに次へ
setInterval(() => {
  if (playing) next();
}, 15000);

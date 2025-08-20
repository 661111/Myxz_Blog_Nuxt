// 第一次播放音乐
var anzhiyu_musicFirst = false;
// 快捷键
var anzhiyu_keyboard = null;
// 音乐播放状态
var anzhiyu_musicPlaying = false;
var $bodyWrap = document.getElementById("body-wrap");
var anzhiyu_intype = false;
var anzhiyu_keyUpEvent_timeoutId = null;
var anzhiyu_keyUpShiftDelayEvent_timeoutId = null;

// 右键菜单对象
var rm = null;

// 已随机的歌曲
var selectRandomSong = [];
// 音乐默认声音大小
var musicVolume = 0.8;
// 是否切换了周杰伦音乐列表
var changeMusicListFlag = false;
// 当前默认播放列表
var defaultPlayMusicList = [];
var themeColorMeta, pageHeaderEl, navMusicEl, consoleEl;

document.addEventListener("DOMContentLoaded", function () {
  // 监听nav是否被其他音频暂停⏸️
  const listenNavMusicPause = function () {
    const timer = setInterval(() => {
      if (navMusicEl && navMusicEl.querySelector("#nav-music meting-js").aplayer) {
        clearInterval(timer);
        let msgPlay = '<i class="anzhiyufont anzhiyu-icon-play"></i><span>播放音乐</span>';
        let msgPause = '<i class="anzhiyufont anzhiyu-icon-pause"></i><span>暂停音乐</span>';
        navMusicEl.querySelector("#nav-music meting-js").aplayer.on("pause", function () {
          navMusicEl.classList.remove("playing");
          document.getElementById("menu-music-toggle").innerHTML = msgPlay;
          document.getElementById("nav-music-hoverTips").innerHTML = "音乐已暂停";
          document.querySelector("#consoleMusic").classList.remove("on");
          anzhiyu_musicPlaying = false;
          navMusicEl.classList.remove("stretch");
        });
        navMusicEl.querySelector("#nav-music meting-js").aplayer.on("play", function () {
          navMusicEl.classList.add("playing");
          document.getElementById("menu-music-toggle").innerHTML = msgPause;
          document.querySelector("#consoleMusic").classList.add("on");
          anzhiyu_musicPlaying = true;
          // navMusicEl.classList.add("stretch");
        });
      }
    }, 16);
  };
})
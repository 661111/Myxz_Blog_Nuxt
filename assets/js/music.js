const sco = {
  musicSkipBack() {
    document.querySelector("meting-js")?.aplayer?.skipBack();
  },
  musicSkipForward() {
    document.querySelector("meting-js")?.aplayer?.skipForward();
  },
  musicToggle(isMeting = true) {
    if (!this.isMusicBind) this.musicBind();
    
    const $music = document.querySelector("#nav-music");
    const $meting = document.querySelector("#nav-music meting-js");
    const $console = document.getElementById("consoleMusic");
    
    this.musicPlaying = !this.musicPlaying;
    
    $music.classList.toggle("playing", this.musicPlaying);
    $music.classList.toggle("stretch", this.musicPlaying);
    $console?.classList.toggle("on", this.musicPlaying);
    
    if (typeof rm !== "undefined" && rm?.menuItems.music[0]) {
      const $rmText = document.querySelector("#menu-music-toggle span");
      const $rmIcon = document.querySelector("#menu-music-toggle i");
      $rmText.textContent = this.musicPlaying 
        ? GLOBAL_CONFIG.right_menu.music.stop
        : GLOBAL_CONFIG.right_menu.music.start;
      $rmIcon.className = `solitude fas ${this.musicPlaying ? 'fa-pause' : 'fa-play'}`;
    }

    if (isMeting && $meting) {
      this.musicPlaying ? $meting.aplayer.play() : $meting.aplayer.pause();
    }
  },
}
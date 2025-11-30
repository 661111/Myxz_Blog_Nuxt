const sco = {
  lastWittyWord: "",
  wasPageHidden: false,
  musicPlaying: false,
  scrollTo(elementId) {
    const targetElement = document.getElementById(elementId);
    if (targetElement) {
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scroll({ top: targetPosition, behavior: "smooth" });
    }
  },
  musicBind() {
    const $music = document.querySelector("#nav-music meting-js");
    if ($music && $music.aplayer) { 
      this.isMusicBind = true;
      $music.onclick = () => this.musicPlaying && this.musicToggle(true);
      $music.aplayer.on('loadeddata', () =>{
        coverColor(true);
      })
    }
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
  musicSkipBack() {
    document.querySelector("meting-js")?.aplayer?.skipBack();
  },
  musicSkipForward() {
    document.querySelector("meting-js")?.aplayer?.skipForward();
  },
  switchCommentBarrage() {
    const commentBarrageElement = document.querySelector(".comment-barrage");
    const consoleCommentBarrage = document.querySelector(
      "#consoleCommentBarrage"
    );
    if (!commentBarrageElement) return;

    const isDisplayed =
      window.getComputedStyle(commentBarrageElement).display === "flex";
    commentBarrageElement.style.display = isDisplayed ? "none" : "flex";
    consoleCommentBarrage?.classList.toggle("on", !isDisplayed);
    utils.saveToLocal.set("commentBarrageSwitch", !isDisplayed, 0.2);
    rm?.menuItems.barrage && rm.barrage(isDisplayed);
  },
  switchHideAside() {
    const htmlClassList = document.documentElement.classList;
    const consoleHideAside = document.querySelector("#consoleHideAside");
    const isHideAside = htmlClassList.contains("hide-aside");
    utils.saveToLocal.set("aside-status", isHideAside ? "show" : "hide", 1);
    htmlClassList.toggle("hide-aside");
    consoleHideAside.classList.toggle("on", !isHideAside);
  },
  switchKeyboard() {
    this.sco_keyboards = !this.sco_keyboards;
    const consoleKeyboard = document.querySelector("#consoleKeyboard");
    const keyboardFunction = this.sco_keyboards ? openKeyboard : closeKeyboard;
    consoleKeyboard?.classList.toggle("on", this.sco_keyboards);
    keyboardFunction();
    localStorage.setItem("keyboard", this.sco_keyboards);
    document.getElementById("keyboard-tips")?.classList.remove("show");
  },
  initConsoleState() {
    const consoleHideAside = document.querySelector("#consoleHideAside");
    if (!consoleHideAside) return;
    consoleHideAside.classList.toggle(
      "on",
      document.documentElement.classList.contains("hide-aside")
    );
  },
  changeWittyWord() {
    const greetings = GLOBAL_CONFIG.aside.witty_words || [];
    if (greetings.length === 0) {
      document.getElementById("sayhi").textContent = "Solitude";
      this.lastWittyWord = null;
      return;
    }
    const greetingElement = document.getElementById("sayhi");
    let randomGreeting;
    if (greetings.length === 1) {
      randomGreeting = greetings[0];
    } else {
      do {
        randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
      } while (randomGreeting === this.lastWittyWord);
    }
    greetingElement.textContent = randomGreeting;
    this.lastWittyWord = randomGreeting;
  },
  switchDarkMode() {
    const isDarkMode =
      document.documentElement.getAttribute("data-theme") === "dark";
    const newMode = isDarkMode ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newMode);
    utils.saveToLocal.set("theme", newMode, 0.02);
    utils.snackbarShow(GLOBAL_CONFIG.lang.theme[newMode], false, 2000);
    if (typeof rm === "object") rm.mode(!isDarkMode) && rm.hideRightMenu();
    handleThemeChange(newMode);
  },
  hideTodayCard: () =>
    document.getElementById("todayCard").classList.add("hide"),
  toTop: () => utils.scrollToDest(0),
  showConsole: () =>
    document.getElementById("console")?.classList.toggle("show", true),
  hideConsole: () =>
    document.getElementById("console")?.classList.remove("show"),
  refreshWaterFall() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            waterfall(entry.target).then(() => {
              entry.target.classList.add("show");
            });
          }, 300);
        }
      });
    });
    document
      .querySelectorAll(".waterfall")
      .forEach((el) => observer.observe(el));
  },
  addRuntime() {
    const el = document.getElementById("runtimeshow");
    if (el && GLOBAL_CONFIG.runtime) {
      el.innerText =
        utils.timeDiff(new Date(GLOBAL_CONFIG.runtime), new Date()) +
        GLOBAL_CONFIG.lang.day;
    }
  },
  toTalk(txt) {
    const inputs = [
      "#wl-edit",
      ".el-textarea__inner",
      "#veditor",
      ".atk-textarea",
    ];
    inputs.forEach((selector) => {
      const el = document.querySelector(selector);
      if (el) {
        el.dispatchEvent(
          new Event("input", { bubble: true, cancelable: true })
        );
        el.value = "> " + txt.replace(/\n/g, "\n> ") + "\n\n";
        utils.scrollToDest(
          utils.getEleTop(document.getElementById("post-comment")),
          300
        );
        el.focus();
        el.setSelectionRange(-1, -1);
      }
    });
    utils.snackbarShow(GLOBAL_CONFIG.lang.totalk, false, 2000);
  },
  initbbtalk() {
    const bberTalkElement = document.querySelector("#bber-talk");
    if (bberTalkElement) {
      new Swiper(".swiper-container", {
        direction: "vertical",
        loop: true,
        autoplay: {
          delay: 3000,
          pauseOnMouseEnter: true,
        },
      });
    }
  },
  addPhotoFigcaption() {
    document
      .querySelectorAll(".article-container img:not(.gallery-item img)")
      .forEach((image) => {
        const captionText = image.getAttribute("alt");
        if (captionText) {
          image.insertAdjacentHTML(
            "afterend",
            `<div class="img-alt is-center">${utils.escapeHtml(
              captionText
            )}</div>`
          );
        }
      });
  },
  scrollToComment: () =>
    utils.scrollToDest(
      utils.getEleTop(document.getElementById("post-comment")),
      300
    ),
  setTimeState() {
    const el = document.getElementById("sayhi");
    if (el) {
      const hours = new Date().getHours();
      const lang = GLOBAL_CONFIG.aside.state;

      const localData = getLocalData([
        "twikoo",
        "WALINE_USER_META",
        "WALINE_USER",
        "_v_Cache_Meta",
        "ArtalkUser",
      ]);

      function getLocalData(keys) {
        for (let key of keys) {
          const data = localStorage.getItem(key);
          if (data) {
            return JSON.parse(data);
          }
        }
        return null;
      }
      const nick = localData ? localData.nick || localData.display_name : null;

      const prefix = this.wasPageHidden
        ? GLOBAL_CONFIG.aside.witty_comment.back + nick
        : GLOBAL_CONFIG.aside.witty_comment.prefix + nick;

      const greetings = [
        { start: 0, end: 5, text: nick ? prefix : lang.goodnight },
        { start: 6, end: 10, text: nick ? prefix : lang.morning },
        { start: 11, end: 14, text: nick ? prefix : lang.noon },
        { start: 15, end: 18, text: nick ? prefix : lang.afternoon },
        { start: 19, end: 24, text: nick ? prefix : lang.night },
      ];
      const greeting = greetings.find(
        (g) => hours >= g.start && hours <= g.end
      );
      el.innerText = greeting.text;
    }
  },
  tagPageActive() {
    const decodedPath = decodeURIComponent(window.location.pathname);
    const isTagPage = /\/tags\/.*?\//.test(decodedPath);
    if (isTagPage) {
      const tag = decodedPath.split("/").slice(-2, -1)[0];
      const tagElement = document.getElementById(tag);
      if (tagElement) {
        document.querySelectorAll("a.select").forEach((link) => {
          link.classList.remove("select");
        });
        tagElement.classList.add("select");
      }
    }
  },
  categoriesBarActive() {
    const categoryBar = document.querySelector("#category-bar");
    const currentPath = decodeURIComponent(window.location.pathname);
    const isHomePage = currentPath === GLOBAL_CONFIG.root;
    if (categoryBar) {
      const categoryItems = categoryBar.querySelectorAll(".category-bar-item");
      categoryItems.forEach((item) => item.classList.remove("select"));
      const activeItemId = isHomePage
        ? "category-bar-home"
        : currentPath.split("/").slice(-2, -1)[0];
      const activeItem = document.getElementById(activeItemId);
      if (activeItem) {
        activeItem.classList.add("select");
      }
    }
  },
  scrollCategoryBarToRight() {
    const scrollBar = document.getElementById("category-bar-items");
    const nextElement = document.getElementById("category-bar-next");
    if (scrollBar) {
      const isScrollBarAtEnd = () =>
        scrollBar.scrollLeft + scrollBar.clientWidth >=
        scrollBar.scrollWidth - 8;
      const scroll = () => {
        scrollBar.scroll({
          left: isScrollBarAtEnd() ? 0 : scrollBar.clientWidth,
          behavior: "smooth",
        });
      };
      scrollBar.addEventListener("scroll", () => {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
          nextElement.style.transform = isScrollBarAtEnd()
            ? "rotate(180deg)"
            : "";
        }, 150);
      });
      scroll();
    }
  },
  openAllTags() {
    document
      .querySelectorAll(".card-allinfo .card-tag-cloud")
      .forEach((tagCloudElement) => tagCloudElement.classList.add("all-tags"));
    document.getElementById("more-tags-btn")?.remove();
  },
  listenToPageInputPress() {
    const toGroup = document.querySelector(".toPageGroup");
    const pageText = document.getElementById("toPageText");
    if (!pageText) return;
    const pageButton = document.getElementById("toPageButton");
    const pageNumbers = document.querySelectorAll(".page-number");
    const lastPageNumber = +pageNumbers[pageNumbers.length - 1].textContent;
    if (!pageText || lastPageNumber === 1) {
      toGroup.style.display = "none";
      return;
    }
    pageText.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        sco.toPage();
        pjax.loadUrl(pageButton.href);
      }
    });
    pageText.addEventListener("input", () => {
      pageButton.classList.toggle(
        "haveValue",
        pageText.value !== "" && pageText.value !== "0"
      );
      if (+pageText.value > lastPageNumber) {
        pageText.value = lastPageNumber;
      }
    });
  },
  addNavBackgroundInit() {
    const scrollTop = document.documentElement.scrollTop;
    if (scrollTop !== 0) {
      document
        .getElementById("page-header")
        .classList.add("nav-fixed", "nav-visible");
    }
  },
  toPage() {
    const pageNumbers = document.querySelectorAll(".page-number");
    const maxPageNumber = parseInt(
      pageNumbers[pageNumbers.length - 1].innerHTML
    );
    const inputElement = document.getElementById("toPageText");
    const inputPageNumber = parseInt(inputElement.value);
    document.getElementById("toPageButton").href =
      !isNaN(inputPageNumber) &&
      inputPageNumber <= maxPageNumber &&
      inputPageNumber > 1
        ? window.location.href.replace(/\/page\/\d+\/$/, "/") +
          "page/" +
          inputPageNumber +
          "/"
        : "/";
  },
  owoBig(owoSelector) {
    let owoBig = document.getElementById("owo-big");
    if (!owoBig) {
      owoBig = document.createElement("div");
      owoBig.id = "owo-big";
      document.body.appendChild(owoBig);
    }
    const showOwoBig = (event) => {
      const target = event.target;
      const owoItem = target.closest(owoSelector.item);
      if (owoItem && target.closest(owoSelector.body)) {
        const imgSrc = owoItem.querySelector("img")?.src;
        if (imgSrc) {
          owoBig.innerHTML = `<img src="${imgSrc}" style="max-width: 100%; height: auto;">`;
          owoBig.style.display = "block";
          positionOwoBig(owoItem);
        }
      }
    };
    const hideOwoBig = (event) => {
      if (
        event.target.closest(owoSelector.item) &&
        event.target.closest(owoSelector.body)
      ) {
        owoBig.style.display = "none";
      }
    };
    const positionOwoBig = (owoItem) => {
      const itemRect = owoItem.getBoundingClientRect();
      owoBig.style.left = `${itemRect.left - owoBig.offsetWidth / 4}px`;
      owoBig.style.top = `${itemRect.top}px`;
    };
    document.addEventListener("mouseover", showOwoBig);
    document.addEventListener("mouseout", hideOwoBig);
  },
  changeTimeFormat(selector) {
    selector.forEach((item) => {
      const timeVal = item.getAttribute("datetime");
      item.textContent = utils.diffDate(timeVal, true);
      item.style.display = "inline";
    });
  },
  switchComments() {
    const switchBtn = document.getElementById("switch-btn");
    if (!switchBtn) return;
    let switchDone = false;
    const commentContainer = document.getElementById("post-comment");
    const handleSwitchBtn = () => {
      commentContainer.classList.toggle("move");
      if (!switchDone && typeof loadTwoComment === "function") {
        switchDone = true;
        loadTwoComment();
      }
    };
    utils.addEventListenerPjax(switchBtn, "click", handleSwitchBtn);
  },
  homeTypeit() {
    if (typeof home_subtitle === "undefined") return;
    const ty = new TypeIt(".banners-title-small", {
      speed: 200,
      waitUntilVisible: true,
      loop: true,
      lifeLike: true,
    });
    home_subtitle.forEach((item) => {
      ty.type(item).pause(500).delete(item);
    });
    ty.go();
  },
};
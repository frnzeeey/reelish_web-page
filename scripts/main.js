// Navigation (header nav on desktop, hamburger menu on tablet / mobile) and shared page feedback.
const menuButton = document.querySelector(".menu-toggle");
const navPanel = document.querySelector(".nav-panel");
const navLinks = [...document.querySelectorAll(".nav-link")];
const toast = document.querySelector(".toast");
let toastTimeout;

// GitHub repository that publishes Reelish builds and release notes.
const REELISH_REPO = "frnzeeey/reelish";
const REELISH_RELEASES_URL = `https://github.com/${REELISH_REPO}/releases`;
const RELEASES_CACHE_KEY = "reelish-releases-v2";
const RELEASES_CACHE_MS = 10 * 60 * 1000;
let releasesRequest;

// Keep only the fields the site uses, so the session cache stays small.
const trimRelease = (release) => ({
  tag_name: release.tag_name,
  name: release.name,
  body: release.body,
  html_url: release.html_url,
  published_at: release.published_at,
  assets: release.assets.map(({ name, size, state, download_count, browser_download_url }) => ({
    name,
    size,
    state,
    download_count,
    browser_download_url,
  })),
});

function readCachedReleases() {
  try {
    const cached = JSON.parse(sessionStorage.getItem(RELEASES_CACHE_KEY));
    if (cached && Date.now() - cached.time < RELEASES_CACHE_MS && Array.isArray(cached.releases)) return cached.releases;
  } catch {
    // Storage blocked or unreadable: fetch instead.
  }
  return null;
}

// Fetch published releases once per page, newest first. Pages opened in the
// same session reuse the result for 10 minutes to stay well inside GitHub's
// unauthenticated rate limit.
function getReleases() {
  const cached = readCachedReleases();
  if (cached) return Promise.resolve(cached);
  // 100 is GitHub's page maximum, so one request covers the whole history
  // (and the download total) until there are more than 100 releases.
  releasesRequest ??= fetch(`https://api.github.com/repos/${REELISH_REPO}/releases?per_page=100`, {
    headers: { Accept: "application/vnd.github+json" },
  })
    .then((response) => (response.ok ? response.json() : Promise.reject(response.status)))
    .then((releases) => {
      const published = releases.filter((release) => !release.draft && !release.prerelease).map(trimRelease);
      try {
        sessionStorage.setItem(RELEASES_CACHE_KEY, JSON.stringify({ time: Date.now(), releases: published }));
      } catch {
        // Not cached; the next page fetches again.
      }
      return published;
    });
  return releasesRequest;
}

// Download targets. Each platform maps to one release asset published by the
// app's release workflows. Android TV / Google TV use the same APK as Android.
// Until GitHub answers, links use GitHub's "latest release" redirect.
const DOWNLOAD_PLATFORMS = {
  android: { label: "Android", action: "Download APK", note: "Phones and tablets", asset: "reelish.apk", kind: "APK" },
  tv: { label: "Android TV / Google TV", action: "Download APK", note: "Same APK as Android", asset: "reelish.apk", kind: "APK" },
  windows: { label: "Windows", action: "Download for Windows", note: "Windows 10 and 11, 64-bit installer", asset: "Reelish-Setup-x64.exe", kind: "Windows installer" },
};
const TRUSTED_DOWNLOAD_PREFIX = `https://github.com/${REELISH_REPO}/releases/download/`;
const fallbackDownloadUrl = (platform) => `${REELISH_RELEASES_URL}/latest/download/${DOWNLOAD_PLATFORMS[platform].asset}`;
const formatSize = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

// Total downloads of the app files (APK, Windows installer and ZIP) across
// every published release, as counted by GitHub. Checksums and any other
// attachments are left out. GitHub counts every download, including the
// in-app updater's, so the figure is downloads, not people.
const APP_ASSET_PATTERN = /\.(apk|exe|zip)$/i;
const countDownloads = (releases) =>
  releases.reduce(
    (total, release) =>
      total +
      release.assets
        .filter((asset) => APP_ASSET_PATTERN.test(asset.name) && asset.state === "uploaded")
        .reduce((sum, asset) => sum + (Number(asset.download_count) || 0), 0),
    0,
  );

// Review form (submitted to Netlify Forms as a normal POST): live character
// count, and no double submissions.
const reviewForm = document.querySelector(".review-form");
if (reviewForm) {
  const reviewText = reviewForm.querySelector("textarea[name='review']");
  const reviewLength = reviewForm.querySelector(".review-length");
  const updateLength = () => {
    const count = reviewText.value.length;
    reviewLength.textContent = count ? `${count} / ${reviewText.maxLength} characters` : `${reviewText.minLength} to ${reviewText.maxLength} characters`;
    reviewLength.classList.toggle("is-short", count > 0 && count < reviewText.minLength);
  };
  reviewText.addEventListener("input", updateLength);
  const submit = reviewForm.querySelector("[type='submit']");
  reviewForm.addEventListener("submit", () => {
    submit.disabled = true;
    submit.textContent = "Sending…";
  });
  // Going back to the page (back/forward cache) re-enables the button.
  window.addEventListener("pageshow", () => {
    submit.disabled = false;
    submit.textContent = "Submit review";
  });
}

// Fill in [data-download-count] elements; they stay hidden if GitHub can't be
// reached, so no made-up number is ever shown.
const downloadCountTargets = document.querySelectorAll("[data-download-count]");
if (downloadCountTargets.length) {
  getReleases()
    .then((releases) => {
      const total = countDownloads(releases);
      if (!total) return;
      const formatted = new Intl.NumberFormat().format(total);
      downloadCountTargets.forEach((target) => {
        target.querySelector("[data-download-count-value]").textContent = formatted;
        target.hidden = false;
      });
    })
    .catch(() => {
      // Keep the count hidden.
    });
}

// The newest release that carries a platform's asset, or null. A release can
// briefly lack the Windows installer (attached by a separate workflow), so
// older releases are checked too and the version is always shown. Only fully
// uploaded assets on this repository's download path are accepted.
function findDownload(releases, platform) {
  const { asset: assetName } = DOWNLOAD_PLATFORMS[platform];
  for (const release of releases) {
    const asset = release.assets.find((item) => item.name === assetName);
    if (asset && asset.state === "uploaded" && asset.browser_download_url.startsWith(TRUSTED_DOWNLOAD_PREFIX)) {
      return { url: asset.browser_download_url, size: asset.size, version: release.tag_name, isLatest: release === releases[0] };
    }
  }
  return null;
}

let downloadsRequest;
// Resolves to { android, tv, windows } download info, or rejects when GitHub
// can't be reached (links then keep their "latest release" fallback).
function getDownloads() {
  downloadsRequest ??= getReleases().then((releases) =>
    Object.fromEntries(Object.keys(DOWNLOAD_PLATFORMS).map((platform) => [platform, findDownload(releases, platform)])),
  );
  return downloadsRequest;
}

// Point every [data-download] link (menus and standalone buttons) at the
// resolved asset. A platform with no published asset links to the releases
// page instead and says so.
function applyDownloads(downloads) {
  document.querySelectorAll("[data-download]").forEach((link) => {
    const platform = link.dataset.download;
    const info = downloads[platform];
    const meta = link.querySelector(".download-option-meta");
    link.href = info ? info.url : REELISH_RELEASES_URL;
    link.dataset.version = info ? info.version : "";
    link.toggleAttribute("data-unavailable", !info);
    if (meta) meta.textContent = info ? `${info.version} · ${formatSize(info.size)}` : "Not available right now";
  });
}

function showDownloadError() {
  document.querySelectorAll(".download-option-meta").forEach((meta) => {
    meta.textContent = "";
  });
  document.querySelectorAll(".download-menu-status").forEach((status) => {
    status.hidden = false;
  });
}

let downloadsResolved = false;
function resolveDownloads() {
  if (downloadsResolved) return;
  downloadsResolved = true;
  getDownloads().then(applyDownloads, showDownloadError);
}

// Confirm which download was started. The browser handles the download itself,
// so the message describes the request rather than claiming it finished.
function announceDownload(link) {
  const platform = DOWNLOAD_PLATFORMS[link.dataset.download];
  if (!platform) return;
  if (link.hasAttribute("data-unavailable")) {
    showToast(`No ${platform.label} build is published right now. Opening GitHub Releases…`);
    return;
  }
  const version = link.dataset.version ? ` ${link.dataset.version}` : "";
  showToast(`Starting the Reelish${version} ${platform.kind} download from GitHub…`);
}

const escapeHtml = (text) =>
  text.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

const releaseDateFormat = new Intl.DateTimeFormat(undefined, { year: "numeric", month: "short", day: "numeric" });

// Open or close the tablet / mobile menu and keep its accessible state in sync.
function setMenuOpen(isOpen) {
  if (!menuButton) return;
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  navPanel.classList.toggle("is-open", isOpen);
}

if (menuButton) {
  menuButton.addEventListener("click", () => {
    setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
  });

  // Escape and clicks outside the menu close it.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navPanel.classList.contains("is-open")) {
      setMenuOpen(false);
      menuButton.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!navPanel.contains(event.target) && !menuButton.contains(event.target)) setMenuOpen(false);
  });
}

// Track the selected navigation link and close the menu after navigating.
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("is-active"));
    link.classList.add("is-active");
    setMenuOpen(false);
  });
});

// Platform download menus. Each [data-download-menu] link (a plain APK link
// without JavaScript) becomes a menu button that lists every platform.
const downloadIcons = {
  chevron: '<path d="m6 9 6 6 6-6" />',
  android: '<path d="M7 9.5h10v7a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 7 16.5v-7ZM7 8a5 5 0 0 1 10 0M9 4 8 2.5M15 4l1-1.5M9.5 18v3m5-3v3M4.5 10v5m15-5v5" />',
  tv: '<rect x="3" y="5" width="18" height="12" rx="2" /><path d="M8 21h8m-4-4v4" />',
  windows: '<path d="M4 5.5 11 4.5v7H4zM13 4.2l7-1v8.3h-7zM4 12.5h7v7l-7-1zM13 12.5h7v8.3l-7-1z" />',
};
const svgIcon = (name, className) => `<svg class="${className}" viewBox="0 0 24 24" aria-hidden="true">${downloadIcons[name]}</svg>`;

let downloadMenuCount = 0;
const openDownloadMenus = new Set();

function createDownloadMenu(link) {
  downloadMenuCount += 1;
  const menuId = `download-menu-${downloadMenuCount}`;
  const wrapper = document.createElement("div");
  wrapper.className = "download-menu";

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = `${link.className} download-menu-toggle`;
  toggle.setAttribute("aria-haspopup", "menu");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-controls", menuId);
  toggle.append(...link.childNodes);
  toggle.insertAdjacentHTML("beforeend", svgIcon("chevron", "download-menu-chevron"));

  const panel = document.createElement("div");
  panel.className = "download-menu-panel";
  panel.innerHTML = `
    <p class="download-menu-title" id="${menuId}-title">Choose your platform</p>
    <div class="download-menu-list" id="${menuId}" role="menu" aria-labelledby="${menuId}-title">
      ${Object.entries(DOWNLOAD_PLATFORMS)
        .map(
          ([platform, info]) => `
        <a class="download-option" role="menuitem" tabindex="-1" data-download="${platform}" href="${fallbackDownloadUrl(platform)}">
          <span class="download-option-icon">${svgIcon(platform, "download-option-svg")}</span>
          <span class="download-option-text">
            <span class="download-option-head">
              <strong>${info.label}</strong>
              <span class="download-option-meta">${downloadsResolved ? "" : "Checking…"}</span>
            </span>
            <span>${info.action} <span class="download-option-note">· ${info.note}</span></span>
          </span>
        </a>`,
        )
        .join("")}
    </div>
    <p class="download-menu-status" hidden>Couldn’t reach GitHub, so these links open the latest release. <a href="${REELISH_RELEASES_URL}" target="_blank" rel="noopener noreferrer">All releases</a></p>`;

  wrapper.append(toggle, panel);
  link.replaceWith(wrapper);

  const items = () => [...panel.querySelectorAll('[role="menuitem"]')];
  const setOpen = (isOpen, focus) => {
    if (isOpen) {
      openDownloadMenus.forEach((close) => close());
      resolveDownloads();
      openDownloadMenus.add(close);
    } else {
      openDownloadMenus.delete(close);
    }
    toggle.setAttribute("aria-expanded", String(isOpen));
    wrapper.classList.toggle("is-open", isOpen);
    if (isOpen && focus) items()[focus === "last" ? items().length - 1 : 0].focus();
  };
  const close = () => setOpen(false);

  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  toggle.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true, event.key === "ArrowUp" ? "last" : "first");
    }
  });
  // Hovering or focusing the button warms up the release lookup.
  toggle.addEventListener("pointerenter", resolveDownloads, { once: true });
  toggle.addEventListener("focus", resolveDownloads, { once: true });

  panel.addEventListener("keydown", (event) => {
    const list = items();
    const index = list.indexOf(document.activeElement);
    const moves = { ArrowDown: index + 1, ArrowUp: index - 1, Home: 0, End: list.length - 1 };
    if (event.key in moves && index > -1) {
      event.preventDefault();
      list[(moves[event.key] + list.length) % list.length].focus();
    } else if (event.key === "Escape") {
      event.stopPropagation();
      setOpen(false);
      toggle.focus();
    } else if (event.key === "Tab") {
      setOpen(false);
    } else if (event.key === " " && index > -1) {
      event.preventDefault();
      list[index].click();
    }
  });

  panel.querySelectorAll("[data-download]").forEach((item) => {
    item.addEventListener("click", () => {
      announceDownload(item);
      setOpen(false);
    });
  });

  document.addEventListener("click", (event) => {
    if (!wrapper.contains(event.target)) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && wrapper.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
}

document.querySelectorAll("[data-download-menu]").forEach(createDownloadMenu);

// Standalone platform buttons (outside a menu) use the same resolved targets.
document.querySelectorAll("[data-download]:not(.download-option)").forEach((link) => {
  link.addEventListener("click", () => announceDownload(link));
});
if (document.querySelector("[data-download]:not(.download-option)")) resolveDownloads();

// Display a temporary status message.
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

// Give the sticky header a solid backdrop once the page has scrolled.
const siteHeader = document.querySelector(".site-header");
function updateHeader() {
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 8);
}
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

// Highlight the nav link for the in-page section currently in view.
const spyLinks = navLinks.filter((link) => link.getAttribute("href").startsWith("#"));
const spySections = spyLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
if (spySections.length && "IntersectionObserver" in window) {
  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("is-active", isCurrent);
          if (isCurrent) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  spySections.forEach((section) => spyObserver.observe(section));
}

// App showcase carousel elements and slide content.
const showcase = document.querySelector(".showcase-carousel");
if (showcase) {
const showcaseScreen = document.querySelector("#showcase-screen");
const showcaseTitle = document.querySelector(".showcase-slide-title");
const showcaseDots = document.querySelector(".showcase-dots");
const showcaseSlides = [
  { title: "Home Screen", src: "assets/app-showcase/1.png" },
  { title: "Movie Details", src: "assets/app-showcase/2.png" },
  { title: "Plugins", src: "assets/app-showcase/3.png" },
  { title: "My Library", src: "assets/app-showcase/4.png" },
  { title: "Settings", src: "assets/app-showcase/5.png" },
];
let activeShowcaseSlide = 0;

// Display a supplied app screenshot and synchronize the title and pagination.
function renderShowcaseSlide(index, animate = true) {
  activeShowcaseSlide = (index + showcaseSlides.length) % showcaseSlides.length;
  const slide = showcaseSlides[activeShowcaseSlide];
  const swapImage = () => {
    showcaseScreen.src = slide.src;
    showcaseScreen.alt = `Reelish ${slide.title}`;
    showcaseScreen.classList.remove("is-changing");
  };
  if (animate) {
    showcaseScreen.classList.add("is-changing");
    window.setTimeout(swapImage, 180);
  } else {
    swapImage();
  }
  showcaseTitle.textContent = slide.title;

  [...showcaseDots.children].forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeShowcaseSlide;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-pressed", String(isActive));
  });
}

// Create one accessible pagination button for each app screen.
showcaseSlides.forEach((slide, index) => {
  const dot = document.createElement("button");
  dot.className = "showcase-dot";
  dot.type = "button";
  dot.setAttribute("aria-label", `Show ${slide.title}`);
  dot.setAttribute("aria-pressed", "false");
  dot.addEventListener("click", () => renderShowcaseSlide(index));
  showcaseDots.append(dot);
});

// Move backward or forward through the showcase screens.
showcase.querySelector(".showcase-previous").addEventListener("click", () => {
  renderShowcaseSlide(activeShowcaseSlide - 1);
});

showcase.querySelector(".showcase-next").addEventListener("click", () => {
  renderShowcaseSlide(activeShowcaseSlide + 1);
});

// Support left and right arrow keys while focus is inside the carousel.
showcase.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") renderShowcaseSlide(activeShowcaseSlide - 1);
  if (event.key === "ArrowRight") renderShowcaseSlide(activeShowcaseSlide + 1);
});

// Support horizontal swipes on touch screens.
let touchStartX = null;
showcase.addEventListener("touchstart", (event) => {
  touchStartX = event.touches[0].clientX;
}, { passive: true });
showcase.addEventListener("touchend", (event) => {
  if (touchStartX === null) return;
  const deltaX = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(deltaX) > 40) renderShowcaseSlide(activeShowcaseSlide + (deltaX < 0 ? 1 : -1));
  touchStartX = null;
});

// Preload the remaining screens so slide changes don't flash.
showcaseSlides.slice(1).forEach((slide) => {
  new Image().src = slide.src;
});

// Render the initial carousel screen.
renderShowcaseSlide(0, false);
}

// Playback demo controls and simulated preview timeline.
const playbackPlayer = document.querySelector("#playback-player");
if (playbackPlayer) {
const playbackMainToggle = document.querySelector(".playback-main-toggle");
const playbackToggle = document.querySelector(".playback-toggle");
const playbackFrameImage = document.querySelector(".playback-frame-image");
const playbackTimeline = document.querySelector(".playback-timeline");
const playbackTime = document.querySelector(".playback-time");
const playbackSubtitle = document.querySelector(".playback-subtitle");
const playbackCaptions = document.querySelector(".playback-captions");
const playbackSettingsToggle = document.querySelector(".playback-settings-toggle");
const playbackOptions = document.querySelector(".playback-options");
let playbackTimer;

function formatPlaybackTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  }

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function updatePlaybackProgress() {
  const current = Number(playbackTimeline.value);
  const duration = Number(playbackTimeline.max);
  const progress = (current / duration) * 100;

  playbackTimeline.style.setProperty("--progress", `${progress}%`);
  playbackTime.textContent = `${formatPlaybackTime(current)} / ${formatPlaybackTime(duration)}`;
}

function setPlaybackPlaying(isPlaying) {
  playbackPlayer.classList.toggle("is-playing", isPlaying);
  playbackFrameImage.src = isPlaying
    ? "assets/playback/playing.png"
    : "assets/playback/paused.png";
  [playbackMainToggle, playbackToggle].forEach((button) => {
    button.setAttribute("aria-pressed", String(isPlaying));
    button.setAttribute("aria-label", isPlaying ? "Pause preview" : "Play preview");
  });

  window.clearInterval(playbackTimer);
  if (isPlaying) {
    playbackTimer = window.setInterval(() => {
      const nextTime = Number(playbackTimeline.value) + 1;
      playbackTimeline.value = String(nextTime >= Number(playbackTimeline.max) ? 0 : nextTime);
      updatePlaybackProgress();
    }, 1000);
  }
}

// Toggle playback from either play button.
[playbackMainToggle, playbackToggle].forEach((button) => {
  button.addEventListener("click", () => {
    setPlaybackPlaying(!playbackPlayer.classList.contains("is-playing"));
  });
});

// Keep the mock playback position synchronized with the range control.
playbackTimeline.addEventListener("input", updatePlaybackProgress);
document.querySelector(".playback-skip-back").addEventListener("click", () => {
  playbackTimeline.value = String(Math.max(0, Number(playbackTimeline.value) - 10));
  updatePlaybackProgress();
});
document.querySelector(".playback-skip-forward").addEventListener("click", () => {
  playbackTimeline.value = String(Math.min(Number(playbackTimeline.max), Number(playbackTimeline.value) + 10));
  updatePlaybackProgress();
});

// Toggle subtitle visibility and expose the current state to assistive tech.
playbackCaptions.addEventListener("click", () => {
  const isEnabled = playbackCaptions.getAttribute("aria-pressed") === "true";
  playbackCaptions.setAttribute("aria-pressed", String(!isEnabled));
  playbackSubtitle.classList.toggle("is-hidden", isEnabled);
});

// Open video scaling options and apply the selected preview mode.
playbackSettingsToggle.addEventListener("click", () => {
  const isExpanded = playbackSettingsToggle.getAttribute("aria-expanded") === "true";
  playbackSettingsToggle.setAttribute("aria-expanded", String(!isExpanded));
  playbackOptions.hidden = isExpanded;
});

playbackOptions.querySelectorAll("[data-scale]").forEach((option) => {
  option.addEventListener("click", () => {
    playbackOptions.querySelectorAll("[data-scale]").forEach((item) => {
      item.classList.toggle("is-selected", item === option);
      item.setAttribute("aria-pressed", String(item === option));
    });
    playbackPlayer.dataset.scale = option.dataset.scale.toLowerCase();
    playbackOptions.hidden = true;
    playbackSettingsToggle.setAttribute("aria-expanded", "false");
  });
});

// Close the scaling menu on outside clicks or Escape.
function closePlaybackOptions() {
  playbackOptions.hidden = true;
  playbackSettingsToggle.setAttribute("aria-expanded", "false");
}
document.addEventListener("click", (event) => {
  if (!playbackOptions.contains(event.target) && !playbackSettingsToggle.contains(event.target)) closePlaybackOptions();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePlaybackOptions();
});

// Use the browser's fullscreen mode for the player preview.
document.querySelector(".playback-fullscreen").addEventListener("click", () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else if (playbackPlayer.requestFullscreen) {
    playbackPlayer.requestFullscreen();
  }
});

// Preload the playing frame so the first toggle doesn't flash.
new Image().src = "assets/playback/playing.png";

// Start at the reference preview position.
updatePlaybackProgress();
}

// Guides page: filter cards by category chip and search text.
const guideSearch = document.querySelector("#guide-search");
if (guideSearch) {
const guideFilters = [...document.querySelectorAll(".guide-filter")];
const guideGroups = [...document.querySelectorAll(".guide-group")];
const guidesEmpty = document.querySelector("#guides-empty");
const guidesStatus = document.querySelector("#guides-status");
let activeGuideFilter = "all";

function applyGuideFilters() {
  const query = guideSearch.value.trim().toLowerCase();
  let visibleCount = 0;

  guideGroups.forEach((group) => {
    const categoryMatches = activeGuideFilter === "all" || group.dataset.category === activeGuideFilter;
    let groupCount = 0;

    group.querySelectorAll(".guide-card").forEach((card) => {
      const matches = categoryMatches && (!query || card.textContent.toLowerCase().includes(query));
      card.hidden = !matches;
      if (matches) groupCount += 1;
    });

    group.hidden = groupCount === 0;
    visibleCount += groupCount;
  });

  guidesEmpty.hidden = visibleCount > 0;
  guidesStatus.textContent = `${visibleCount} ${visibleCount === 1 ? "guide" : "guides"} shown`;
}

guideFilters.forEach((button) => {
  button.addEventListener("click", () => {
    activeGuideFilter = button.dataset.filter;
    guideFilters.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    applyGuideFilters();
  });
});

guideSearch.addEventListener("input", applyGuideFilters);
}

// Guide articles: highlight the "On this page" link for the section in view.
const guideTocLinks = [...document.querySelectorAll(".guide-toc a")];
if (guideTocLinks.length && "IntersectionObserver" in window) {
  const tocObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        guideTocLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-20% 0px -70% 0px" },
  );
  guideTocLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (section) tocObserver.observe(section);
  });
}

// Home page: latest version next to "Available for Android" and the release card.
const latestReleaseCard = document.querySelector("#latest-release");
const latestVersionChips = document.querySelectorAll("[data-latest-version]");
if (latestReleaseCard || latestVersionChips.length) {
  Promise.all([getReleases(), getDownloads()])
    .then(([releases, downloads]) => {
      const latest = releases[0];
      if (!latest) return;

      latestVersionChips.forEach((chip) => {
        chip.textContent = latest.tag_name;
        chip.hidden = false;
      });

      if (!latestReleaseCard) return;
      // One button per distinct file: Android and Android TV share the APK.
      const files = ["android", "windows"]
        .map((platform) => ({ platform, info: downloads[platform] }))
        .filter(({ info }) => info);
      const summary = files
        .map(({ platform, info }) => `${DOWNLOAD_PLATFORMS[platform].kind} ${info.isLatest ? "" : `${escapeHtml(info.version)} `}· ${formatSize(info.size)}`)
        .join(" &nbsp;|&nbsp; ");

      latestReleaseCard.classList.add("is-loaded");
      latestReleaseCard.innerHTML = `
        <div class="latest-release-head">
          <span class="release-version">${escapeHtml(latest.tag_name)}</span>
          <span class="release-latest">Latest</span>
          <time datetime="${latest.published_at}">${releaseDateFormat.format(new Date(latest.published_at))}</time>
        </div>
        <h3>${escapeHtml(latest.name || latest.tag_name)}</h3>
        <p>${summary || "No downloads are attached to this release yet."}</p>
        <div class="latest-release-actions">
          ${files
            .map(
              ({ platform, info }, index) => `
          <a class="button ${index === 0 ? "button-primary" : "button-quiet"}" data-download="${platform}" data-version="${escapeHtml(info.version)}" href="${info.url}">
            <svg aria-hidden="true" viewBox="0 0 24 24">${downloadIcons[platform]}</svg>
            ${platform === "windows" ? "Windows" : "Android"}
          </a>`,
            )
            .join("")}
          <a class="button button-quiet" href="changelog.html">
            Release notes
            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
          </a>
        </div>`;
      latestReleaseCard.querySelectorAll("[data-download]").forEach((link) => {
        link.addEventListener("click", () => announceDownload(link));
      });
    })
    .catch(() => {
      // Keep the static fallback card when GitHub can't be reached.
    });
}

// Changelog page: render every release from GitHub as a timeline.
const releaseTimeline = document.querySelector("#release-timeline");
if (releaseTimeline) {
const changelogEmpty = document.querySelector("#changelog-empty");
const releaseIndex = document.querySelector("#release-index");
const changelogLatest = document.querySelector("#changelog-latest");

// Light inline markdown: bare URLs, [links](https://…), **bold**, *italic* and `code`.
const formatInline = (text) =>
  escapeHtml(text)
    .replace(/(^|\s)(https?:\/\/[^\s<]+?)(?=[.,;:!?)]?(?:\s|$))/g, '$1<a href="$2" target="_blank" rel="noopener noreferrer">$2</a>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?!\*)/g, "$1<em>$2</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>");

// Conventional-commit prefixes ("feat:", "fix(android):") become inline tags.
const commitPrefix = /^(feat|fix|perf|refactor|security|i18n|docs|chore|build|style|ui)(\([^)]*\))?!?:\s*/i;

function renderReleaseItem(item) {
  const match = item.match(commitPrefix);
  if (!match) return `<li>${formatInline(item)}</li>`;

  const kind = match[1].toLowerCase();
  const tag =
    kind === "feat" ? { label: "New", type: "new" }
    : kind === "fix" ? { label: "Fixed", type: "fixed" }
    : { label: "Improved", type: "improved" };
  return `<li class="has-tag"><span class="release-tag release-tag-${tag.type} release-tag-inline">${tag.label}</span><span>${formatInline(item.slice(match[0].length))}</span></li>`;
}

// Map a notes heading such as "### Bug fixes" to a release tag.
function releaseTagFor(heading) {
  const text = heading.toLowerCase();
  if (/fix|bug/.test(text)) return { label: "Fixed", type: "fixed" };
  if (/improv|change|enhanc|update|perf/.test(text)) return { label: "Improved", type: "improved" };
  if (/add|new|feat/.test(text)) return { label: "New", type: "new" };
  return null;
}

// Turn a release body into sections of paragraphs, bullet lists and
// GitHub-style callouts ("> [!IMPORTANT]"), keeping their original order.
function renderReleaseNotes(body) {
  const groups = [];
  let current = null;
  let lastBlock = null;

  const startGroup = (heading) => {
    current = { heading, blocks: [] };
    groups.push(current);
    lastBlock = null;
  };

  const addBlock = (block) => {
    current.blocks.push(block);
    lastBlock = block;
  };

  (body || "").split(/\r?\n/).forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      lastBlock = null;
      return;
    }

    const heading = line.match(/^#{1,6}\s+(.*)/);
    if (heading) {
      startGroup(heading[1]);
      return;
    }
    if (!current) startGroup("");

    const quote = line.match(/^>\s?(.*)/);
    if (quote) {
      const alert = quote[1].match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]$/i);
      if (alert) addBlock({ type: "callout", kind: alert[1].toLowerCase(), lines: [] });
      else if (lastBlock && lastBlock.type === "callout") {
        if (quote[1]) lastBlock.lines.push(quote[1]);
      } else addBlock({ type: "callout", kind: "note", lines: quote[1] ? [quote[1]] : [] });
      return;
    }

    const bullet = line.match(/^[-*+]\s+(.*)/);
    if (bullet) {
      if (lastBlock && lastBlock.type === "list") lastBlock.items.push(bullet[1]);
      else addBlock({ type: "list", items: [bullet[1]] });
      return;
    }

    addBlock({ type: "paragraph", text: line });
  });

  if (!groups.length) return "<p>No release notes were provided.</p>";

  const calloutLabels = { note: "Note", tip: "Tip", important: "Important", warning: "Warning", caution: "Caution" };

  const renderBlock = (block) => {
    if (block.type === "paragraph") return `<p>${formatInline(block.text)}</p>`;
    if (block.type === "list") return `<ul>${block.items.map(renderReleaseItem).join("")}</ul>`;
    return `
      <div class="release-callout release-callout-${block.kind}">
        <strong class="release-callout-label">${calloutLabels[block.kind]}</strong>
        ${block.lines.map((text) => `<p>${formatInline(text)}</p>`).join("")}
      </div>`;
  };

  return groups
    .map((group) => {
      const tag = releaseTagFor(group.heading);
      const title = tag
        ? `<h3><span class="release-tag release-tag-${tag.type}">${tag.label}</span></h3>`
        : group.heading
          ? `<h3 class="release-notes-heading">${formatInline(group.heading)}</h3>`
          : "";
      return `<div class="release-notes-group">${title}${group.blocks.map(renderBlock).join("")}</div>`;
    })
    .join("");
}

function renderReleases(releases) {
  const dateFormat = new Intl.DateTimeFormat(undefined, { year: "numeric", month: "short", day: "numeric" });

  releaseTimeline.innerHTML = releases
    .map((release, index) => {
      const id = `release-${release.tag_name.replace(/[^\w-]/g, "-")}`;
      const date = new Date(release.published_at);
      return `
        <li class="release-entry${index === 0 ? " is-latest" : ""}">
          <article class="release-card-item" id="${id}">
            <div class="release-card-head">
              <span class="release-version">${escapeHtml(release.tag_name)}</span>
              ${index === 0 ? '<span class="release-latest">Latest</span>' : ""}
              <time datetime="${release.published_at}">${dateFormat.format(date)}</time>
            </div>
            ${release.name && release.name !== release.tag_name ? `<h2>${escapeHtml(release.name)}</h2>` : ""}
            <div class="release-notes">${renderReleaseNotes(release.body)}</div>
            <a class="release-card-link" href="${release.html_url}" target="_blank" rel="noopener noreferrer">
              View release on GitHub
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
            </a>
          </article>
        </li>`;
    })
    .join("");

  releaseIndex.querySelector("ol").innerHTML = releases
    .map((release) => {
      const id = `release-${release.tag_name.replace(/[^\w-]/g, "-")}`;
      const year = new Date(release.published_at).getFullYear();
      return `<li><a href="#${id}">${escapeHtml(release.tag_name)} <small>${year}</small></a></li>`;
    })
    .join("");

  releaseIndex.hidden = false;
  changelogLatest.querySelector("strong").textContent = releases[0].tag_name;
  changelogLatest.hidden = false;
  changelogEmpty.hidden = true;
}

getReleases()
  .then((releases) => {
    if (releases.length) renderReleases(releases);
  })
  .catch(() => {
    // Keep the empty state visible when GitHub can't be reached.
  });
}

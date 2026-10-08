// Content for every guide page. Run `node tools/build-guides.js` after editing.
//
// Each guide's `body` is HTML. Available building blocks:
//   <h2>                         section heading (listed in "On this page")
//   <ol class="guide-steps">     numbered steps
//   <span class="ui">Plugins</span>   an on-screen label or button
//   <div class="guide-callout guide-callout-note|tip|warning">
//     <strong>Title</strong><p>…</p></div>
//   <table class="guide-table">  reference tables

const categories = {
  "getting-started": { label: "Getting Started", icon: "book" },
  installation: { label: "Installation", icon: "download" },
  plugins: { label: "Plugins", icon: "puzzle" },
  playback: { label: "Playback", icon: "play" },
  troubleshooting: { label: "Troubleshooting", icon: "help" },
};

const guides = [
  // ---------------------------------------------------------------- Getting Started
  {
    slug: "introduction-to-reelish",
    category: "getting-started",
    title: "Introduction to Reelish",
    description: "An overview of what Reelish is and how it works.",
    body: `
      <p>Reelish is an open-source Android app for discovering movies and TV series and watching them with the providers you choose. It combines a polished catalog, a personal library and a built-in video player in one place.</p>

      <h2>How Reelish works</h2>
      <p>Reelish splits the job of “finding something to watch” and “playing it” into separate pieces:</p>
      <ul>
        <li><strong>The catalog comes from TMDB.</strong> Titles, artwork, synopses, genres, cast and recommendations are loaded from The Movie Database.</li>
        <li><strong>Streams come from providers you install.</strong> When you press play, Reelish asks your enabled providers for playable sources for that title. Providers don’t add titles to the catalog — they only answer “where can this be played?”.</li>
        <li><strong>Playback happens in the built-in player.</strong> It supports direct HTTP(S) streams, external subtitles, playback speed, aspect ratio and more. On Android, compatible providers can also return torrent sources for P2P playback.</li>
      </ul>

      <h2>What Reelish doesn’t do</h2>
      <p>Reelish does not host, store or distribute any media. Providers are third-party code published by independent authors, and the sources they return are operated by others. Install repositories only from publishers you trust.</p>
      <div class="guide-callout guide-callout-note">
        <strong>Your data stays on your device</strong>
        <p>Favorites, watch history, playback progress, settings and provider choices are stored locally. TMDB, provider publishers, stream hosts and subtitle services only receive the requests needed for the features you use.</p>
      </div>

      <h2>What you need</h2>
      <ul>
        <li>An Android phone or tablet.</li>
        <li>The latest <code>reelish.apk</code> from GitHub Releases.</li>
        <li>At least one provider repository, added from the <span class="ui">Plugins</span> tab.</li>
      </ul>

      <h2>Where to go next</h2>
      <p>Start with <a href="downloading-the-apk.html">Downloading the APK</a> and <a href="installing-on-android.html">Installing on Android</a>, then read <a href="understanding-third-party-plugins.html">Understanding Third-Party Plugins</a> before you add your first provider.</p>
    `,
  },
  {
    slug: "navigating-the-app",
    category: "getting-started",
    title: "Navigating the App",
    description: "Learn how to find your way around the Reelish interface.",
    body: `
      <p>Reelish is organized around four tabs in the floating dock at the bottom of the screen: <span class="ui">Home</span>, <span class="ui">Plugins</span>, <span class="ui">Library</span> and <span class="ui">Settings</span>.</p>

      <h2>Home</h2>
      <p>Home is where discovery happens.</p>
      <ul>
        <li><strong>Reelish Spotlight</strong> — a rotating, full-width feature at the top. Tap <span class="ui">Details</span> to open the title or <span class="ui">My list</span> to save it.</li>
        <li><strong>Category chips</strong> — switch between <span class="ui">For you</span>, <span class="ui">Movies</span>, <span class="ui">Series</span> and the other categories to change what the rows below show.</li>
        <li><strong>Rows</strong> such as <span class="ui">Continue watching</span>, recommendations and <span class="ui">New releases</span>.</li>
        <li><strong>Search</strong> — tap the magnifying glass in the top-right corner to search the whole catalog.</li>
      </ul>

      <h2>Title details</h2>
      <p>Opening a title shows its artwork, rating, <span class="ui">Synopsis</span>, <span class="ui">Genres</span> and <span class="ui">Cast</span>. For movies, tap <span class="ui">Play movie</span>. For series, pick a season, then <span class="ui">Choose episode and play</span>. Reelish then searches your enabled providers for a stream.</p>

      <h2>Plugins</h2>
      <p>The Plugins tab manages where streams come from. You can browse the community library, paste a provider manifest URL, see your active sources and turn individual providers on or off. See <a href="managing-providers.html">Managing Providers</a>.</p>

      <h2>Library</h2>
      <p><span class="ui">My library</span> keeps everything you are watching and saving in one place. Use the <span class="ui">Everything</span>, <span class="ui">Continue</span> and <span class="ui">Favorites</span> filters to narrow it down.</p>
      <ul>
        <li><span class="ui">Continue watching</span> — titles you paused, ready to resume where you left off.</li>
        <li><span class="ui">Your favorites</span> — titles saved from their details page.</li>
        <li><span class="ui">Recently watched</span> — your latest activity. You can remove items from your watch history.</li>
      </ul>

      <h2>Settings</h2>
      <p>Settings is where you make Reelish work the way you like:</p>
      <ul>
        <li><span class="ui">Appearance</span> — the accent color used for highlights and controls.</li>
        <li><span class="ui">Playback</span> — player, stream selection, subtitles and P2P options.</li>
        <li><span class="ui">Subtitle addons</span> — the subtitle sources searched while you watch.</li>
        <li><span class="ui">About Reelish</span> — version, build details and update checks.</li>
        <li>Credits, open-source licenses, the privacy policy and the terms of use.</li>
      </ul>
    `,
  },

  // ---------------------------------------------------------------- Installation
  {
    slug: "downloading-the-apk",
    category: "installation",
    title: "Downloading the APK",
    description: "How to safely download the Reelish APK from official sources.",
    body: `
      <p>Reelish is distributed as an Android APK file. The only official source is the project’s <a href="https://github.com/frnzeeey/reelish/releases" target="_blank" rel="noopener noreferrer">GitHub Releases</a> page.</p>

      <h2>Get the latest version</h2>
      <ol class="guide-steps">
        <li>On your Android device, tap any <span class="ui">Download</span> button on this website. It always points to the newest release.</li>
        <li>Alternatively, open <a href="https://github.com/frnzeeey/reelish/releases/latest" target="_blank" rel="noopener noreferrer">the latest release on GitHub</a> and tap <code>reelish.apk</code> under <span class="ui">Assets</span>.</li>
        <li>Wait for the download to finish, then continue with <a href="installing-on-android.html">Installing on Android</a>.</li>
      </ol>

      <div class="guide-callout guide-callout-warning">
        <strong>Avoid mirrors and re-uploads</strong>
        <p>Only download Reelish from GitHub Releases. APKs from other sites may be outdated or modified. Official builds are produced automatically by the project’s release workflow and signed with the same key every time.</p>
      </div>

      <h2>What’s in each release</h2>
      <ul>
        <li><code>reelish.apk</code> — the app itself.</li>
        <li><code>reelish.apk.sha256</code> — the file’s SHA-256 checksum, so you can confirm the download is intact.</li>
        <li>Release notes listing what changed, plus the version number, source commit and the build run that produced it.</li>
      </ul>

      <h2>Verify the download (optional)</h2>
      <p>If you downloaded the APK on a computer, you can compare its checksum with the one published in the release notes or in <code>reelish.apk.sha256</code>:</p>
      <ul>
        <li><strong>Windows:</strong> <code>certutil -hashfile reelish.apk SHA256</code></li>
        <li><strong>macOS / Linux:</strong> <code>shasum -a 256 reelish.apk</code></li>
      </ul>
      <p>The two values must match exactly. If they don’t, delete the file and download it again.</p>
      <div class="guide-callout guide-callout-tip">
        <strong>The in-app updater checks this for you</strong>
        <p>Once Reelish is installed, updates downloaded inside the app are verified automatically before Android’s installer opens. See <a href="updating-reelish.html">Updating Reelish</a>.</p>
      </div>
    `,
  },
  {
    slug: "installing-on-android",
    category: "installation",
    title: "Installing on Android",
    description: "Step-by-step installation from APK to launch.",
    body: `
      <p>Because Reelish is installed from an APK rather than an app store, Android asks you to confirm that you trust the app you used to download it. This is a one-time step.</p>

      <h2>Install the APK</h2>
      <ol class="guide-steps">
        <li>Download <code>reelish.apk</code> as described in <a href="downloading-the-apk.html">Downloading the APK</a>.</li>
        <li>Open the downloaded file from your browser’s downloads, the notification shade or your Files app.</li>
        <li>If Android says installing from this source isn’t allowed, tap <span class="ui">Settings</span> and turn on <span class="ui">Allow from this source</span>. The exact wording varies by device. You can also find it under <span class="ui">Settings → Apps → [your browser] → Install unknown apps</span>.</li>
        <li>Go back and tap <span class="ui">Install</span>.</li>
        <li>When installation finishes, tap <span class="ui">Open</span>.</li>
      </ol>

      <div class="guide-callout guide-callout-note">
        <strong>Play Protect warnings</strong>
        <p>Google Play Protect may show a warning for apps installed from outside the Play Store. Only continue if you downloaded the APK from the official GitHub Releases page.</p>
      </div>

      <h2>First launch</h2>
      <ol class="guide-steps">
        <li>Reelish shows <span class="ui">Before you start</span> with the privacy policy and terms of use.</li>
        <li>Read both documents to the end.</li>
        <li>Tap <span class="ui">Agree and continue</span>.</li>
      </ol>
      <p>You’ll land on Home, where the catalog is ready to browse. To actually play something, add a provider first — see <a href="adding-plugin-repositories.html">Adding Plugin Repositories</a>.</p>

      <h2>Upgrading from v1.5.0 or earlier</h2>
      <div class="guide-callout guide-callout-warning">
        <strong>A reinstall is required</strong>
        <p>Starting with v1.6.0, Reelish uses a new permanent app ID, so Android treats it as a new app. The in-app updater on older versions can’t install it. Install the new APK, then uninstall the old version. Watch history, favorites and installed plugins don’t carry over from the old app.</p>
      </div>
    `,
  },
  {
    slug: "updating-reelish",
    category: "installation",
    title: "Updating Reelish",
    description: "Keep Reelish up to date with the latest release.",
    body: `
      <p>Reelish can check GitHub for newer stable releases and install them for you. You can also update manually at any time by installing a newer APK over the current one.</p>

      <h2>Updating inside the app</h2>
      <ol class="guide-steps">
        <li>When a new version is available, Reelish shows <span class="ui">New Reelish update available</span> with the release notes.</li>
        <li>Tap <span class="ui">Update now</span> (or <span class="ui">Later</span> to be reminded another time).</li>
        <li>Keep Reelish open until the download finishes.</li>
        <li>Android’s package installer opens. Confirm the update.</li>
      </ol>
      <p>To check yourself, open <span class="ui">Settings → About Reelish</span> and tap <span class="ui">Check for updates</span>. If you’re current, you’ll see <span class="ui">Reelish is up to date.</span></p>

      <h2>Allowing Reelish to install updates</h2>
      <p>The first time you update from inside the app, Android asks for permission. When you see <span class="ui">Allow Reelish to install updates</span>:</p>
      <ol class="guide-steps">
        <li>Tap <span class="ui">Open settings</span>.</li>
        <li>Turn on <span class="ui">Allow from this source</span> for Reelish.</li>
        <li>Go back to Reelish and try the update again.</li>
      </ol>

      <h2>How updates are verified</h2>
      <p>Before opening Android’s installer, Reelish checks that the downloaded file is a genuine Reelish release: its SHA-256 checksum, package name, version (it must match the release tag and must not be lower than what you have installed) and signing key. A file that fails any check is refused with an explanation.</p>

      <h2>Updating manually</h2>
      <p>Download the latest <code>reelish.apk</code> and install it over your current version, following <a href="installing-on-android.html">Installing on Android</a>. Your library, settings and providers are kept.</p>
      <div class="guide-callout guide-callout-warning">
        <strong>Coming from v1.5.0 or earlier?</strong>
        <p>Those versions use an old app ID and can’t update in place. Install the current APK as a new app, then uninstall the old one.</p>
      </div>
    `,
  },

  // ---------------------------------------------------------------- Plugins
  {
    slug: "understanding-third-party-plugins",
    category: "plugins",
    title: "Understanding Third-Party Plugins",
    description: "What plugins are and how they extend Reelish.",
    body: `
      <p>Reelish doesn’t come with any streaming sources. Instead, you add <strong>providers</strong> — small plugins published by independent authors — that find playable sources for the titles you choose.</p>

      <h2>Providers and repositories</h2>
      <ul>
        <li>A <strong>provider</strong> is a script that, given a movie or episode, returns stream links for it. Reelish asks your enabled providers for sources each time you press play.</li>
        <li>A <strong>repository</strong> is a collection of providers described by a <code>manifest.json</code> file. You install a repository once, then turn its individual providers on or off.</li>
      </ul>
      <p>Providers don’t change the catalog. Titles, artwork and details always come from TMDB; providers only answer “where can this be played?”.</p>

      <h2>How providers run</h2>
      <p>Provider scripts run on your device in a constrained JavaScript runtime and can make network requests to their sources. Repositories and your enabled-provider choices are saved locally.</p>
      <div class="guide-callout guide-callout-warning">
        <strong>Only install what you trust</strong>
        <p>Providers are third-party code and services. Reelish doesn’t supply or host streams, and community listings are not verified or endorsed by Reelish. Install repositories only from publishers you trust.</p>
      </div>

      <h2>Code updates need your approval</h2>
      <p>If a repository adds a provider or changes a provider’s code, that provider is paused and marked <span class="ui">Needs attention</span> until you review it in <span class="ui">Plugins</span> and tap <span class="ui">Allow update</span>. This way, new code never runs without your say-so.</p>

      <h2>The community library</h2>
      <p><span class="ui">Reelish Plugins</span> is a built-in library of community provider repositories, curated by a community-maintained catalog. You can search it, filter by language and content type, and install a repository from its details page. The catalog is refreshed at most every six hours (or when you pull to refresh), and a copy is bundled with each release for offline use.</p>

      <h2>Torrent sources</h2>
      <p>On Android, compatible providers can return torrent sources for P2P playback. This only works when <span class="ui">P2P streaming</span> is turned on in <span class="ui">Settings → Playback</span>, and availability depends on each provider.</p>
    `,
  },
  {
    slug: "adding-plugin-repositories",
    category: "plugins",
    title: "Adding Plugin Repositories",
    description: "Connect compatible content providers to Reelish.",
    body: `
      <p>There are two ways to add a provider repository: pick one from the built-in community library, or paste a manifest URL you already have.</p>

      <h2>From the community library</h2>
      <ol class="guide-steps">
        <li>Open the <span class="ui">Plugins</span> tab and tap <span class="ui">Browse Reelish Plugins</span>.</li>
        <li>Search, or filter by language and content type. Sections such as <span class="ui">Featured plugins</span> and <span class="ui">Recently updated</span> help you find popular choices.</li>
        <li>Tap a repository to open its details: author, description, languages, sources, last update and verification status.</li>
        <li>Tap <span class="ui">Install plugin</span>. When it shows <span class="ui">Installed</span>, go back to Plugins.</li>
      </ol>

      <h2>From a manifest URL</h2>
      <ol class="guide-steps">
        <li>Copy the repository’s manifest URL. It usually ends in <code>manifest.json</code>; a GitHub repository or file link also works.</li>
        <li>In <span class="ui">Plugins</span>, tap the link button (<span class="ui">Paste a manifest URL</span>).</li>
        <li>Paste the address into <span class="ui">Provider manifest URL</span>, or tap <span class="ui">Paste from clipboard</span>.</li>
        <li>Tap <span class="ui">Install provider</span> and wait for <span class="ui">Checking manifest…</span> to finish.</li>
      </ol>

      <div class="guide-callout guide-callout-note">
        <strong>Supported links</strong>
        <p>Use an HTTPS link to a Reelish provider <code>manifest.json</code>, or a GitHub repository/file link that contains one. CloudStream repositories and Stremio add-on manifests are different formats and won’t install as providers.</p>
      </div>

      <h2>After installing</h2>
      <p>The new repository appears under <span class="ui">Your repositories</span>. Expand it and turn on the providers you want to use — see <a href="managing-providers.html">Managing Providers</a>. If you have trouble installing, see <a href="plugin-loading-problems.html">Plugin Loading Problems</a>.</p>
    `,
  },
  {
    slug: "managing-providers",
    category: "plugins",
    title: "Managing Providers",
    description: "Enable, disable, and organize your installed plugins.",
    body: `
      <p>The <span class="ui">Plugins</span> tab is the control center for every source Reelish can search when you press play.</p>

      <h2>Your sources at a glance</h2>
      <p>The <span class="ui">Your sources</span> card at the top shows how many providers are active, how many providers you have in total and how many repositories are installed.</p>

      <h2>Turn providers on or off</h2>
      <ol class="guide-steps">
        <li>Under <span class="ui">Your repositories</span>, tap a repository to expand it.</li>
        <li>Use the switch next to each provider to enable or disable it.</li>
      </ol>
      <p>Only enabled providers are searched. Fewer, reliable providers usually means faster results.</p>

      <h2>Approve provider updates</h2>
      <p>When a repository adds a provider or changes a provider’s code, Reelish pauses it and shows <span class="ui">Needs attention</span>. Review the change and tap <span class="ui">Allow update</span> only if you trust the repository.</p>

      <h2>Refresh or remove a repository</h2>
      <ul>
        <li>Tap <span class="ui">Refresh repositories</span> to fetch the latest manifests.</li>
        <li>To uninstall, tap the trash icon on the repository and confirm <span class="ui">Remove repository?</span>. Its providers are removed from Reelish.</li>
        <li>If a repository fails to load, you’ll be offered <span class="ui">Retry</span> or <span class="ui">Remove</span> — nothing is uninstalled unless you choose to.</li>
      </ul>

      <h2>Choose which providers auto-play can use</h2>
      <p>With <span class="ui">Auto stream selection</span> on, Reelish plays the first available stream. To limit which providers it may use, open <span class="ui">Settings → Playback → Allowed plugins</span> and pick specific providers or <span class="ui">All enabled plugins</span>.</p>
    `,
  },
  {
    slug: "troubleshooting-plugins",
    category: "plugins",
    title: "Troubleshooting Plugins",
    description: "Common plugin issues and how to resolve them.",
    body: `
      <p>Most plugin problems come down to providers being switched off, paused, slow or unavailable. Work through the sections below.</p>

      <h2>“All providers are switched off”</h2>
      <p>Reelish only searches enabled providers. Open <span class="ui">Plugins</span>, expand a repository under <span class="ui">Your repositories</span> and turn on at least one provider.</p>

      <h2>A provider is marked “Needs attention”</h2>
      <p>The repository added a provider or changed a provider’s code, so it’s paused until you review it. Tap <span class="ui">Allow update</span> if you trust the repository, or leave it paused.</p>

      <h2>“The enabled providers returned no streams for this title”</h2>
      <ul>
        <li>The title may simply not be available from your providers. Try another title to confirm they work.</li>
        <li>Enable additional providers, or add another repository.</li>
        <li>Check <span class="ui">Settings → Playback → Allowed plugins</span> — auto stream selection only uses the providers listed there.</li>
      </ul>

      <h2>“This provider took too long to respond”</h2>
      <p>The provider or its source is slow or down. Try again later, or turn the provider off so it doesn’t slow down other searches. You can also raise <span class="ui">Stream selection timeout</span> in <span class="ui">Settings → Playback</span> to wait longer for results.</p>

      <h2>Search is taking a long time</h2>
      <p>While <span class="ui">Searching providers…</span> is shown, you can tap <span class="ui">Cancel</span> at any time. Disabling providers you don’t use makes searches faster.</p>

      <h2>Still not working?</h2>
      <p>If a repository won’t install or load at all, see <a href="plugin-loading-problems.html">Plugin Loading Problems</a>. Provider issues are best reported to the repository’s author, since Reelish doesn’t maintain third-party providers.</p>
    `,
  },

  // ---------------------------------------------------------------- Playback
  {
    slug: "selecting-a-stream",
    category: "playback",
    title: "Selecting a Stream",
    description: "Choose between available stream sources for a title.",
    body: `
      <p>When you press play, Reelish searches your enabled providers for sources. Depending on your settings, it either starts the first one automatically or lets you choose.</p>

      <h2>Automatic or manual</h2>
      <ul>
        <li><strong>Auto stream selection on</strong> — Reelish plays the first available stream. This is the quickest way to start watching.</li>
        <li><strong>Auto stream selection off</strong> — Reelish waits for results and opens the source picker so you can choose.</li>
      </ul>
      <p>Change this in <span class="ui">Settings → Playback → Auto stream selection</span>. <span class="ui">Stream selection timeout</span> controls how long Reelish waits for more provider results before opening the picker.</p>

      <h2>Switch source while watching</h2>
      <ol class="guide-steps">
        <li>Tap the screen to show the player controls.</li>
        <li>Tap <span class="ui">Source</span> to open <span class="ui">Playback source</span>.</li>
        <li>The current stream is marked <span class="ui">Playing</span>. Tap another source to switch.</li>
      </ol>
      <p>If a stream fails, the player offers <span class="ui">Try another source</span> so you can move on quickly.</p>

      <h2>Reusing the last working link</h2>
      <p>With <span class="ui">Reuse last link</span> on, Reelish first tries the stream that last worked for that title, as long as it’s still within <span class="ui">Last link cache duration</span>. If links from a provider expire quickly, shorten the duration or turn this off.</p>

      <h2>Torrent sources</h2>
      <p>Sources labeled <span class="ui">Torrent</span> only appear on Android when <span class="ui">P2P streaming</span> is on and a provider supports them. They can take longer to start than direct streams.</p>
    `,
  },
  {
    slug: "playback-settings",
    category: "playback",
    title: "Playback Settings",
    description: "Customize speed, scaling, and more.",
    body: `
      <p>You can adjust playback while watching from the player, and set your defaults in <span class="ui">Settings → Playback</span>.</p>

      <h2>In the player</h2>
      <p>Tap the screen, then the settings icon to open <span class="ui">Playback settings</span>:</p>
      <ul>
        <li><span class="ui">Speed</span> — from 0.5× to 2×.</li>
        <li><span class="ui">Aspect ratio</span> — <span class="ui">Fit</span> shows the whole picture, <span class="ui">Fill</span> crops to fill the screen, <span class="ui">Stretch</span> stretches the picture to the screen’s shape.</li>
        <li><span class="ui">Video quality</span> and <span class="ui">Audio track</span> — when the stream offers choices.</li>
        <li><span class="ui">Subtitles</span>, <span class="ui">Subtitle delay</span> and <span class="ui">Subtitle position</span> — see <a href="subtitle-customization.html">Subtitle Customization</a>.</li>
        <li><span class="ui">Switch to …</span> — reopens the stream in the other player engine. Try this if the picture stays black while audio plays.</li>
      </ul>

      <h2>Player controls and gestures</h2>
      <ul>
        <li>Skip back or forward 10 seconds with the on-screen buttons, or double-tap to seek.</li>
        <li>Swipe up or down to adjust brightness or volume.</li>
        <li>Press and hold the video to temporarily speed it up.</li>
        <li><span class="ui">Lock controls</span> prevents accidental touches; tap to unlock.</li>
        <li><span class="ui">Picture in picture</span>, <span class="ui">Lock to landscape</span> and, for series, <span class="ui">Episodes</span> and <span class="ui">Next episode</span>.</li>
      </ul>

      <h2>Your defaults</h2>
      <p>In <span class="ui">Settings → Playback</span>:</p>
      <ul>
        <li><span class="ui">Default playback speed</span> and <span class="ui">Preferred video quality</span>.</li>
        <li><span class="ui">Touch gestures</span>, <span class="ui">Hold to speed</span> and the <span class="ui">Hold speed</span> it uses.</li>
        <li><span class="ui">Show loading status</span> and <span class="ui">Pause overlay</span>, which shows title artwork and details when paused.</li>
        <li><span class="ui">Auto-play next episode</span> and the <span class="ui">Next episode threshold</span> at which it’s offered.</li>
      </ul>
    `,
  },
  {
    slug: "subtitle-customization",
    category: "playback",
    title: "Subtitle Customization",
    description: "Adjust subtitle appearance for comfortable viewing.",
    body: `
      <p>Reelish supports subtitles embedded in the video, subtitles supplied by providers, and external SRT and WebVTT subtitles found by subtitle addons such as OpenSubtitles.</p>

      <h2>Choose subtitles while watching</h2>
      <ol class="guide-steps">
        <li>Tap the screen, then the subtitles button.</li>
        <li>Pick a track from <span class="ui">In video</span>, <span class="ui">From provider</span> or <span class="ui">Subtitle addons</span>.</li>
        <li>If subtitles are out of sync, open <span class="ui">Playback settings → Subtitle delay</span> and move them <span class="ui">Earlier</span> or <span class="ui">Later</span>.</li>
        <li>Use <span class="ui">Subtitle position</span> to raise or lower them, then tap <span class="ui">Done</span>.</li>
      </ol>

      <h2>Appearance</h2>
      <p>In <span class="ui">Settings → Playback</span>, the <span class="ui">Subtitle rendering</span> section controls how external SRT and WebVTT subtitles look:</p>
      <ul>
        <li><span class="ui">Subtitle size</span> and <span class="ui">Bold</span>.</li>
        <li><span class="ui">Text color</span>, <span class="ui">Background color</span> and its <span class="ui">Opacity</span>.</li>
        <li><span class="ui">Outline</span> and <span class="ui">Outline color</span> for contrast on bright scenes.</li>
        <li><span class="ui">Subtitle position</span>, also adjustable while watching.</li>
      </ul>

      <h2>Languages</h2>
      <ul>
        <li><span class="ui">Preferred subtitle language</span> and a secondary fallback are selected automatically when available.</li>
        <li><span class="ui">Show only preferred languages</span> filters the subtitle picker.</li>
        <li><span class="ui">Use forced subtitles</span> prefers forced tracks matching the audio language.</li>
        <li><span class="ui">Strip SDH subtitles</span> hides sound descriptions and closed captions.</li>
      </ul>

      <h2>Subtitle addons</h2>
      <p>While a title plays, Reelish asks your subtitle addons for matching subtitles. Manage them in <span class="ui">Settings → Subtitle addons</span>: add a Stremio subtitle addon by its manifest URL, remove ones you don’t use, or tap <span class="ui">Restore OpenSubtitles v3</span> to bring back the default.</p>
    `,
  },

  // ---------------------------------------------------------------- Troubleshooting
  {
    slug: "playback-failures",
    category: "troubleshooting",
    title: "Playback Failures",
    description: "What to do when a stream fails to load.",
    body: `
      <p>Streams come from third-party providers and hosts, so an individual source can fail even when Reelish is working correctly. The quickest fix is usually another source.</p>

      <h2>First, try another source</h2>
      <p>When the player shows <span class="ui">Unable to play this source</span>, tap <span class="ui">Try another source</span>, or open <span class="ui">Source</span> and pick a different one. See <a href="selecting-a-stream.html">Selecting a Stream</a>.</p>

      <h2>Black picture but audio plays</h2>
      <p>Open <span class="ui">Playback settings</span> and choose <span class="ui">Switch to …</span> to reopen the stream on the other player engine. This also helps with “The video renderer produced no picture”.</p>

      <h2>“This device could not decode the video format”</h2>
      <p>Your device can’t decode this stream, often high-resolution HEVC. Try <span class="ui">Switch to …</span>, choose a lower <span class="ui">Video quality</span>, or pick a different source.</p>

      <h2>“The stream took too long to start” or “Could not connect to the stream host”</h2>
      <ul>
        <li>Check your internet connection.</li>
        <li>The host may be slow or offline — try another source.</li>
        <li>“The stream host is limiting requests (HTTP 429)” means the host is rate limiting. Wait a few minutes.</li>
      </ul>

      <h2>“Provider returned an expired or invalid source”</h2>
      <p>The link is no longer valid. Play again to fetch a fresh one. If it keeps happening with the same title, turn off <span class="ui">Reuse last link</span> or shorten <span class="ui">Last link cache duration</span> in <span class="ui">Settings → Playback</span>.</p>

      <h2>Torrent sources won’t start</h2>
      <ul>
        <li>“Torrent metadata did not load” — the torrent has too few peers or your network blocks P2P traffic. Try another source.</li>
        <li>Low on storage? Use <span class="ui">Settings → Playback → Clear torrent cache</span>. Torrent data is also cleared automatically once it uses more than 5 GB.</li>
      </ul>
    `,
  },
  {
    slug: "plugin-loading-problems",
    category: "troubleshooting",
    title: "Plugin Loading Problems",
    description: "Diagnose and fix plugin connectivity issues.",
    body: `
      <p>These problems happen when Reelish can’t download or read a repository’s manifest, either while installing it or when refreshing your repositories.</p>

      <h2>Repositories won’t load</h2>
      <p>“Your provider repositories could not be loaded” usually means a connection problem. Check your internet connection and tap <span class="ui">Retry</span>. If one repository keeps failing, its host may be down — you can choose <span class="ui">Remove</span>, or wait and try later.</p>

      <h2>Errors when installing a manifest URL</h2>
      <table class="guide-table">
        <thead><tr><th>Message</th><th>What to do</th></tr></thead>
        <tbody>
          <tr><td>Use an HTTPS URL for a provider repository or manifest.</td><td>Make sure the link starts with <code>https://</code>.</td></tr>
          <tr><td>That link is a CloudStream repository.</td><td>CloudStream repositories aren’t supported. Use a Reelish provider <code>manifest.json</code> URL.</td></tr>
          <tr><td>That link is an add-on manifest, not a provider manifest.</td><td>Stremio add-ons aren’t providers. Subtitle addons belong in <span class="ui">Settings → Subtitle addons</span>.</td></tr>
          <tr><td>The link did not return a provider manifest.</td><td>Copy the manifest URL again from the repository’s page.</td></tr>
          <tr><td>The repository manifest contains no valid providers.</td><td>The repository is empty or broken. Contact its author.</td></tr>
          <tr><td>This provider repository is already installed.</td><td>Nothing to do — find it under <span class="ui">Your repositories</span>.</td></tr>
          <tr><td>Too many plugin redirects.</td><td>The link redirects too many times. Use the final manifest address.</td></tr>
        </tbody>
      </table>

      <h2>The community library won’t load</h2>
      <ul>
        <li><span class="ui">Unable to load plugins</span> — check your connection and tap <span class="ui">Retry</span>.</li>
        <li><span class="ui">Showing cached plugin data</span> — Reelish couldn’t reach the catalog and is showing the last copy it downloaded.</li>
        <li><span class="ui">Showing the catalog included with this version of Reelish</span> — Reelish is using the copy bundled with the app. Pull to refresh once you’re online.</li>
      </ul>
    `,
  },
  {
    slug: "installation-issues",
    category: "troubleshooting",
    title: "Installation Issues",
    description: "Resolve common problems during APK installation.",
    body: `
      <p>If Android won’t install Reelish, the cause is almost always a permission, an incomplete download or a version mismatch.</p>

      <h2>Android blocks the install</h2>
      <p>Android only installs APKs from apps you’ve allowed. Open <span class="ui">Settings → Apps</span>, select the app you used to open the APK (your browser or Files app), then <span class="ui">Install unknown apps</span> and turn on <span class="ui">Allow from this source</span>. For in-app updates, allow Reelish itself.</p>

      <h2>“There was a problem parsing the package” or “App not installed”</h2>
      <ul>
        <li>The download may be incomplete. Delete the file and download it again from GitHub Releases.</li>
        <li>Compare its checksum with the release’s SHA-256 — see <a href="downloading-the-apk.html">Downloading the APK</a>.</li>
        <li>Make sure there’s enough free storage.</li>
      </ul>

      <h2>Signature or version conflicts</h2>
      <ul>
        <li>“Signed with a different key” — the installed copy didn’t come from official releases. Uninstall it, then install the official APK.</li>
        <li>“Android cannot install this update because its build number…” — you’re trying to install an older version over a newer one. Download the latest release instead.</li>
      </ul>

      <h2>Two Reelish icons after upgrading</h2>
      <p>Versions before v1.6.0 used a different app ID, so the new version installs alongside the old one. Uninstall the older copy. Watch history, favorites and installed plugins don’t carry over from it.</p>

      <h2>In-app update problems</h2>
      <ul>
        <li>“Could not save the update. Free up storage space and try again.”</li>
        <li>“The download stalled” / “The download was interrupted” — check your connection and retry.</li>
        <li>“GitHub is limiting downloads right now” — wait a little and try again from <span class="ui">Settings → About Reelish</span>.</li>
      </ul>
    `,
  },
  {
    slug: "common-errors",
    category: "troubleshooting",
    title: "Common Errors",
    description: "Quick reference for frequent error messages.",
    body: `
      <p>A quick reference for messages you might see in Reelish, what they mean and how to fix them.</p>

      <h2>Catalog</h2>
      <table class="guide-table">
        <thead><tr><th>Message</th><th>Fix</th></tr></thead>
        <tbody>
          <tr><td>Could not load titles from TMDB. Check your connection and retry.</td><td>Check your connection, then tap <span class="ui">Retry</span>.</td></tr>
          <tr><td>TMDB is rate limiting requests. Wait a moment and retry.</td><td>Wait a few seconds before retrying.</td></tr>
        </tbody>
      </table>

      <h2>Providers</h2>
      <table class="guide-table">
        <thead><tr><th>Message</th><th>Fix</th></tr></thead>
        <tbody>
          <tr><td>No providers are installed.</td><td>Add a repository — see <a href="adding-plugin-repositories.html">Adding Plugin Repositories</a>.</td></tr>
          <tr><td>Your installed providers are switched off.</td><td>Enable at least one provider in <span class="ui">Plugins</span>.</td></tr>
          <tr><td>No provider plugins are allowed for automatic stream selection.</td><td>Update <span class="ui">Settings → Playback → Allowed plugins</span>.</td></tr>
          <tr><td>The enabled providers returned no streams for this title.</td><td>Try another title, or enable more providers.</td></tr>
          <tr><td>This provider took too long to respond.</td><td>Try again later or use another provider.</td></tr>
        </tbody>
      </table>

      <h2>Playback</h2>
      <table class="guide-table">
        <thead><tr><th>Message</th><th>Fix</th></tr></thead>
        <tbody>
          <tr><td>Unable to play this source</td><td>Tap <span class="ui">Try another source</span>.</td></tr>
          <tr><td>This device could not decode the video format.</td><td>Use <span class="ui">Switch to …</span> or a lower quality.</td></tr>
          <tr><td>The stream took too long to start.</td><td>Check your connection or pick another source.</td></tr>
          <tr><td>Provider returned an expired or invalid source.</td><td>Play again to get a fresh link.</td></tr>
        </tbody>
      </table>
      <p>More detail in <a href="playback-failures.html">Playback Failures</a>.</p>

      <h2>Subtitles</h2>
      <table class="guide-table">
        <thead><tr><th>Message</th><th>Fix</th></tr></thead>
        <tbody>
          <tr><td>No external subtitles found</td><td>Try another language or add a subtitle addon.</td></tr>
          <tr><td>Subtitles are busy. Try again in a moment.</td><td>Wait a few seconds, then retry.</td></tr>
          <tr><td>This subtitle format is not supported.</td><td>Choose a different subtitle track.</td></tr>
        </tbody>
      </table>

      <h2>Updates</h2>
      <table class="guide-table">
        <thead><tr><th>Message</th><th>Fix</th></tr></thead>
        <tbody>
          <tr><td>Unable to check for updates</td><td>Check your connection and retry from <span class="ui">Settings → About Reelish</span>.</td></tr>
          <tr><td>The downloaded update failed its integrity check.</td><td>Retry the download.</td></tr>
          <tr><td>Allow Reelish to install updates</td><td>Tap <span class="ui">Open settings</span> and allow installs from Reelish.</td></tr>
        </tbody>
      </table>
    `,
  },
];

module.exports = { categories, guides };

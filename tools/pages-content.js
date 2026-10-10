// Content for the Resources and Legal pages linked from the footer.
// Run `node tools/build-pages.js` after editing.
//
// Legal text mirrors the in-app documents in the Reelish app
// (lib/src/screens/legal_information_screen.dart and credits_screen.dart).
// Keep the two in sync when either changes; the content disclaimer and the
// TMDB notice must stay word for word.
//
// Each page's `body` is HTML and uses the same building blocks as the guides:
//   <h2>                         section heading (listed in "On this page")
//   <ol class="guide-steps">     numbered steps
//   <div class="guide-callout guide-callout-note|tip|warning">
//     <strong>Title</strong><p>…</p></div>
//   <table class="guide-table">  reference tables

const LEGAL_UPDATED = "October 8, 2026";
const CONTACT_EMAIL = "frnzgularez@gmail.com";
const emailLink = `<a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>`;

const groups = {
  resources: { label: "Resources", icon: "help" },
  legal: { label: "Legal", icon: "shield" },
};

const pages = [
  // ---------------------------------------------------------------- Resources
  {
    slug: "support",
    group: "resources",
    title: "Support",
    description: "Where to get help with Reelish, report a bug, or send a legal notice.",
    body: `
      <p>Reelish is an independent, open-source project. Support happens in the open on GitHub, and most questions are already answered in the guides.</p>

      <h2>Check the guides first</h2>
      <p>The <a href="guide.html">guides</a> cover installation, plugins, playback and the most common errors. Good places to start:</p>
      <ul>
        <li><a href="guides/common-errors.html">Common Errors</a>: what each error message means and how to fix it.</li>
        <li><a href="guides/playback-failures.html">Playback Failures</a>: when a stream won’t start or plays incorrectly.</li>
        <li><a href="guides/troubleshooting-plugins.html">Troubleshooting Plugins</a>: when providers return no streams.</li>
        <li><a href="guides/installation-issues.html">Installation Issues</a>: when Android blocks or rejects the APK.</li>
      </ul>

      <h2>Report a bug or ask a question</h2>
      <p>Open an issue on the <a href="https://github.com/frnzeeey/reelish/issues" target="_blank" rel="noopener noreferrer">GitHub issue tracker</a>. To help get it fixed quickly, include:</p>
      <ol class="guide-steps">
        <li>Your Reelish version, from <span class="ui">Settings → About Reelish</span>.</li>
        <li>Your device model and Android version.</li>
        <li>What you did, what you expected, and what happened instead, including the exact error message.</li>
      </ol>
      <div class="guide-callout guide-callout-warning">
        <strong>Keep personal information out of public issues</strong>
        <p>Issues are public. Don’t post personal information, account details, or private links.</p>
      </div>

      <h2>Contact by email</h2>
      <p>For anything that shouldn’t be public, such as privacy requests or legal notices, email <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>. For bugs and questions, GitHub issues are the fastest way to get an answer.</p>

      <h2>Problems with a provider</h2>
      <p>Providers are built and maintained by independent authors, not by Reelish. If a specific provider is broken or returns the wrong content, contact the repository’s author. Reelish can only help with problems in the app itself.</p>

      <h2>Copyright and legal notices</h2>
      <p>Reelish doesn’t host any media; see the <a href="disclaimer.html">content disclaimer</a>. For a copyright or other legal notice, email the developer at ${emailLink} and include enough information to identify the material and the right asserted. Don’t include sensitive personal information in a public issue.</p>

      <h2>Support the project</h2>
      <p>Reelish is free and built in spare time. If it’s useful to you, you can <a href="https://buymeacoffee.com/frnzegl" target="_blank" rel="noopener noreferrer">buy the developer a coffee</a>, star the <a href="https://github.com/frnzeeey/reelish" target="_blank" rel="noopener noreferrer">repository</a>, or report bugs you find.</p>
    `,
  },
  {
    slug: "faq",
    group: "resources",
    title: "Frequently Asked Questions",
    description: "Quick answers about what Reelish is, how it works, and how your data is handled.",
    body: `
      <h2>General</h2>
      <p><strong>What is Reelish?</strong><br />An open-source Android app for discovering movies and TV series and watching them through providers you choose. It combines a TMDB-powered catalog, a personal library and a built-in video player.</p>
      <p><strong>Is Reelish free?</strong><br />Yes. Reelish is free and open source, with no account, subscription, or in-app purchases.</p>
      <p><strong>Does Reelish host movies or shows?</strong><br />No. Reelish doesn’t host, store, upload or distribute any media. Streams come from independent third-party providers you choose to install. See the <a href="disclaimer.html">content disclaimer</a>.</p>
      <p><strong>Which devices are supported?</strong><br />Reelish is distributed as an Android APK for phones and tablets.</p>

      <h2>Installing and updating</h2>
      <p><strong>Where do I download Reelish?</strong><br />Only from the project’s <a href="https://github.com/frnzeeey/reelish/releases" target="_blank" rel="noopener noreferrer">GitHub Releases</a> page, or from any Download button on this site, which points there. APKs from other sites may be outdated or modified. See <a href="guides/downloading-the-apk.html">Downloading the APK</a>.</p>
      <p><strong>Why does Android warn me when I install it?</strong><br />Android asks for confirmation for apps installed outside an app store, and Play Protect may show a warning. That’s expected for APKs. Only continue if you downloaded from GitHub Releases. See <a href="guides/installing-on-android.html">Installing on Android</a>.</p>
      <p><strong>How do I update?</strong><br />Reelish checks GitHub for new releases and offers to download the update. You confirm the install in Android’s package installer. See <a href="guides/updating-reelish.html">Updating Reelish</a>.</p>

      <h2>Plugins and playback</h2>
      <p><strong>Why can I browse titles but not play them?</strong><br />Reelish ships without any streaming sources. Add a provider repository from the <span class="ui">Plugins</span> tab first. See <a href="guides/adding-plugin-repositories.html">Adding Plugin Repositories</a>.</p>
      <p><strong>Are plugins safe?</strong><br />Providers are third-party code. They run in a constrained JavaScript runtime, and new or changed provider code is paused until you approve it. Community listings aren’t verified or endorsed by Reelish, so install only repositories from publishers you trust. See <a href="guides/understanding-third-party-plugins.html">Understanding Third-Party Plugins</a>.</p>
      <p><strong>Does Reelish support subtitles?</strong><br />Yes. The player supports external SRT and WebVTT subtitles, can search OpenSubtitles, and lets you customize subtitle appearance and languages. See <a href="guides/subtitle-customization.html">Subtitle Customization</a>.</p>
      <p><strong>What about torrent sources?</strong><br />On Android, compatible providers can return torrent sources for P2P playback once <span class="ui">P2P streaming</span> is turned on in <span class="ui">Settings → Playback</span>. P2P playback may share your network address with other peers and may upload pieces of a file.</p>

      <h2>Privacy and data</h2>
      <p><strong>Do I need an account?</strong><br />No. Reelish has no accounts and no developer-operated account service.</p>
      <p><strong>What data does Reelish collect?</strong><br />Your favorites, history, playback progress, settings and provider choices stay on your device. The app doesn’t include its own advertising or analytics. Services you use, such as TMDB, providers, stream hosts and subtitle services, receive the requests needed for the features you use. See the <a href="privacy.html">privacy policy</a>.</p>
      <p><strong>How do I delete my data?</strong><br />Remove favorites and history in <span class="ui">Library</span>, remove add-ons in <span class="ui">Plugins</span>, or uninstall the app to erase all app data.</p>
    `,
  },
  {
    slug: "about",
    group: "resources",
    title: "About Reelish",
    description: "Who builds Reelish, why it exists, and how it’s put together.",
    body: `
      <p>Reelish brings discovering, tracking and watching movies and TV series into one dark, cinematic app. Browse a TMDB-powered catalog, open a title, ask the providers you’ve chosen for streams, and keep watching where you left off.</p>

      <h2>Why Reelish exists</h2>
      <p>Finding something to watch is usually fragmented. You discover a film in one place, look up the details in another, check several sources for something playable, then switch apps again to watch it. Series make this harder, with seasons, episodes, subtitles and progress to keep track of. Reelish puts that whole journey in one place.</p>

      <h2>How it’s built</h2>
      <ul>
        <li><strong>Catalog and playback are kept separate.</strong> TMDB answers “what should I watch?”, and the providers you install answer “where can this be played?”. The catalog stays useful even when provider availability changes.</li>
        <li><strong>Untrusted code runs in a sandbox.</strong> Provider scripts run in a resource-limited QuickJS runtime with no direct file or credential access, and network destinations are checked before requests are sent.</li>
        <li><strong>Your library stays on your device.</strong> Favorites, history, progress and preferences are stored locally. No account or backend is required.</li>
        <li><strong>Open source.</strong> Reelish is built with Flutter and Dart, and the code is on <a href="https://github.com/frnzeeey/reelish" target="_blank" rel="noopener noreferrer">GitHub</a>.</li>
      </ul>

      <h2>Who makes it</h2>
      <p>Reelish is designed and developed by <strong>Franze Kenneth Lobos</strong>, who works on everything from the interface and catalog services to provider integration and the video player. It’s an independent project and isn’t affiliated with TMDB, Stremio, CloudStream or OpenSubtitles.</p>
      <div class="about-creator">
        <img class="about-creator-avatar" src="assets/profile/Asset%201.png" alt="Franze Kenneth Lobos" width="96" height="96" loading="lazy" />
        <div class="about-creator-body">
          <strong>Franze Kenneth Lobos</strong>
          <span>Designer &amp; developer of Reelish</span>
          <p>If you enjoy Reelish, a coffee helps keep the project going.</p>
          <div class="about-creator-actions">
            <a class="about-coffee" href="https://buymeacoffee.com/frnzegl" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 8h1a4 4 0 0 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><path d="M6 2v2M10 2v2M14 2v2"/></svg>
              Buy me a coffee
            </a>
            <a class="about-github" href="https://github.com/frnzeeey" target="_blank" rel="noopener noreferrer">GitHub profile</a>
          </div>
        </div>
      </div>

      <h2>What Reelish is not</h2>
      <p>Reelish is a catalog and playback client. It doesn’t host or supply a media library, and availability and quality depend on the external catalogs, providers, hosts and networks you use. Read the <a href="disclaimer.html">content disclaimer</a> and <a href="terms.html">terms of use</a> for details.</p>
    `,
  },

  // ---------------------------------------------------------------- Legal
  {
    slug: "privacy",
    group: "legal",
    title: "Privacy Policy",
    description: "What information stays on your device and what is shared with the services you use.",
    updated: LEGAL_UPDATED,
    body: `
      <p>This is the same privacy policy shown in the Reelish app before first use. A section on this website is added at the end.</p>

      <h2>Who this applies to</h2>
      <p>This policy describes the Reelish app. The app does not ask you to create an account and has no app-operated account service. Your device and the services you choose to use still process data as described below.</p>

      <h2>Information kept on your device</h2>
      <p>The app stores your favorites, recently played titles and resume positions, playback preferences, installed add-on repository addresses and settings, a short-lived cache of selected stream sources, and a copy of the plugin library catalog. These are stored in the app’s private device storage. The app does not currently include its own advertising or analytics service.</p>
      <p>You can remove favorites and history in Library, remove add-ons in Plugins, clear the torrent cache in Playback settings, or erase app data by uninstalling the app. Device backups and operating-system behavior are controlled by your platform provider.</p>

      <h2>Information sent when you use network features</h2>
      <p>When you browse, search or open titles, the app sends title identifiers and related requests to The Movie Database (TMDB) to retrieve catalog, artwork and details. Subtitle searches send a title or episode identifier to the OpenSubtitles v3 service.</p>
      <p>Opening the plugin library downloads its catalog from the app’s GitHub repository and loads provider logos from the addresses listed in the catalog; those hosts can receive your IP address and request data, but no title or account information is sent. If you install an add-on, the app contacts the repository and service addresses configured for it. Add-ons receive the title and episode identifiers needed for your request and may send them to their own servers.</p>
      <p>Direct streams, subtitle files and torrent/P2P playback connect to the selected source or peers; those operators can receive your IP address and request data. Android may contact GitHub to check for app updates and download an APK when you choose an update. Android uses its package installer after you confirm the installation.</p>

      <h2>Third-party services and add-ons</h2>
      <p>TMDB, OpenSubtitles, add-on publishers, media hosts, torrent peers, GitHub, and your device platform operate independently. Their privacy practices, logs, retention and locations are governed by their own policies. The app cannot control what an add-on publisher does with data it receives. Install only add-ons you trust.</p>
      <p>No payment, account credentials, contacts, precise location or advertising identifier is requested by the app’s own features.</p>

      <h2>Retention and choices</h2>
      <p>On-device library entries and preferences remain until you remove them or erase app data. Catalog results may be cached in memory for the current session. Third-party services may retain request data under their own policies.</p>
      <p>Because the app has no account or developer-operated profile database, it has no server-side account data to delete. For data held by a third party, contact that service or add-on publisher directly. Applicable privacy rights depend on your location; email the developer at ${emailLink} for requests concerning the app.</p>

      <h2>Children and changes</h2>
      <p>The app is not designed as a service for children. A parent or guardian who believes a child has provided personal information to a third-party service should contact that service and the app publisher. This policy may change when app features or legal requirements change; the updated version and date will appear here.</p>

      <h2>This website</h2>
      <p>This website doesn’t use cookies, analytics or advertising, and doesn’t ask for any personal information. To show the page, your browser loads fonts from Google Fonts, and the changelog loads release information from the GitHub API. Those services, and the host serving this site, can receive your IP address and standard request data under their own policies. Download links take you to GitHub Releases.</p>

      <h2>Contact</h2>
      <p>For privacy requests, email the developer at ${emailLink}. Do not post personal information in public issue trackers.</p>
    `,
  },
  {
    slug: "terms",
    group: "legal",
    title: "Terms of Use",
    description: "The terms that apply when you use Reelish, including your responsibilities for third-party content.",
    updated: LEGAL_UPDATED,
    body: `
      <p>These are the same terms of use shown in the Reelish app before first use.</p>

      <h2>Content disclaimer</h2>
      <p>Reelish is a media discovery and playback application. Reelish does not host, store, upload, or distribute films, television programs, or any other copyrighted content, and no such content is stored on servers operated by Reelish.</p>
      <p>All streams are provided by independent third-party plugins and external services that users choose to install. Reelish does not own, operate, control, or endorse these sources, is not affiliated with their providers, and makes no representations regarding the legality, availability, accuracy, or quality of the content they provide. Users are solely responsible for ensuring that their use of any third-party source complies with the laws applicable in their jurisdiction.</p>
      <p>Movie and television metadata, including titles, descriptions, artwork, and ratings, is provided by The Movie Database (TMDB). All trademarks, logos, and content remain the property of their respective owners.</p>

      <h2>Using the app</h2>
      <p>These terms cover your use of Reelish. By using the app, you agree to follow these terms and the laws that apply to you. If you do not agree, stop using the app. The app is a media catalog and playback client. It does not host or supply a library of movies, shows or streams.</p>

      <h2>Content, add-ons and your responsibilities</h2>
      <p>You choose which third-party add-ons, repositories, stream addresses and files to use. You are responsible for checking that your use and any access, copying, downloading or sharing is authorized where you live. Do not use the app to infringe copyright, bypass access controls, distribute unlawful material, or violate another person’s rights.</p>
      <p>P2P/torrent playback may share your network address with other participants and may upload pieces of a file. Add-ons and remote content can change without notice and may be inaccurate, unavailable or unsafe. The app checks each stream address before playback, but the video engine then follows redirects and playlist links chosen by the stream host, which can reach other addresses, including devices on your local network.</p>

      <h2>Third-party services and software</h2>
      <p>Third-party services and add-ons are not controlled or endorsed by the app publisher. Their own terms and privacy policies apply. The app may include open-source software, which remains subject to its respective license; see <a href="licenses.html">third-party licenses</a>. Third-party names and marks belong to their owners. Reelish is an independent app and is not affiliated with, endorsed by or sponsored by Stremio, CloudStream or OpenSubtitles. Their names are used only to describe compatible formats and services.</p>

      <h2>In-app updates</h2>
      <p>On Android, the app checks the public GitHub releases page for a newer version. If one is available, you can choose to download its APK. You initiate installation in Android’s package installer; Android may ask you to allow installs from this source. Only install a release if you trust its source. Updates may also be installed through any distribution channel you use.</p>

      <h2>Availability and liability</h2>
      <p>The app is provided as available. To the extent permitted by law, the publisher does not promise uninterrupted availability or the accuracy, legality, quality or safety of third-party content, and is not responsible for third-party services or networks. Nothing in these terms excludes liability or consumer rights that cannot lawfully be excluded in your jurisdiction.</p>

      <h2>Suspension, changes and applicable law</h2>
      <p>The publisher may change or discontinue app features and may restrict use that creates security, legal or operational risk. These terms may be updated with the app; the current text and date are shown here. Applicable mandatory consumer protections remain in force. Any governing-law or dispute rules are those that apply to the publisher and user under applicable law.</p>
    `,
  },
  {
    slug: "disclaimer",
    group: "legal",
    title: "Content Disclaimer",
    description: "What Reelish is and is not responsible for.",
    updated: LEGAL_UPDATED,
    body: `
      <div class="guide-callout guide-callout-note">
        <strong>In short</strong>
        <p>Reelish is a catalog and player. It doesn’t host any media. Streams come from third-party plugins you choose to install.</p>
      </div>

      <h2>Media content</h2>
      <p>Reelish is a media discovery and playback application. Reelish does not host, store, upload, or distribute films, television programs, or any other copyrighted content, and no such content is stored on servers operated by Reelish.</p>

      <h2>Third-party sources</h2>
      <p>All streams are provided by independent third-party plugins and external services that users choose to install. Reelish does not own, operate, control, or endorse these sources, is not affiliated with their providers, and makes no representations regarding the legality, availability, accuracy, or quality of the content they provide. Users are solely responsible for ensuring that their use of any third-party source complies with the laws applicable in their jurisdiction.</p>

      <h2>Catalog data and trademarks</h2>
      <p>Movie and television metadata, including titles, descriptions, artwork, and ratings, is provided by The Movie Database (TMDB). All trademarks, logos, and content remain the property of their respective owners.</p>

      <h2>External content</h2>
      <p>Streams, subtitles, descriptions, artwork and add-on results come from third parties or user-configured sources. The app publisher does not verify ownership, licensing, accuracy, availability or safety of those materials and does not grant rights to them. Remove an add-on or stop playback if you believe a source violates rights or local law.</p>

      <h2>Reporting</h2>
      <p>For a copyright or other legal notice, email the developer at ${emailLink} and include enough information to identify the material and the right asserted. Do not include sensitive personal information in a public issue. This information is not a substitute for a formal notice required by your jurisdiction. See <a href="support.html">Support</a>.</p>
    `,
  },
  {
    slug: "attribution",
    group: "legal",
    title: "TMDB Attribution",
    description: "Credits for the catalog data, services and community catalog behind Reelish.",
    updated: LEGAL_UPDATED,
    body: `
      <h2>The Movie Database (TMDB)</h2>
      <p><strong>This product uses the TMDB API but is not endorsed or certified by TMDB.</strong></p>
      <p>Movie and TV show information, including titles, descriptions, artwork, ratings, and related metadata, may be provided by <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">The Movie Database (TMDB)</a>.</p>
      <p>TMDB trademarks and content remain with their respective owners; see TMDB’s terms and attribution requirements before redistributing any material.</p>

      <h2>Third-party services</h2>
      <ul>
        <li><strong>OpenSubtitles v3</strong>: preinstalled Stremio subtitle addon used to search for subtitles. Reelish is not affiliated with OpenSubtitles.</li>
        <li><strong>GitHub</strong>: hosts Reelish releases for update checks and the plugin library catalog.</li>
      </ul>

      <h2>Plugin library</h2>
      <p>The plugin library lists provider repositories from a community-maintained catalog curated by wolf knight. Repository names, descriptions, logos and manifests belong to their authors, who build and maintain each provider independently of Reelish. A listing is not an endorsement or a verification of a provider.</p>

      <h2>Website media</h2>
      <p>The playback preview on this site uses <a href="https://peach.blender.org/" target="_blank" rel="noopener noreferrer">Big Buck Bunny</a> © Blender Foundation, licensed under <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noopener noreferrer">CC BY 3.0</a>.</p>
    `,
  },
  {
    slug: "licenses",
    group: "legal",
    title: "Third-Party Licenses",
    description: "Open-source software and fonts used in Reelish, and the licenses they’re used under.",
    updated: LEGAL_UPDATED,
    body: `
      <p>Reelish is built with Flutter and open-source packages. Each component remains subject to its own license. The full license text for every package and font is available in the app under <span class="ui">Settings → Credits → Open-source licenses</span>.</p>

      <h2>Framework</h2>
      <table class="guide-table">
        <thead><tr><th>Component</th><th>Used for</th><th>License</th></tr></thead>
        <tbody>
          <tr><td>Flutter &amp; Dart</td><td>App framework and language</td><td>BSD&nbsp;3&#8209;Clause</td></tr>
        </tbody>
      </table>

      <h2>Packages</h2>
      <table class="guide-table">
        <thead><tr><th>Component</th><th>Used for</th><th>License</th></tr></thead>
        <tbody>
          <tr><td>http</td><td>Network requests</td><td>BSD&nbsp;3&#8209;Clause</td></tr>
          <tr><td>crypto</td><td>Checksums and hashing</td><td>BSD&nbsp;3&#8209;Clause</td></tr>
          <tr><td>shared_preferences</td><td>On-device library and settings</td><td>BSD&nbsp;3&#8209;Clause</td></tr>
          <tr><td>path_provider</td><td>App storage and cache paths</td><td>BSD&nbsp;3&#8209;Clause</td></tr>
          <tr><td>url_launcher</td><td>Opening external links</td><td>BSD&nbsp;3&#8209;Clause</td></tr>
          <tr><td>package_info_plus</td><td>App version information</td><td>BSD&nbsp;3&#8209;Clause</td></tr>
          <tr><td>video_player, video_player_android</td><td>Video playback</td><td>BSD&nbsp;3&#8209;Clause</td></tr>
          <tr><td>media_kit, media_kit_video, media_kit_libs_android_video</td><td>Playback engine</td><td>MIT</td></tr>
          <tr><td>video_player_media_kit</td><td>Playback engine adapter</td><td>MIT</td></tr>
          <tr><td>flutter_js</td><td>Running provider scripts (QuickJS)</td><td>MIT</td></tr>
          <tr><td>flutter_go_torrent_streamer</td><td>Torrent/P2P playback on Android</td><td>MIT</td></tr>
          <tr><td>anacrolix/torrent</td><td>BitTorrent engine used by the torrent streamer</td><td>MPL 2.0</td></tr>
          <tr><td>material_symbols_icons</td><td>Icons</td><td>Apache 2.0</td></tr>
        </tbody>
      </table>
      <div class="guide-callout guide-callout-note">
        <strong>Native libraries</strong>
        <p>The playback packages include prebuilt native media libraries, such as mpv and FFmpeg, which are distributed under their own open-source licenses.</p>
      </div>

      <h2>Fonts</h2>
      <table class="guide-table">
        <thead><tr><th>Component</th><th>Used for</th><th>License</th></tr></thead>
        <tbody>
          <tr><td>Montserrat</td><td>App and website typeface</td><td>SIL Open Font License 1.1</td></tr>
          <tr><td>Material Symbols</td><td>Website icons</td><td>Apache 2.0</td></tr>
        </tbody>
      </table>

      <h2>Source code</h2>
      <p>Reelish’s own source code is available on <a href="https://github.com/frnzeeey/reelish" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
    `,
  },
];

module.exports = { groups, pages };

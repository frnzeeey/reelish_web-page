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

// Dates match the in-app documents: the terms and notices carry the app's
// effective date; the privacy policy has its own (see the privacy page).
const LEGAL_UPDATED = "October 16, 2026";
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

      <h2>Get help inside the app</h2>
      <p>Open <span class="ui">Settings → Help &amp; Support</span>. It has answers to common questions, step-by-step <span class="ui">Troubleshooting</span> for playback, sources, subtitles and updates, and ways to reach the developer without leaving Reelish:</p>
      <ul>
        <li><span class="ui">Report a problem</span>: tell the developer what went wrong. You see exactly what the report contains before you send it.</li>
        <li><span class="ui">Send feedback</span>: ideas, suggestions and questions.</li>
        <li><span class="ui">Email support</span>: opens your email app. On a TV without one, the address is copied for you.</li>
        <li><span class="ui">Open error log</span> (Windows): a log of app errors that stays on your computer.</li>
      </ul>

      <h2>Report a bug or ask a question</h2>
      <p>You can also open an issue on the <a href="https://github.com/frnzeeey/reelish/issues" target="_blank" rel="noopener noreferrer">GitHub issue tracker</a>. To help get it fixed quickly, include:</p>
      <ol class="guide-steps">
        <li>Your Reelish version, from <span class="ui">Settings → Help &amp; Support → About Reelish</span>.</li>
        <li>Your device model and its Android or Windows version.</li>
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
      <p>Reelish is free and built in spare time. If it’s useful to you, you can <a href="https://buymeacoffee.com/frnzegl" target="_blank" rel="noopener noreferrer">buy the developer a coffee</a>, star the <a href="https://github.com/frnzeeey/reelish" target="_blank" rel="noopener noreferrer">repository</a>, or report bugs you find. Donating through the app also makes you a Reelish Supporter, with a few extras as a thank-you; see <a href="guides/reelish-supporters.html">Reelish Supporters</a>.</p>
    `,
  },
  {
    slug: "faq",
    group: "resources",
    title: "Frequently Asked Questions",
    description: "Quick answers about what Reelish is, how it works, and how your data is handled.",
    body: `
      <h2>General</h2>
      <p><strong>What is Reelish?</strong><br />An open-source app for Android, Android TV, Google TV and Windows for discovering movies and TV series and watching them through providers you choose. It combines a TMDB-powered catalog, a personal library that follows you across your devices, a built-in video player, and ways to watch with friends.</p>
      <p><strong>Is Reelish free?</strong><br />Yes. Reelish is free and open source, with no subscription or in-app purchases. You can choose to donate and become a Reelish Supporter, which adds a few extras such as hosting a Watch Party, app themes and avatar frames. Everything else stays available to everyone. See <a href="guides/reelish-supporters.html">Reelish Supporters</a>.</p>
      <p><strong>Does Reelish host movies or shows?</strong><br />No. Reelish doesn’t host, store, upload or distribute any media. Streams come from independent third-party providers you choose to install. See the <a href="disclaimer.html">content disclaimer</a>.</p>
      <p><strong>Which devices are supported?</strong><br />Reelish is distributed as a single Android APK that works on phones, tablets, Android TV and Google TV. The same APK installs on all of them, and on a TV it uses a layout built for the big screen and a remote. Reelish is also available for Windows 10 and 11 (64-bit) as an installer: run <code>Reelish-Setup-x64.exe</code>, and Reelish then updates itself from inside the app.</p>

      <h2>Installing and updating</h2>
      <p><strong>Where do I download Reelish?</strong><br />Only from the project’s <a href="https://github.com/frnzeeey/reelish/releases" target="_blank" rel="noopener noreferrer">GitHub Releases</a> page, or from any Download button on this site, which points there. APKs from other sites may be outdated or modified. See <a href="guides/downloading-the-apk.html">Downloading the APK</a>.</p>
      <p><strong>Why does Android warn me when I install it?</strong><br />Android asks for confirmation for apps installed outside an app store, and Play Protect may show a warning. That’s expected for APKs. Only continue if you downloaded from GitHub Releases. See <a href="guides/installing-on-android.html">Installing on Android</a>.</p>
      <p><strong>How do I update?</strong><br />Reelish checks GitHub for new releases and offers to download the update. On Android you confirm the install in Android’s package installer; on Windows, Reelish checks the installer and runs it for you. See <a href="guides/updating-reelish.html">Updating Reelish</a>.</p>

      <h2>Plugins and playback</h2>
      <p><strong>Why can I browse titles but not play them?</strong><br />Reelish ships without any streaming sources. Add a plugin collection from the <span class="ui">Plugins</span> tab first. See <a href="guides/adding-plugin-repositories.html">Adding Plugin Collections</a>.</p>
      <p><strong>Are plugins safe?</strong><br />Providers are third-party code. They run in a constrained JavaScript runtime, and new or changed provider code is paused until you approve it. Community listings aren’t verified or endorsed by Reelish, so install only repositories from publishers you trust. See <a href="guides/understanding-third-party-plugins.html">Understanding Third-Party Plugins</a>.</p>
      <p><strong>Does Reelish support subtitles?</strong><br />Yes. The player supports external SRT and WebVTT subtitles, can search OpenSubtitles, and lets you customize subtitle appearance and languages. See <a href="guides/subtitle-customization.html">Subtitle Customization</a>.</p>
      <p><strong>What about torrent sources?</strong><br />On Android and Windows, compatible providers can return torrent sources for P2P playback once <span class="ui">P2P streaming</span> is turned on in <span class="ui">Settings → Playback</span>. P2P playback may share your network address with other peers and may upload pieces of a file.</p>
      <p><strong>Can Reelish skip intros?</strong><br />Yes. Intros skip automatically and a <span class="ui">Skip outro</span> button appears when the community database IntroDB has timestamps for the episode. Nothing is skipped when they aren’t known. Change this in <span class="ui">Settings → Playback</span> under <span class="ui">Intro &amp; outro</span>.</p>

      <h2>Watching with friends</h2>
      <p><strong>Can I watch with friends?</strong><br />Yes. A Watch Party plays a movie or episode in sync for up to five people, each from their own sources, with reactions and chat. Anyone signed in can join with a code; hosting a party is a Supporter perk. See <a href="guides/watch-party.html">Watch Party</a>.</p>
      <p><strong>How do Friends and Messages work?</strong><br />Friends is off until you turn it on in <span class="ui">Profile → Friends &amp; privacy</span>. Then you can add friends by friend code or handle, send them titles to watch, share collections, and send private messages. See <a href="guides/friends-and-messages.html">Friends and Messages</a>.</p>

      <h2>Privacy and data</h2>
      <p><strong>Do I need an account?</strong><br />Yes. You sign in with a free Trakt account, on Trakt’s own page in your browser or with a code from a TV. Reelish has no passwords of its own and never sees your Trakt password. See <a href="guides/signing-in-and-syncing.html">Signing In and Syncing</a>.</p>
      <p><strong>What data does Reelish collect?</strong><br />To keep your viewing progress, collections and genre choices the same on every device, the Reelish service stores them with your account. Friends data is stored only if you turn Friends on. Usage statistics and crash reports are sent only on Android, and only if you agree. The app has no advertising, and video never passes through the Reelish service. Favorites, settings and provider choices stay on your device. See the <a href="privacy.html">privacy policy</a> for the full details.</p>
      <p><strong>How do I delete my data?</strong><br />Delete your account in <span class="ui">Settings → Profile and account</span>. This removes your account, viewing progress, collections, recommendation preferences and device sessions from the Reelish service, and asks Trakt to revoke Reelish’s access. To clear what’s on a device, remove items in <span class="ui">Library</span>, remove add-ons in <span class="ui">Plugins</span>, or uninstall the app.</p>
    `,
  },
  {
    slug: "about",
    group: "resources",
    title: "About Reelish",
    description: "Who builds Reelish, why it exists, and how it’s put together.",
    body: `
      <p>Reelish brings discovering, tracking and watching movies and TV series into one dark, cinematic app. Browse a TMDB-powered catalog, open a title, ask the providers you’ve chosen for streams, and keep watching where you left off.</p>

      <h2>The story behind Reelish</h2>
      <div class="founder-story">
        <p class="founder-story-tagline">Sometimes, the person you’ve been waiting for is you.</p>

        <p>Let me introduce myself first.</p>
        <p>I’m a software engineer by profession, specializing in web development. So, building software isn’t something I just discovered yesterday. I’ve spent years learning, experimenting, creating, and occasionally breaking things along the way.</p>
        <p>But this story isn’t really about my profession. It’s about an idea, an experience, and a realization that eventually led to the creation of Reelish.</p>
        <p>It all started with something pretty ordinary: watching movies and TV shows.</p>
        <p>I used to subscribe to a streaming platform. At first glance, ₱149 per month seemed affordable. Nothing too expensive, right? But when I started thinking about how much I was spending over the years, I realized that those small monthly payments eventually added up.</p>
        <p>Call me cheap if you want. Haha!</p>
        <p>So, I decided to cancel my subscription and look for an alternative.</p>
        <p>And I found one.</p>
        <p>It was great. It gave me the experience I was looking for, and I enjoyed using it for a couple of years. But one day, without much warning, the app simply stopped working.</p>
        <p>And just like that, I was back to square one.</p>
        <p>I started looking for alternatives again. Technically, they worked. They could play movies and shows, and they served their purpose. But something was missing.</p>
        <p>The experience.</p>
        <p>The interfaces felt generic. The overall experience wasn’t quite what I had in mind. I knew what I wanted, but I couldn’t seem to find something that captured it.</p>
        <p>So I waited.</p>
        <p>Months went by, and I kept hoping that someone would eventually build what I was looking for. Someone with the resources, the team, and the engineering talent to create that kind of experience.</p>
        <p>I kept waiting for someone else to make it happen.</p>
        <p>Until one day, something finally occurred to me.</p>
        <p class="founder-story-quote">What if the person I’ve been waiting for is me?</p>
        <p>That thought changed everything.</p>
        <p>I started imagining what the experience could look like. What if I could build an app that brought everything together in a way that felt natural, enjoyable, and personal? Something that I would genuinely love using, not just because it worked, but because of how it felt to use it.</p>
        <p>And so, I started building.</p>
        <p>Day after day. Night after night.</p>
        <p>What initially started as a simple idea slowly became something much bigger. Every interface refinement, every feature implemented, every bug fixed, and every little improvement made the vision clearer.</p>
        <p>I didn’t have every detail figured out from the beginning. In fact, I would argue that I couldn’t have.</p>
        <p>Ideas don’t always arrive fully formed. Sometimes, you only discover what they are supposed to become by actually working on them.</p>
        <p>And somewhere along that journey, Reelish was born.</p>
        <p>Looking back, I realize that my story probably isn’t unique.</p>
        <p>Maybe some of you have experienced the same thing. You’ve had an idea so clear in your mind that you became convinced someone, somewhere, would eventually build it.</p>
        <p>You keep waiting. You keep looking. You keep hoping that someone will finally bring that idea to life.</p>
        <p>But here’s something I’ve learned:</p>
        <p class="founder-story-quote">Sometimes, the person you’ve been waiting for is you.</p>
        <p>And before you say, “But I don’t know how to build an app,” or “I don’t even know where to start,” let me tell you something.</p>
        <p>Nobody knows everything when they begin.</p>
        <p>I didn’t have the complete picture of Reelish when I started. I learned along the way. I made mistakes, encountered problems, changed directions, and discovered better ways to approach things.</p>
        <p>If I had waited until I knew everything, Reelish probably wouldn’t exist today.</p>
        <p>Because the truth is, you don’t need to have everything figured out before taking the first step.</p>
        <p>You just need to be willing to take it.</p>
        <p class="founder-story-quote">If we want to succeed, we must first allow ourselves to fail.</p>
        <p>What started as a personal project, something I initially wanted to build for myself, has grown into something much bigger than I originally imagined.</p>
        <p>And I know Reelish is still young.</p>
        <p>We’re not yet on the level of the biggest names in the industry. We don’t have their resources, their massive engineering teams, or their years of experience behind us.</p>
        <p>But every established platform had a beginning.</p>
        <p>Somewhere, someone had to believe in an idea before anyone else did.</p>
        <p>For me, that belief is what keeps me going.</p>
        <p>I’m not building Reelish just to have another app out there. I’m building it because I believe in the experience it can offer, the community it can bring together, and the possibilities it can grow into.</p>
        <p>There is still so much to improve, so much to learn, and so much more to build.</p>
        <p>And I intend to keep going.</p>
        <p>To everyone who has tried Reelish, supported the project, shared feedback, or simply taken the time to see what we’re building: thank you. You’re now part of a journey that started with one person’s frustration and a simple idea.</p>
        <p>This is only the beginning.</p>
        <p class="founder-story-closing"><strong>Welcome to Reelish.</strong></p>
        <p class="founder-story-signature">— Franze Kenneth Lobos, founder of Reelish</p>
      </div>

      <h2>How it’s built</h2>
      <ul>
        <li><strong>Catalog and playback are kept separate.</strong> TMDB answers “what should I watch?”, and the providers you install answer “where can this be played?”. The catalog stays useful even when provider availability changes.</li>
        <li><strong>Untrusted code runs in a sandbox.</strong> Provider scripts run in a resource-limited QuickJS runtime with no direct file or credential access, and network destinations are checked before requests are sent.</li>
        <li><strong>Pick up on any device.</strong> You sign in with Trakt, and the Reelish service keeps your viewing progress, collections and favorite genres the same on your phone, TV and PC. Video never passes through it, and nothing about the providers you use is sent.</li>
        <li><strong>Better together.</strong> Watch Party keeps everyone’s player in sync, and Friends lets you share titles, collections and messages. Both are opt-in.</li>
        <li><strong>Open source.</strong> Reelish is built with Flutter and Dart, and the code is on <a href="https://github.com/frnzeeey/reelish" target="_blank" rel="noopener noreferrer">GitHub</a>.</li>
      </ul>

      <h2>Who makes it</h2>
      <p>Reelish is designed and developed by <strong>Franze Kenneth Lobos</strong>, who works on everything from the interface and catalog services to provider integration and the video player. It’s an independent project and isn’t affiliated with TMDB, Trakt, Stremio, CloudStream, OpenSubtitles or IntroDB.</p>
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
    description: "What the Reelish service stores for your account, what stays on your device, and what is shared with the services you use.",
    updated: "November 15, 2026", // app policy of November 13, 2026, plus website advertising
    body: `
      <p>This is the same privacy policy shown in the Reelish app before first use. A section on this website is added at the end.</p>

      <h2>Who this applies to</h2>
      <p>This policy describes the Reelish app and the Reelish API, the online service the app uses for accounts, the catalog and watch parties. To browse the catalog you sign in with a Trakt account; Reelish has no passwords of its own. Your device and the services you choose to use also process data as described below.</p>

      <h2>Your Reelish account</h2>
      <p>You sign in on Trakt’s own page in your browser, or by entering a code on Trakt’s website from a TV. Reelish never sees your Trakt password. When you sign in, the Reelish API stores your Trakt account ID and username; your Trakt access tokens, encrypted, so the service can reach Trakt for you; and, for each signed-in device, a general label (such as “Android phone” or “Windows”), when it signed in and was last used, and session tokens kept only in hashed form. The service does not ask for your email address, contacts, payment details or precise location. Trakt’s own privacy policy applies to your Trakt account.</p>

      <h2>Viewing progress across your devices</h2>
      <p>So you can stop on one device and continue on another, the Reelish API stores, for your account, where you left each movie and episode you play: its TMDB number, the position and length, the next episode once one is finished, whether you removed it from Continue watching, and the title, year and TMDB artwork addresses its card shows. Each entry also holds a random identifier made by the app for each device (not a hardware identifier) and when the change was made. Nothing about the stream or provider you used is sent. Entries unchanged for over a year are deleted, and all of them when you delete your account.</p>

      <h2>Your collections across your devices</h2>
      <p>So your collections are the same on each device, the Reelish API stores, for your account, the folders and collections you make (their names, descriptions, order and chosen cover) and the titles in each: TMDB number, title, year, TMDB artwork addresses and when it was added. Each entry also holds the random device identifier described above and when the change was made. A deletion is kept as a short mark, with no name or title, for a year so your other devices remove the item too, then deleted. Everything is deleted when you delete your account.</p>

      <h2>Recommendation preferences</h2>
      <p>So recommendations follow you to each device, the Reelish API stores, for your account, the genres you pick, whether you answered or skipped the genre question, and whether personalised rows are on, with the random device identifier described above and when the change was made. What you watch and your feedback on recommendations are worked out on each device and not sent for this. They are deleted when you delete your account.</p>

      <h2>Friends</h2>
      <p>Friends is off until you turn it on in Profile &gt; Friends &amp; privacy. Then the Reelish API stores, for your account, the handle you choose, a random friend code, and, only if you set them, a name and one of the built-in avatars for friends to see, along with your Friends privacy settings. It also stores your friendships, friend requests waiting for an answer (deleted after 30 days) and the people you blocked. When you share a title, the friends you choose receive its title, year, TMDB artwork address and your note, kept for 180 days or until they remove it; it stays with them if you stop being friends, and blocking removes it. A collection you share with friends (every collection is private until you do) shows them its name, description and titles; making it private again, removing a friend, blocking or turning Friends off hides it at once. Only if you turn on "Share what I'm watching", the title you are playing (and its season and episode) is sent when it starts, for your friends to see; it is removed when you stop, expires on its own within hours even if the app closes unexpectedly, is never kept as a history, and is not sent during a Watch Party. Others can find you only by your exact friend code, or your exact handle if you allow it, and see only your handle and what you chose to share. A report you make about someone is kept with bug reports for up to 180 days, with the reported account and without your account id. Your Trakt username, Trakt picture and any profile photo are never shown to other people. Turning Friends off deletes all of this at once; your handle is then held for 30 days, with nothing else, so nobody else can take it and appear to be you, then released. Everything is deleted when you delete your account.</p>

      <h2>Information kept on your device</h2>
      <p>The app stores your favorites, recently played titles and resume positions, playback and notification preferences, your profile display name and avatar choice, installed add-on repository addresses and settings, a short-lived cache of selected stream sources, and a copy of the plugin library catalog in the app’s private storage, and your sign-in session in the device’s secure storage. A profile photo you choose stays on the device and is never uploaded. The app has no advertising. Usage statistics are sent only if you agree (see Usage statistics). You can remove favorites and history in Library, remove add-ons in Plugins, clear the torrent cache in Playback settings, or erase app data by uninstalling the app. Device backups and operating-system behavior are controlled by your platform provider.</p>

      <h2>Information sent when you use network features</h2>
      <p>When you browse, search or open titles, the app sends title identifiers and related requests to the Reelish API, which retrieves catalog data and details from The Movie Database (TMDB) for you; TMDB receives those requests from the service, not from your device. Artwork loads directly from TMDB’s image servers. If you turn on My list sync, the service reads and changes your Trakt watchlist for you. If you turn on new-episode alerts, the app sends the TMDB identifiers of series on My list or in progress to the service to check for new episodes; they are not stored. In a watch party, the title, the playback position and play or pause state, and each participant’s display name, chosen preset avatar (never a photo) and player status are shared through the service with the people in that party. Subtitle searches send a title or episode identifier to the OpenSubtitles v3 service. Intro and outro skipping sends an episode’s IMDb and episode numbers to IntroDB; turn both off in Settings &gt; Playback to send nothing. Opening the plugin library downloads its catalog from the app’s GitHub repository and loads provider logos from the addresses listed in it; those hosts can receive your IP address and request data, but no title or account information. If you install an add-on, the app contacts the repository and service addresses configured for it. Add-ons receive the title and episode identifiers needed for your request and may send them to their own servers. Direct streams, subtitle files and torrent/P2P playback connect to the selected source or peers; those operators can receive your IP address and request data. Video never passes through the Reelish API. Android and Windows may contact GitHub to check for app updates. When you choose an update, Android downloads an APK and uses its package installer after you confirm; installed Windows copies download the installer and run it after checking it, and portable copies download a ZIP for you to extract.</p>

      <h2>Problem reports and feedback</h2>
      <p>When you send a report or feedback from Help &amp; Support, the Reelish API stores what you wrote (title, category, details and optional steps), the device type you chose, and, unless you turn it off, the app version, build, operating system and version, interface, language and time. You see all of it before sending. It does not include your account name, history, providers or logs; the report is linked to a one-way code derived from your account so a person can send a limited number per day and so deleting your account deletes your reports. Reports are deleted after 180 days. Do not include personal information you do not want stored.</p>

      <h2>Usage statistics (Android only, optional)</h2>
      <p>On Android phones, Android TV and Google TV, Reelish asks once whether you want to share usage statistics, and sends none until you agree. If you do, Google Analytics for Firebase receives which pages and features you use, whether a search found results (not what you searched for), and for each playback session the movie or episode’s public TMDB number, how long it took to start, buffering, the kind of error if it failed, and roughly how much was watched. It never receives your account, Trakt name, display name, search text, add-on or provider names, stream addresses or tokens. Google also records standard app information such as device model, operating-system version, app version, approximate country and an app-instance identifier; the advertising identifier, the Android ID and ad personalization are turned off. Google keeps this data under its own policies and Reelish’s retention setting. You can turn sharing off in Settings at any time; doing so also clears the analytics data and identifier stored on the device. Windows sends no usage statistics.</p>

      <h2>Crash reports (Android only, optional)</h2>
      <p>On Android phones, Android TV and Google TV, Reelish asks separately whether you want to share crash reports, and sends none until you agree. If you do, Firebase Crashlytics receives what went wrong: the type of error and where in the app’s code it happened, a short description with addresses, tokens and codes removed, which page was open, whether a video or watch party was active and in which state, and recent app events that led up to it. If you also share usage statistics, those events can appear with the report. Google also records standard details such as device model, operating-system version, app version, free memory and storage, and an installation identifier. Reports never include your account, Trakt name, display name, search text, add-on or provider names, stream addresses, tokens or watch party codes. Google keeps reports for 90 days. You can turn sharing off in Settings at any time; doing so also deletes reports not yet sent.</p>

      <h2>Error log (Windows)</h2>
      <p>On Windows, Reelish keeps a small log of app errors on your computer to help with troubleshooting. It is limited in size, has addresses, tokens and codes removed, and is never sent anywhere. You can open it from Help &amp; Support.</p>

      <h2>Supporting Reelish (optional)</h2>
      <p>Donations are made on Buy Me a Coffee, which handles your payment and your details under its own policies; Reelish never sees your card. When you donate, Buy Me a Coffee tells the Reelish API that a donation succeeded. If your message contains your supporter code, your account receives the Supporter Badge. Reelish keeps only a one-way reference to the donation, its date and whether it was refunded, and not the amount, your name, your email address or your message. Your badge and the date you became a supporter are stored with your account and are deleted with it. A refunded donation no longer counts. You appear on the supporters list only if you turn that on, under a name you choose, which anyone using Reelish can see; you can turn it off at any time. If you ask for a review by email, the email is used only to check your donation.</p>

      <h2>Third-party services and add-ons</h2>
      <p>Trakt, TMDB, Cloudflare (which hosts the Reelish API), Google (usage statistics and crash reports, only if you agree), Buy Me a Coffee (only if you donate), OpenSubtitles, IntroDB, add-on publishers, media hosts, torrent peers, GitHub, and your device platform operate independently. Their privacy practices, logs, retention and locations are governed by their own policies. Cloudflare processes your IP address and request data to deliver the Reelish API. The app cannot control what an add-on publisher does with data it receives. Install only add-ons you trust. No payment, contacts, precise location or advertising identifier is requested by the app’s own features.</p>

      <h2>Retention and choices</h2>
      <p>Your account data stays on the Reelish API until you delete your account. You can sign out of one device or of all devices, and delete your account in Settings &gt; Profile and account; deleting it asks Trakt to revoke Reelish’s access and removes your account, your viewing progress, collections and recommendation preferences, your encrypted Trakt tokens and your device sessions, including those already signed out. A minimal security log, holding an internal account number, the kind of event (such as a sign-in or a sign-out) and its time, but no username, title or viewing information, is kept for 12 months to detect misuse, including after an account is deleted, and then erased. A watch party’s room is deleted when the party ends, and after 12 hours at most. Operational logs of the service record which address was requested and when, which can include a title identifier but not your account name, and are kept by the hosting provider for a limited period. On-device library entries and preferences remain until you remove them or erase app data. Third-party services may retain request data under their own policies; for data they hold, contact that service or add-on publisher directly. Applicable privacy rights depend on your location; email the developer at ${emailLink} for requests concerning the app or the Reelish API.</p>

      <h2>Children and changes</h2>
      <p>The app is not designed as a service for children. A parent or guardian who believes a child has provided personal information to a third-party service should contact that service and the app publisher. This policy may change when app features or legal requirements change; the updated version and date will appear here.</p>

      <h2>This website</h2>
      <p><strong>Advertising.</strong> This website shows ads through Google AdSense. Google and its partners use cookies and similar technologies to show ads and measure them, and these ads can be based on your visits to this website and to other websites. You can turn off personalized advertising in Google’s <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Ad Settings</a>, and read <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">how Google uses information from sites that use its services</a>. The Reelish app itself has no advertising.</p>
      <p>The website has no analytics of its own. To show the page, your browser loads fonts from Google Fonts, and the home page and changelog load release information, including download counts, from the GitHub API. Those services, and the host serving this site, can receive your IP address and standard request data under their own policies. Download links take you to GitHub Releases.</p>
      <p><strong>Reviews.</strong> The review form on the home page is optional. It sends your rating, display name, platform and review text to Netlify, which hosts this website and stores form submissions; Netlify also records the submission time and your IP address and may check submissions for spam. The developer reads each submission and may publish the rating, display name, platform, date and text on this website if you agreed to that. Not every review is published. To have your review removed from the website or deleted from Netlify, email ${emailLink} with your display name and roughly when you submitted it.</p>

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
    updated: "November 15, 2026", // Trakt, IntroDB and avatar artwork credits added
    body: `
      <h2>The Movie Database (TMDB)</h2>
      <p><strong>This product uses the TMDB API but is not endorsed or certified by TMDB.</strong></p>
      <p>Movie and TV show information, including titles, descriptions, artwork, ratings, and related metadata, may be provided by <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">The Movie Database (TMDB)</a>.</p>
      <p>TMDB trademarks and content remain with their respective owners; see TMDB’s terms and attribution requirements before redistributing any material.</p>

      <h2>Trakt</h2>
      <p><strong>Powered by Trakt.</strong> Sign-in, My list sync and new episode checks use <a href="https://trakt.tv/" target="_blank" rel="noopener noreferrer">Trakt</a>. Reelish is independent and is not sponsored by, endorsed by or affiliated with Trakt.</p>

      <h2>IntroDB</h2>
      <p>Intro and outro timestamps come from <a href="https://introdb.app/" target="_blank" rel="noopener noreferrer">IntroDB</a> (introdb.app), a community database of submitted timestamps. Reelish does not verify them beyond checking that they fit the episode playing. Reelish is not affiliated with IntroDB.</p>

      <h2>Third-party services</h2>
      <ul>
        <li><strong>OpenSubtitles v3</strong>: preinstalled Stremio subtitle addon used to search for subtitles. Reelish is not affiliated with OpenSubtitles.</li>
        <li><strong>GitHub</strong>: hosts Reelish releases for update checks and the plugin library catalog.</li>
      </ul>

      <h2>Artwork</h2>
      <p>Profile avatars are illustrations by <a href="https://www.figma.com/@angelina888" target="_blank" rel="noopener noreferrer">angelina888 on Figma</a>.</p>

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
    updated: "November 15, 2026", // package list matched to the app's pubspec.yaml at v1.36.1
    body: `
      <p>Reelish is built with Flutter and open-source packages. Each component remains subject to its own license. The full license text for every package and font is available in the app under <span class="ui">Settings → Help &amp; Support → About Reelish → Credits &amp; attribution → Open-source licenses</span>.</p>

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
          <tr><td>path_provider, path_provider_windows</td><td>App storage, cache and Pictures folder paths</td><td>BSD&nbsp;3&#8209;Clause</td></tr>
          <tr><td>flutter_secure_storage</td><td>Keeping your sign-in session in secure storage</td><td>BSD&nbsp;3&#8209;Clause</td></tr>
          <tr><td>image_picker</td><td>Choosing a profile photo</td><td>BSD&nbsp;3&#8209;Clause</td></tr>
          <tr><td>flutter_local_notifications</td><td>Notifications</td><td>BSD&nbsp;3&#8209;Clause</td></tr>
          <tr><td>workmanager</td><td>Background checks for new episodes on Android</td><td>MIT</td></tr>
          <tr><td>flutter_cache_manager</td><td>Keeping artwork on your device</td><td>MIT</td></tr>
          <tr><td>url_launcher</td><td>Opening external links</td><td>BSD&nbsp;3&#8209;Clause</td></tr>
          <tr><td>package_info_plus</td><td>App version information</td><td>BSD&nbsp;3&#8209;Clause</td></tr>
          <tr><td>video_player, video_player_android</td><td>Video playback</td><td>BSD&nbsp;3&#8209;Clause</td></tr>
          <tr><td>media_kit, media_kit_video, media_kit_libs_android_video, media_kit_libs_windows_video</td><td>Playback engine on Android and Windows</td><td>MIT</td></tr>
          <tr><td>video_player_media_kit</td><td>Playback engine adapter</td><td>MIT</td></tr>
          <tr><td>flutter_js</td><td>Running provider scripts (QuickJS)</td><td>MIT</td></tr>
          <tr><td>flutter_go_torrent_streamer</td><td>Torrent/P2P playback</td><td>MIT</td></tr>
          <tr><td>anacrolix/torrent</td><td>BitTorrent engine used by the torrent streamer</td><td>MPL 2.0</td></tr>
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
          <tr><td>Bebas Neue</td><td>App display typeface</td><td>SIL Open Font License 1.1</td></tr>
          <tr><td>Material Symbols</td><td>Website icons</td><td>Apache 2.0</td></tr>
        </tbody>
      </table>

      <h2>Source code</h2>
      <p>Reelish’s own source code is available on <a href="https://github.com/frnzeeey/reelish" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
    `,
  },
];

module.exports = { groups, pages };

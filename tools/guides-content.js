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
  account: { label: "Account & Social", icon: "people" },
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
      <p>Reelish is an open-source app for discovering movies and TV series and watching them with the providers you choose. It runs on Android phones and tablets, Android TV, Google TV and Windows, and combines a polished catalog, a personal library that follows you across your devices, a built-in video player and ways to watch with friends.</p>

      <h2>How Reelish works</h2>
      <p>Reelish splits the job of “finding something to watch” and “playing it” into separate pieces:</p>
      <ul>
        <li><strong>The catalog comes from TMDB.</strong> Titles, artwork, synopses, genres, cast and people are loaded from The Movie Database through the Reelish service.</li>
        <li><strong>Your account comes from Trakt.</strong> You sign in with a free Trakt account, and your viewing progress, collections and favorite genres stay the same on every device you use.</li>
        <li><strong>Streams come from providers you install.</strong> When you press play, Reelish asks your enabled providers for playable sources for that title. Providers don’t add titles to the catalog; they only answer “where can this be played?”.</li>
        <li><strong>Playback happens in the built-in player.</strong> It supports direct HTTP(S) streams, external subtitles, audio languages, intro skipping and more. On Android and Windows, compatible providers can also return torrent sources for P2P playback.</li>
      </ul>

      <h2>What Reelish doesn’t do</h2>
      <p>Reelish does not host, store or distribute any media, and video never passes through the Reelish service. Providers are third-party code published by independent authors, and the sources they return are operated by others. Install plugin collections only from publishers you trust.</p>
      <div class="guide-callout guide-callout-note">
        <strong>What leaves your device</strong>
        <p>Your viewing progress, collections and genre choices are stored with your account so they sync. Favorites, settings and provider choices stay on the device, and nothing about the providers or streams you use is sent. See the <a href="../privacy.html">privacy policy</a> for the details.</p>
      </div>

      <h2>What you need</h2>
      <ul>
        <li>An Android phone, tablet, Android TV or Google TV device, or a Windows 10 or 11 PC (64-bit).</li>
        <li>The latest release from GitHub Releases.</li>
        <li>A free <a href="https://trakt.tv/" target="_blank" rel="noopener noreferrer">Trakt</a> account to sign in.</li>
        <li>At least one plugin collection, added from the <span class="ui">Plugins</span> tab.</li>
      </ul>

      <h2>Where to go next</h2>
      <p>Start with <a href="downloading-the-apk.html">Downloading the APK</a> and <a href="installing-on-android.html">Installing on Android</a>, then <a href="signing-in-and-syncing.html">Signing In and Syncing</a>. Read <a href="understanding-third-party-plugins.html">Understanding Third-Party Plugins</a> before you add your first provider.</p>
    `,
  },
  {
    slug: "navigating-the-app",
    category: "getting-started",
    title: "Navigating the App",
    description: "Learn how to find your way around the Reelish interface.",
    body: `
      <p>On phones and tablets, Reelish is organized around four tabs in the dock at the bottom of the screen: <span class="ui">Home</span>, <span class="ui">Library</span>, <span class="ui">Plugins</span> and <span class="ui">Settings</span>. Your <span class="ui">Profile</span> opens from your avatar at the top right of Home. On Android TV and Google TV the same places are in the side menu, and on Windows in the sidebar; both also have <span class="ui">Movies</span>, <span class="ui">Series</span> and <span class="ui">Search</span>.</p>

      <h2>Home</h2>
      <p>Home is where discovery happens.</p>
      <ul>
        <li><strong>Reelish Spotlight</strong>: a rotating feature at the top, on phones and Windows. Swipe through it, open the title or add it to <span class="ui">My list</span>. Choose how it moves in <span class="ui">Settings → Appearance → Spotlight Experience</span>.</li>
        <li><strong>Join party and Search</strong>: on phones, at the top of Home next to your avatar.</li>
        <li><strong>Category chips</strong>: switch between <span class="ui">For you</span>, <span class="ui">Movies</span>, <span class="ui">Series</span> and the other categories to change what the rows below show.</li>
        <li><strong>Rows</strong> such as <span class="ui">Top 10 picks</span>, <span class="ui">Continue watching</span>, <span class="ui">Trending</span> and <span class="ui">New releases</span>, plus rows picked for you: <span class="ui">Recommended for you</span>, <span class="ui">Because you watched</span> a title, <span class="ui">Because you like</span> a genre, and <span class="ui">Something different</span>. Turn the personal rows off in <span class="ui">Settings → Recommendations</span>.</li>
        <li><strong>Search</strong>: one search finds movies, series, people and movie collections. Filter movies and series by genre, year and rating.</li>
      </ul>
      <p>New accounts are asked <span class="ui">What do you love watching?</span>. The genres you pick shape your recommendations and follow your account to your other devices.</p>

      <h2>Title details</h2>
      <p>Opening a title shows its artwork, rating, synopsis, genres and cast. For movies, tap <span class="ui">Play movie</span>; for series, pick a season and an episode. If you’ve started it, choose <span class="ui">Resume</span> or <span class="ui">Start over</span>. Reelish then searches your enabled providers for a stream. From the same page you can add the title to <span class="ui">My list</span> or a collection, <span class="ui">Share</span> it with friends, or start a Watch Party with <span class="ui">Watch together</span>.</p>
      <p>Tap a cast member to see what they acted in and directed. A movie that belongs to a series of films links to its collection, shown in release order. Both have a <span class="ui">Follow</span> button so you hear when there’s something new.</p>

      <h2>Library</h2>
      <p><span class="ui">My library</span> keeps everything you are watching and saving in one place. Use the <span class="ui">Everything</span>, <span class="ui">Continue</span>, <span class="ui">My list</span> and <span class="ui">Collections</span> filters to narrow it down.</p>
      <ul>
        <li><span class="ui">Continue watching</span>: titles you paused, on any of your devices. Finished titles leave the row, and a series shows its next episode.</li>
        <li><span class="ui">My list</span>: titles you saved for another night.</li>
        <li><span class="ui">Collections</span>: your own lists and folders, plus smart collections that fill themselves. See <a href="library-and-collections.html">Library and Collections</a>.</li>
        <li><span class="ui">Recently watched</span>: your latest activity. You can remove items from your watch history.</li>
      </ul>

      <h2>Plugins</h2>
      <p>The Plugins tab manages where streams come from. You can browse the community library, add a collection by link, see your active sources and turn individual providers on or off. See <a href="managing-providers.html">Managing Providers</a>.</p>

      <h2>Profile</h2>
      <p>Your profile shows your avatar, name, badges and your viewing at a glance (watched, in progress and on My list). From it you can open <span class="ui">Friends</span>, <span class="ui">Viewing statistics</span> and <span class="ui">Reelish Wrapped</span>, and change your <span class="ui">Profile card</span>, <span class="ui">Theme</span> and, on Android, <span class="ui">App icon</span>.</p>

      <h2>Settings</h2>
      <p>Settings is where you make Reelish work the way you like:</p>
      <ul>
        <li><span class="ui">Profile and account</span>: your display name and avatar, My list sync with Trakt, signing out and deleting your account.</li>
        <li><span class="ui">Appearance</span>: the theme, accent color, the Spotlight animation (<span class="ui">Spotlight Experience</span>) and, on Android, the app icon.</li>
        <li><span class="ui">Notifications</span>: new episodes, updates to titles on My list, people and collections you follow, and how alerts arrive.</li>
        <li><span class="ui">Recommendations</span>: the personal rows on Home.</li>
        <li><span class="ui">Join a watch party</span>: enter a party code.</li>
        <li><span class="ui">Playback</span>: player, stream selection, intro skipping, audio, subtitles and P2P options.</li>
        <li><span class="ui">Subtitle addons</span>: the subtitle sources searched while you watch.</li>
        <li><span class="ui">Help &amp; Support</span>: answers, troubleshooting, problem reports, release notes, <span class="ui">About Reelish</span> (version and updates), Reelish Supporters, and the privacy policy and terms of use.</li>
      </ul>
    `,
  },

  {
    slug: "library-and-collections",
    category: "getting-started",
    title: "Library and Collections",
    description: "Continue watching on any device, save titles and group them your way.",
    body: `
      <p><span class="ui">My library</span> keeps what you’re watching and saving in one place. Your progress and collections are stored with your account, so they’re the same on your phone, TV and PC.</p>

      <h2>Continue watching</h2>
      <p>Stop on one device and pick up on another. Finished titles leave the row (a title counts as finished from 90%), and a series shows its next episode as <span class="ui">Up next</span>. On a title’s page, choose <span class="ui">Resume</span> or <span class="ui">Start over</span>.</p>

      <h2>My list</h2>
      <p>Tap <span class="ui">My list</span> on any title to save it for another night. To keep My list the same on every device, turn on <span class="ui">Sync My list with Trakt watchlist</span> in <span class="ui">Settings → Profile and account</span>. With it off, My list stays on the device you’re using. See <a href="signing-in-and-syncing.html">Signing In and Syncing</a>.</p>

      <h2>Your own collections</h2>
      <ol class="guide-steps">
        <li>On any title’s page, tap <span class="ui">Collections…</span>.</li>
        <li>Pick a collection, or create one, such as Weekend movies.</li>
        <li>Find it in <span class="ui">My library</span> under the <span class="ui">Collections</span> filter.</li>
      </ol>
      <p>Group collections into folders with <span class="ui">New folder</span>. From a collection’s options you can <span class="ui">Edit collection</span>, <span class="ui">Move to folder</span>, <span class="ui">Choose cover</span>, reorder titles, or <span class="ui">Share with friends</span>. Every collection is private until you share it.</p>

      <h2>Smart collections</h2>
      <p>Three collections fill themselves: <span class="ui">Recently added</span>, <span class="ui">Not started</span> (saved titles you haven’t begun) and <span class="ui">Finished</span> (titles you watched to the end).</p>
    `,
  },

  // ---------------------------------------------------------------- Account & Social
  {
    slug: "signing-in-and-syncing",
    category: "account",
    title: "Signing In and Syncing",
    description: "Sign in with Trakt and keep Reelish the same on every device.",
    body: `
      <p>Reelish uses your <a href="https://trakt.tv/" target="_blank" rel="noopener noreferrer">Trakt</a> account to sign in. Reelish has no passwords of its own and never sees your Trakt password. If you don’t have a Trakt account, you can create one for free on Trakt’s sign-in page.</p>

      <h2>Sign in on a phone, tablet or PC</h2>
      <ol class="guide-steps">
        <li>On <span class="ui">Sign in to Reelish</span>, tap <span class="ui">Continue with Trakt</span>.</li>
        <li>Your browser opens Trakt’s page. Sign in and approve Reelish.</li>
        <li>Come back to Reelish. The page updates by itself and shows <span class="ui">Signed in. Loading Reelish…</span>.</li>
      </ol>
      <p>If your browser didn’t open, tap <span class="ui">Open Trakt again</span>, or <span class="ui">Use a code instead</span>.</p>

      <h2>Sign in on a TV, or with a code</h2>
      <ol class="guide-steps">
        <li>On a TV, choose <span class="ui">Sign in with Trakt</span>. Elsewhere, tap <span class="ui">Sign in with a code instead</span>.</li>
        <li>On your phone or computer, go to the address shown and <span class="ui">Enter this code</span>.</li>
        <li>Approve Reelish. The TV continues by itself.</li>
      </ol>
      <p>If the code runs out, tap <span class="ui">Get a new code</span>.</p>

      <h2>What syncs between your devices</h2>
      <ul>
        <li><strong>Continue watching</strong>: where you left each movie and episode, and the next episode to watch.</li>
        <li><strong>Collections</strong> and folders you create.</li>
        <li><strong>Genres you love</strong> and whether personal rows are on.</li>
        <li><strong>My list</strong>, if you turn on <span class="ui">Sync My list with Trakt watchlist</span> in <span class="ui">Settings → Profile and account</span>. It then stays in step with your Trakt watchlist.</li>
        <li>Your Trakt avatar and username.</li>
      </ul>
      <p>A display name, avatar or photo you choose in Reelish stays on that device, and a photo is never uploaded. Favorites, settings and plugins stay on each device. Nothing about the providers or streams you use is sent.</p>

      <h2>Sign out or delete your account</h2>
      <p>Open <span class="ui">Settings → Profile and account</span>:</p>
      <ul>
        <li><span class="ui">Sign out</span> signs this device out. <span class="ui">Sign out everywhere</span> signs out all your devices.</li>
        <li><span class="ui">Delete account</span> removes your account, viewing progress, collections, recommendation preferences and device sessions from the Reelish service, and asks Trakt to revoke Reelish’s access.</li>
      </ul>
      <p>See the <a href="../privacy.html">privacy policy</a> for exactly what’s stored and for how long.</p>
    `,
  },
  {
    slug: "watch-party",
    category: "account",
    title: "Watch Party",
    description: "Watch a movie or episode in sync with friends, with reactions and chat.",
    body: `
      <p>A Watch Party plays a movie or episode in sync for up to five people, including the host. Everyone plays from their own sources, and when the host plays, pauses, seeks or moves to the next episode, everyone follows.</p>

      <h2>Start a party</h2>
      <ol class="guide-steps">
        <li>Open a movie or series and choose <span class="ui">Watch together</span>. For a series, pick the episode.</li>
        <li>Set the room: how many people, whether <span class="ui">Everyone can play and pause</span>, and whether to <span class="ui">Wait for everyone</span> before starting.</li>
        <li>Tap <span class="ui">Create party</span> and share the 8-digit code with <span class="ui">Copy code</span>, or send an invite link with <span class="ui">Copy invitation</span>. On Android and Windows, the link opens Reelish with the code filled in.</li>
      </ol>
      <div class="guide-callout guide-callout-note">
        <strong>Hosting is a Supporter perk</strong>
        <p>Anyone signed in can join a party with a code. Hosting one is a thank-you to <a href="reelish-supporters.html">Reelish Supporters</a>, so a Supporter can invite friends who have never donated.</p>
      </div>

      <h2>Join a party</h2>
      <ol class="guide-steps">
        <li>Open <span class="ui">Settings → Join a watch party</span>, or on a phone use the button in the Home header.</li>
        <li>Enter the 8-digit code, or tap <span class="ui">Paste code</span>. Pasting a whole invitation works too. On a TV, use the remote’s number pad.</li>
        <li>Check the title, the host and how many people are in, then tap <span class="ui">Join party</span>.</li>
      </ol>
      <p>Each person needs a source for the title, so make sure your providers can play it.</p>

      <h2>The waiting room</h2>
      <p>The waiting room shows who has joined and whether their player is ready, with a count such as “2 of 3 ready”. The host can <span class="ui">Start watching</span> for everyone, <span class="ui">Make host</span> someone else, or <span class="ui">Remove from party</span>.</p>

      <h2>Reactions and chat</h2>
      <p>React and chat with everyone in the party, on top of the video or from the waiting room. Nothing is saved.</p>

      <h2>Leaving and ending</h2>
      <ul>
        <li>If you <span class="ui">Leave</span>, someone else becomes the host and the party goes on. You can join again with the code while the party is open.</li>
        <li>If the host chooses <span class="ui">End party</span>, everyone leaves and the code stops working.</li>
        <li>If the host loses their connection and doesn’t return, hosting is handed over.</li>
      </ul>
      <div class="guide-callout guide-callout-tip">
        <strong>During a party</strong>
        <p>Speed stays at 1×, and intros and outros aren’t skipped, so everyone stays in step.</p>
      </div>
    `,
  },
  {
    slug: "friends-and-messages",
    category: "account",
    title: "Friends and Messages",
    description: "Add friends, send them titles to watch and message them privately.",
    body: `
      <p>Friends is off until you turn it on. Then you can add friends, send them movie and series recommendations, share your collections, and message them privately.</p>

      <h2>Turn on Friends</h2>
      <ol class="guide-steps">
        <li>Open <span class="ui">Profile → Friends &amp; privacy</span> and tap <span class="ui">Turn on Friends</span>.</li>
        <li>Choose a handle that friends will see. It isn’t your Trakt username, and you can change it once a week.</li>
        <li>Optionally add a <span class="ui">Name friends see</span> and an avatar. Leave them empty to show only your handle.</li>
      </ol>
      <p>Your Trakt username, Trakt picture and any profile photo are never shown to other people.</p>

      <h2>Add a friend</h2>
      <ul>
        <li>Share <span class="ui">Your friend code</span> so others can add you.</li>
        <li>To add someone, choose <span class="ui">Add by code or @handle</span>, enter their friend code (or their handle, if they let people find them by it), then <span class="ui">Send request</span>.</li>
        <li>Requests you receive show <span class="ui">Wants to be friends</span>. <span class="ui">Accept</span> or <span class="ui">Decline</span>; they aren’t told if you decline.</li>
      </ul>

      <h2>Send a title to a friend</h2>
      <p>On a title’s page, tap <span class="ui">Share</span>, choose the friends who should see it, add a note if you like, and tap <span class="ui">Send</span>. Titles sent to you appear under <span class="ui">Recommendations</span> in Friends.</p>

      <h2>Share collections and what you’re watching</h2>
      <ul>
        <li>From a collection’s options, choose <span class="ui">Share with friends</span>. <span class="ui">Make private</span> hides it again straight away.</li>
        <li>Only if you turn on <span class="ui">Share what I’m watching</span> in <span class="ui">Friends &amp; privacy</span>, friends see what you’re playing now. It isn’t kept as a history and isn’t shared during a Watch Party.</li>
      </ul>

      <h2>Messages</h2>
      <p>Open a friend from your friends list to start a private conversation. Only the two of you can read it. All your conversations are under <span class="ui">Messages</span> in Friends, and each message shows when it’s <span class="ui">Sent</span> and <span class="ui">Delivered</span>.</p>

      <h2>Delete or unsend a message</h2>
      <p>Long-press a message on a phone, right-click it on Windows, or select it with the remote on a TV, then choose:</p>
      <ul>
        <li><span class="ui">Delete for you</span>: removes it from your devices only. Your friend still has it.</li>
        <li><span class="ui">Unsend for everyone</span>: for your own messages, removes it for both of you.</li>
      </ul>

      <h2>Conversation options</h2>
      <p>From a conversation’s options you can:</p>
      <ul>
        <li><span class="ui">Set nickname</span>: a name only you see for that friend. <span class="ui">Remove nickname</span> brings back their handle.</li>
        <li><span class="ui">Mute conversation</span>: messages still arrive, but don’t alert you or count as new.</li>
        <li><span class="ui">Delete conversation</span>: clears it from your devices. Your friend keeps their copy.</li>
      </ul>
      <p>These choices follow your account to your other devices.</p>

      <h2>Blocking, reporting and turning Friends off</h2>
      <p>You can remove a friend, block someone, or report them; they aren’t told who reported them. Blocked people are listed under <span class="ui">Blocked people</span>. Turning Friends off deletes your handle, friends, requests and what you’ve shared, all at once.</p>
    `,
  },
  {
    slug: "notifications",
    category: "account",
    title: "Notifications",
    description: "New episodes, title updates, people you follow, and when alerts arrive.",
    body: `
      <p>Reelish can tell you when there’s something new to watch. Notifications are available on Android phones and tablets and on Windows. Tapping an alert takes you straight to the title, person or collection it’s about.</p>

      <h2>Choose what you hear about</h2>
      <p>Open <span class="ui">Settings → Notifications</span> and turn on <span class="ui">Allow notifications</span>, then pick:</p>
      <ul>
        <li><strong>New episodes</strong>: <span class="ui">Series on My list</span>, <span class="ui">Series you are watching</span> and <span class="ui">Popular series</span>.</li>
        <li><span class="ui">My list updates</span>: a new season announced or dated, a movie dated, or a title released.</li>
        <li><span class="ui">People you follow</span> and <span class="ui">Collections you follow</span>: new films and series.</li>
        <li><span class="ui">Unfinished series</span>: a reminder about a series you left.</li>
        <li><span class="ui">Messages from friends</span>: who sent you a message, never what it says.</li>
        <li><span class="ui">Reelish Wrapped</span>: once in January, when your recap of the year is out.</li>
      </ul>
      <p>On Android, Reelish checks every few hours, even when it’s closed. On Windows, it checks while Reelish is open.</p>

      <h2>Follow people and collections</h2>
      <p>Tap <span class="ui">Follow</span> on a person’s page or on a movie collection’s page. Manage everyone you follow in <span class="ui">Settings → Notifications</span>, and tap <span class="ui">Unfollow</span> to stop.</p>

      <h2>How alerts arrive</h2>
      <ul>
        <li><span class="ui">As they happen</span>: each check shows what it found.</li>
        <li><span class="ui">Daily summary</span> or <span class="ui">Weekly summary</span>: everything found waits for one summary.</li>
        <li><span class="ui">Quiet hours</span>: nothing is shown overnight; what’s found waits until after.</li>
      </ul>
    `,
  },
  {
    slug: "reelish-wrapped",
    category: "account",
    title: "Reelish Wrapped and Viewing Statistics",
    description: "Your year on Reelish as a story, and your viewing at a glance.",
    body: `
      <p>Reelish counts what you watch so you can look back on it. Only you can see these numbers.</p>

      <h2>Reelish Wrapped</h2>
      <p>Wrapped tells your year on Reelish as a story: what you finished, your watch time, your top genres and actors, and your viewing personality. It’s counted from what you watched on Reelish on any of your devices.</p>
      <ol class="guide-steps">
        <li>Open <span class="ui">Profile → Reelish Wrapped</span> on your phone, TV or PC.</li>
        <li>Choose a year under <span class="ui">Your years</span> and tap <span class="ui">Open your recap</span>.</li>
      </ol>
      <p>Each year’s recap opens on 1 January. If you’d like, Reelish can notify you when it’s ready; see <a href="notifications.html">Notifications</a>.</p>

      <h2>Share your Wrapped</h2>
      <p>Turn any slide into a card in story, portrait or square format.</p>
      <ul>
        <li><strong>Android phones and tablets:</strong> share it from the share sheet, or save it to <code>Pictures/Reelish</code> (saving needs Android 10 or later).</li>
        <li><strong>Windows:</strong> save it to your <code>Pictures\\Reelish</code> folder, including when OneDrive keeps your Pictures.</li>
      </ul>

      <h2>Viewing statistics</h2>
      <p>Open <span class="ui">Profile → Viewing statistics</span> to see what you’ve watched lately: movies and episodes finished, series watched, your top genres and the last six months. They’re worked out on your device and never leave it.</p>
    `,
  },
  {
    slug: "reelish-supporters",
    category: "account",
    title: "Reelish Supporters",
    description: "Support Reelish with a donation, and the extras Supporters receive.",
    body: `
      <p>Supporting Reelish is completely optional. Donations help pay for development and server costs, and as a thank-you, Supporters receive a few extras. Everything else in Reelish stays available to everyone.</p>

      <h2>Become a Supporter</h2>
      <ol class="guide-steps">
        <li>Open <span class="ui">Settings → Help &amp; Support → Reelish Supporters</span>.</li>
        <li>Copy your supporter code.</li>
        <li>Donate on Buy Me a Coffee and paste the code into your message.</li>
      </ol>
      <p>When the donation goes through, your account receives the Supporter Badge, which never expires. Buy Me a Coffee handles the payment, and Reelish never sees your card. If the badge doesn’t appear, you can ask for a review by email from <span class="ui">Help &amp; Support</span>.</p>

      <h2>What Supporters receive</h2>
      <ul>
        <li><strong>Hosting Watch Parties</strong>, and inviting anyone to join. See <a href="watch-party.html">Watch Party</a>.</li>
        <li><strong>App themes</strong> that change the colors of every screen: Velvet Cinema, Aurora, Ember, Arctic, Ivory Studio (a light theme), Obsidian Gold and Rosé Noir.</li>
        <li><strong>Avatar frames</strong> in Elegant, Cinematic and Special Edition styles, shown next to your name in Watch Party.</li>
        <li><strong>Profile card</strong> extras: cinematic backgrounds, gentle animated effects and any color you like.</li>
        <li><strong>Spotlight animations</strong>: Classic Cover Flow, Spotlight Reveal, Floating Atmosphere and Stacked Motion, in <span class="ui">Settings → Appearance → Spotlight Experience</span>. Cinematic Depth and Minimal Motion stay free for everyone.</li>
        <li><strong>Every app icon</strong> on Android phones and tablets.</li>
        <li>A place on the supporters list, only if you turn on <span class="ui">Show me on the supporters list</span>, under a name you choose.</li>
      </ul>
      <div class="guide-callout guide-callout-tip">
        <strong>Try before you support</strong>
        <p>Anyone can preview the themes in <span class="ui">Settings → Appearance</span> and the avatar frames in <span class="ui">Profile → Avatar frame</span>. Every accent color, including a custom one, stays free for everyone.</p>
      </div>
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
        <li>Reelish shows <span class="ui">Before you start</span> with the privacy policy and terms of use. Read both to the end, then tap <span class="ui">Agree and continue</span>.</li>
        <li>On <span class="ui">Sign in to Reelish</span>, tap <span class="ui">Continue with Trakt</span> and approve Reelish on Trakt’s page in your browser, or choose <span class="ui">Sign in with a code instead</span>. See <a href="signing-in-and-syncing.html">Signing In and Syncing</a>.</li>
        <li>Pick a few genres you enjoy on <span class="ui">What do you love watching?</span>, or tap <span class="ui">Skip for now</span>.</li>
        <li>On Android, Reelish asks once whether you’d like to share usage statistics and crash reports. Both are optional and off unless you choose <span class="ui">Share</span>; you can change them later in Settings.</li>
      </ol>
      <p>You’ll land on Home, where the catalog is ready to browse. To actually play something, add a provider first. See <a href="adding-plugin-repositories.html">Adding Plugin Collections</a>.</p>

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
      <p>To check yourself, open <span class="ui">Settings → Help &amp; Support → About Reelish</span> and tap <span class="ui">Check for updates</span>. If you’re current, you’ll see <span class="ui">Reelish is up to date.</span></p>
      <p>If Reelish can’t open Android’s installer, you can save the verified update to your Downloads folder and install it from a file manager instead (Android 10 and later).</p>
      <div class="guide-callout guide-callout-note">
        <strong>On Windows</strong>
        <p>Installed copies of Reelish download the new installer, check it, and run it for you. Portable copies download a ZIP for you to extract.</p>
      </div>

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
        <li>A <strong>collection</strong> (also called a repository) is a set of providers described by a <code>manifest.json</code> file. You install a collection once, then turn its individual providers on or off.</li>
      </ul>
      <p>Providers don’t change the catalog. Titles, artwork and details always come from TMDB; providers only answer “where can this be played?”.</p>

      <h2>How providers run</h2>
      <p>Provider scripts run on your device in a constrained JavaScript runtime and can make network requests to their sources. Collections and your enabled-provider choices are saved locally.</p>
      <div class="guide-callout guide-callout-warning">
        <strong>Only install what you trust</strong>
        <p>Providers are third-party code and services. Reelish doesn’t supply or host streams, and community listings are not verified or endorsed by Reelish. Install collections only from publishers you trust.</p>
      </div>

      <h2>Code updates need your approval</h2>
      <p>Updates are downloaded and held for your review before anything changes. If a collection adds a provider or changes a provider’s code, that provider is paused and marked <span class="ui">Needs attention</span> until you review it in <span class="ui">Plugins</span> and tap <span class="ui">Allow update</span>. This way, new code never runs without your say-so.</p>

      <h2>The community library</h2>
      <p><span class="ui">Reelish Plugins</span> is a built-in library of community plugin collections, from a community-maintained catalog. Filter it by <span class="ui">All</span>, <span class="ui">Not installed</span> or <span class="ui">Installed</span>, choose a language and sort order, and install a plugin straight from its card. Each card shows the plugin’s version and when it was last updated. The catalog is refreshed at most every six hours (or when you pull to refresh), and a copy is bundled with each release for offline use.</p>

      <h2>Torrent sources</h2>
      <p>On Android and Windows, compatible providers can return torrent sources for P2P playback. This only works when <span class="ui">P2P streaming</span> is turned on in <span class="ui">Settings → Playback</span>, and availability depends on each provider.</p>
    `,
  },
  {
    slug: "adding-plugin-repositories",
    category: "plugins",
    title: "Adding Plugin Collections",
    description: "Connect compatible content providers to Reelish.",
    body: `
      <p>There are two ways to add a plugin collection (a provider repository): pick one from the built-in community library, or add one by link if you already have its manifest URL.</p>

      <h2>From the community library</h2>
      <ol class="guide-steps">
        <li>Open the <span class="ui">Plugins</span> tab and tap <span class="ui">Browse Reelish Plugins</span>.</li>
        <li>Search, or filter by <span class="ui">All</span>, <span class="ui">Not installed</span> or <span class="ui">Installed</span> and by language. Sections such as <span class="ui">Featured plugins</span> and <span class="ui">Recently updated</span> help you find popular choices.</li>
        <li>Tap <span class="ui">Install plugin</span> on its card, or open it first to see the author, description, languages, sources and last update.</li>
        <li>When it shows <span class="ui">Installed</span>, go back to Plugins.</li>
      </ol>

      <h2>By link</h2>
      <ol class="guide-steps">
        <li>Copy the collection’s manifest URL. It usually ends in <code>manifest.json</code>; a GitHub repository or file link also works.</li>
        <li>In <span class="ui">Plugins</span>, tap <span class="ui">Add by link</span>.</li>
        <li>Paste the address into <span class="ui">Provider manifest URL</span>, or tap <span class="ui">Paste from clipboard</span>.</li>
        <li>Tap <span class="ui">Add collection</span> and wait for <span class="ui">Checking manifest…</span> to finish.</li>
      </ol>

      <div class="guide-callout guide-callout-note">
        <strong>Supported links</strong>
        <p>Use an HTTPS link to a Reelish provider <code>manifest.json</code>, or a GitHub repository/file link that contains one. CloudStream repositories and Stremio add-on manifests are different formats and won’t install as providers.</p>
      </div>

      <h2>After installing</h2>
      <p>The new collection appears under <span class="ui">Your collections</span>. Open it and turn on the providers you want to use. See <a href="managing-providers.html">Managing Providers</a>. If you have trouble installing, see <a href="plugin-loading-problems.html">Plugin Loading Problems</a>.</p>
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
      <p>The <span class="ui">Your sources</span> card at the top shows how many providers are active, how many providers you have in total and how many collections are installed.</p>

      <h2>Turn providers on or off</h2>
      <ol class="guide-steps">
        <li>Under <span class="ui">Your collections</span>, open a collection.</li>
        <li>Use the switch next to each provider to enable or disable it.</li>
      </ol>
      <p>Only enabled providers are searched. Fewer, reliable providers usually means faster results.</p>

      <h2>Each provider’s page</h2>
      <p>Every installed collection and provider has its own page. A provider’s page shows its collection, version, languages and formats, whether it works on this device, and its last error if a search failed. Use <span class="ui">Search this provider</span> to include it or leave it out when you press play.</p>

      <h2>Approve provider updates</h2>
      <p>Updates are downloaded and held for your review. When a collection adds a provider or changes a provider’s code, Reelish pauses it and shows <span class="ui">Needs attention</span>. Review the change and tap <span class="ui">Allow update</span> only if you trust the collection.</p>

      <h2>Refresh or remove a collection</h2>
      <ul>
        <li>Tap <span class="ui">Refresh collections</span> to fetch the latest manifests.</li>
        <li>To uninstall, choose <span class="ui">Remove collection</span> and confirm <span class="ui">Remove collection?</span>. Its providers are removed from Reelish.</li>
        <li>If a collection fails to load, you’ll be offered <span class="ui">Retry</span> or <span class="ui">Remove</span>. Nothing is uninstalled unless you choose to.</li>
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
      <p>Reelish only searches enabled providers. Open <span class="ui">Plugins</span>, open a collection under <span class="ui">Your collections</span> and turn on at least one provider.</p>

      <h2>A provider is marked “Needs attention”</h2>
      <p>The collection added a provider or changed a provider’s code, so it’s paused until you review it. Tap <span class="ui">Allow update</span> if you trust the collection, or leave it paused. The provider’s own page shows why it needs attention and its last error.</p>

      <h2>“The enabled providers returned no streams for this title”</h2>
      <ul>
        <li>The title may simply not be available from your providers. Try another title to confirm they work.</li>
        <li>Enable additional providers, or add another collection.</li>
        <li>Check <span class="ui">Settings → Playback → Allowed plugins</span> — auto stream selection only uses the providers listed there.</li>
      </ul>

      <h2>“This provider took too long to respond”</h2>
      <p>The provider or its source is slow or down. Try again later, or turn the provider off so it doesn’t slow down other searches. You can also raise <span class="ui">Stream selection timeout</span> in <span class="ui">Settings → Playback</span> to wait longer for results.</p>

      <h2>Search is taking a long time</h2>
      <p>While <span class="ui">Searching providers…</span> is shown, you can tap <span class="ui">Cancel</span> at any time. Disabling providers you don’t use makes searches faster.</p>

      <h2>Still not working?</h2>
      <p>If a collection won’t install or load at all, see <a href="plugin-loading-problems.html">Plugin Loading Problems</a>. Provider issues are best reported to the collection’s author, since Reelish doesn’t maintain third-party providers.</p>
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
      <p>Sources labeled <span class="ui">Torrent</span> only appear on Android and Windows when <span class="ui">P2P streaming</span> is on and a provider supports them. They can take longer to start than direct streams.</p>
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
      <p>Tap the screen, then the settings icon to open <span class="ui">Playback settings</span>. Each section shows what’s in use, and picking an option applies it straight away:</p>
      <ul>
        <li><span class="ui">Speed</span>: from 0.5× to 2×. During a Watch Party, speed stays at 1×.</li>
        <li><span class="ui">Quality</span>: only the qualities this stream actually offers, or <span class="ui">Auto</span> to adjust to your connection.</li>
        <li><span class="ui">Audio &amp; language</span>: tracks are named by their language, such as Japanese or English, with details like Commentary or 5.1 to tell similar tracks apart. The language you pick stays for the rest of the session, even if the player reconnects or moves to another source.</li>
        <li><span class="ui">Subtitles</span>: the track, <span class="ui">Subtitle timing</span> and position. See <a href="subtitle-customization.html">Subtitle Customization</a>.</li>
        <li><span class="ui">Picture</span>: the <span class="ui">Aspect ratio</span>. <span class="ui">Fit</span> shows the whole picture, <span class="ui">Fill</span> fills the screen and may cut the edges, <span class="ui">Stretch</span> stretches the picture to the screen’s shape.</li>
        <li><span class="ui">Switch to …</span>: reopens the stream in the other player engine. Try this if the picture stays black while audio plays.</li>
      </ul>

      <h2>Skip intros and outros</h2>
      <p>Intros skip automatically, and a <span class="ui">Skip outro</span> button appears at the end credits, using community timestamps from IntroDB. Nothing is skipped when an episode’s timestamps aren’t known. Change this in <span class="ui">Settings → Playback</span> under <span class="ui">Intro &amp; outro</span>; turning both off sends nothing to IntroDB. Skipping isn’t used in a Watch Party.</p>

      <h2>Player controls and gestures</h2>
      <ul>
        <li>Skip back or forward 10 seconds with the on-screen buttons, or double-tap to seek.</li>
        <li>Swipe up or down to adjust brightness or volume.</li>
        <li>Press and hold the video to temporarily speed it up.</li>
        <li><span class="ui">Lock controls</span> prevents accidental touches; tap to unlock.</li>
        <li><span class="ui">Picture in picture</span> on Android phones and tablets: leave the app and the video keeps playing in a small window. Also <span class="ui">Lock to landscape</span> and, for series, <span class="ui">Episodes</span> and <span class="ui">Next episode</span>.</li>
        <li>When a title starts, a small card shows its age rating, and content notes when a rating board has published them.</li>
      </ul>
      <div class="guide-callout guide-callout-note">
        <strong>On Windows</strong>
        <p>Click the video to play or pause, and double-click to enter or leave fullscreen. Use the speaker button for volume, or <kbd>M</kbd> to mute. Hover over the timeline to preview the time you’ll jump to. The screen doesn’t sleep while a video plays.</p>
      </div>

      <h2>Your defaults</h2>
      <p>In <span class="ui">Settings → Playback</span>:</p>
      <ul>
        <li><span class="ui">Default playback speed</span> and <span class="ui">Preferred video quality</span>.</li>
        <li><span class="ui">Touch gestures</span>, <span class="ui">Hold to speed</span> and the <span class="ui">Hold speed</span> it uses.</li>
        <li><span class="ui">Show loading status</span> and <span class="ui">Pause overlay</span>, which shows title artwork and details when paused.</li>
        <li><span class="ui">Auto-play next episode</span> and the <span class="ui">Next episode threshold</span> at which it’s offered.</li>
        <li><span class="ui">Preferred audio language</span> and a <span class="ui">Secondary audio language</span> to fall back on.</li>
        <li><span class="ui">Intros</span> and <span class="ui">Outros</span> under <span class="ui">Intro &amp; outro</span>.</li>
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
        <li>If subtitles are out of sync, open <span class="ui">Playback settings → Subtitles → Subtitle timing</span>. Step them <span class="ui">Earlier</span> if they appear late, or <span class="ui">Later</span> if they come early, then tap <span class="ui">Apply</span> once.</li>
        <li>Use <span class="ui">Subtitle position</span> to raise or lower them, then tap <span class="ui">Done</span>.</li>
      </ol>
      <p>The subtitle list shows which subtitles are on, including <span class="ui">Off</span>.</p>

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
      <p>Your device can’t decode this stream, often high-resolution HEVC. Try <span class="ui">Switch to …</span>, choose a lower <span class="ui">Quality</span>, or pick a different source.</p>

      <h2>The audio language won’t change</h2>
      <p>Some streams can’t switch audio tracks. On Windows, Reelish notices, goes back to the language that was playing and tells you this stream can’t change its audio. Try another source that offers the language you want.</p>

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
          <tr><td>This provider repository is already installed.</td><td>Nothing to do — find it under <span class="ui">Your collections</span>.</td></tr>
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
        <li>“GitHub is limiting downloads right now” — wait a little and try again from <span class="ui">Settings → Help &amp; Support → About Reelish</span>.</li>
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
          <tr><td>Could not load titles. Check your connection and retry.</td><td>Check your connection, then tap <span class="ui">Retry</span>.</td></tr>
          <tr><td>The catalog is busy right now. Wait a moment and retry.</td><td>Wait a few seconds before retrying.</td></tr>
        </tbody>
      </table>

      <h2>Sign-in</h2>
      <table class="guide-table">
        <thead><tr><th>Message</th><th>Fix</th></tr></thead>
        <tbody>
          <tr><td>That code expired.</td><td>Tap <span class="ui">Get a new code</span> and enter the new one on Trakt.</td></tr>
          <tr><td>Sign-in was declined on Trakt.</td><td>Tap <span class="ui">Try again</span> and approve Reelish on Trakt’s page.</td></tr>
          <tr><td>Sign-in is not available right now.</td><td>Trakt may be busy. Try again in a few minutes.</td></tr>
          <tr><td>Your browser didn’t open</td><td>Tap <span class="ui">Open Trakt again</span>, or <span class="ui">Use a code instead</span>.</td></tr>
          <tr><td>Your session could not be verified. Sign out and in again.</td><td>Sign out in <span class="ui">Settings → Profile and account</span>, then sign in again.</td></tr>
        </tbody>
      </table>

      <h2>Watch Party</h2>
      <table class="guide-table">
        <thead><tr><th>Message</th><th>Fix</th></tr></thead>
        <tbody>
          <tr><td>No party has that code. Check it and try again.</td><td>Ask the host for the code again; it stops working when the party ends.</td></tr>
          <tr><td>This party is full.</td><td>A party holds up to five people, including the host.</td></tr>
          <tr><td>Hosting a Watch Party is for Reelish Supporters.</td><td>Join a friend’s party with a code, or see <a href="reelish-supporters.html">Reelish Supporters</a>.</td></tr>
          <tr><td>Too many tries. Wait a minute and try again.</td><td>Wait a minute before entering the code again.</td></tr>
        </tbody>
      </table>
      <p>More detail in <a href="watch-party.html">Watch Party</a>.</p>

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
          <tr><td>This device could not decode the video format.</td><td>Use <span class="ui">Switch to …</span> or a lower <span class="ui">Quality</span>.</td></tr>
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
          <tr><td>Unable to check for updates</td><td>Check your connection and retry from <span class="ui">Settings → Help &amp; Support → About Reelish</span>.</td></tr>
          <tr><td>The downloaded update failed its integrity check.</td><td>Retry the download.</td></tr>
          <tr><td>Allow Reelish to install updates</td><td>Tap <span class="ui">Open settings</span> and allow installs from Reelish.</td></tr>
        </tbody>
      </table>
    `,
  },
];

module.exports = { categories, guides };

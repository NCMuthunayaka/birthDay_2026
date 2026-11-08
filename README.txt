BIRTHDAY PAGE UPDATE — FILES TO PLACE IN YOUR EXISTING NEXT.JS PROJECT

Replace your existing app/page.tsx (or src/app/page.tsx) with page.tsx.
Place birthday.css beside page.tsx in the same app directory.
Do not create a new Next.js project.

ADD YOUR PHOTOS
Put your photos in the existing project's public/images/ folder:
  memory-01.jpg
  memory-02.jpg
  memory-03.jpg
  memory-04.jpg
  memory-05.jpg
  memory-06.jpg
  memory-07.jpg
  memory-08.jpg

If a photo is not present yet, a designed placeholder appears automatically.
You can use .jpg, .png, or .webp, but if you change an extension, also change
that filename in page.tsx.

ADD YOUR AUDIO
Birthday song: public/audio/birthday-song.mp3
Poem voice recording: public/audio/poem-recording.mp3

AUDIO BEHAVIOUR
- The cake candle lights 7 seconds after the page loads.
- The birthday song is attempted at candle-lighting.
- Some mobile browsers block sound until a tap. If blocked, the opening offers
  a Light the candle button to start the music with the user's interaction.
- When the poem section becomes visible, the birthday song volume drops and
  the poem recording starts.
- When the poem recording ends, the birthday song returns to normal volume.
- The floating music control can pause/resume the birthday song.

EDIT THE WORDS
The sample poem, memory captions, reasons, and final birthday letter are in
page.tsx. Replace them with your own words whenever you're ready.

This is a page-and-styles update for your existing project, not a new project.

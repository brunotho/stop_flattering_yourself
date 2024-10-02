LyricSnippet.destroy_all

# English lyric snippets
LyricSnippet.create!([
  { snippet: "Hey, Shawty, we could be friends", artist: "50 Cent", song: "Poor Lil Rich", difficulty: 300, language: "English" },
  { snippet: "Stop flattering yourself", artist: "Arctic Monkeys", song: "Do Me A Favour", difficulty: 400, language: "English" },
  { snippet: "I forgive you almost all the time", artist: "Lana Del Rey", song: "Roses", difficulty: 450, language: "English" },
  { snippet: "The good are never easy, the easy never good", artist: "Marina", song: "Homewrecker", difficulty: 550, language: "English" },
  { snippet: "But don't mess up my hair", artist: "Lady Gaga", song: "Vanity", difficulty: 250, language: "English" }
])

# # German lyric snippets (fictional)
LyricSnippet.create!([
  { snippet: "Bleib ruhig, alles ist gut", artist: "Helene Fischer", song: "Der Morgen", difficulty: 310, language: "German" },
  { snippet: "Die Sterne leuchten für dich", artist: "Max Giesinger", song: "Nacht Himmel", difficulty: 430, language: "German" },
  { snippet: "Tanze mit mir bis zum Ende der Zeit", artist: "Sarah Connor", song: "Zeitlos", difficulty: 380, language: "German" },
  { snippet: "Alles was ich brauche bist du", artist: "Andreas Bourani", song: "Mein Herz", difficulty: 470, language: "German" },
  { snippet: "Lass uns die Welt entdecken", artist: "Mark Forster", song: "Neue Wege", difficulty: 290, language: "German" }
])

p "Seed done 😍"

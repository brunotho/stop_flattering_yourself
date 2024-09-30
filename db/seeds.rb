# User.destroy_all
LyricSnippet.destroy_all

# users = User.create!([
#   { name: "Banana Bob", email: "bob@banana.com", password_hash: "hash_bob", password_salt: "salt_bob" },
#   { name: "50 Cent", email: "fiddy@rich.com", password_hash: "hash_fiddy", password_salt: "salt_fiddy" },
#   { name: "Angela Merkel", email: "angela@bundestag.de", password_hash: "hash_angela", password_salt: "salt_angela" }
# ])

LyricSnippet.create!([
  { snippet: "Hey, Shawty, we could be friends", artist: "50 Cent", song: "Poor Lil Rich", difficulty: 300 },
  { snippet: "Stop flattering yourself", artist: "Arctic Monkeys", song: "Do Me A Favour", difficulty: 400 },
  { snippet: "I forgive you almost all the time", artist: "Lana Del Rey", song: "Roses", difficulty: 450 },
  { snippet: "The good are never easy, the easy never good", artist: "Marina", song: "Homewrecker", difficulty: 550 },
  { snippet: "But don't mess up my hair", artist: "Lady Gaga", song: "Vanity", difficulty: 250 }
])

p "Seed done 😍"

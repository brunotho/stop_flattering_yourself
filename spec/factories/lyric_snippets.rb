FactoryBot.define do
  factory :lyric_snippet do
    snippet { "Boy I'm tired let's walk for a minute" }
    artist { "Nelly Furtado" }
    song { "Promiscuous" }
    difficulty { rand(1..1000) }
  end
end

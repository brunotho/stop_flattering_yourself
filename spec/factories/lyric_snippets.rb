FactoryBot.define do
  factory :lyric_snippet do
    snippet { "MyString" }
    artist { "MyString" }
    song { "MyString" }
    difficulty { 1 }
  end
end

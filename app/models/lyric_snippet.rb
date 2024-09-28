class LyricSnippet < ApplicationRecord
  has_many :user_snippets
  has_many :users, through: :user_snippets

  validates :snippet, presence: true
  validates :artist, presence: true
  validates :song, presence: true
  validates :difficulty, presence: true, inclusion: { in: 1..1000 }
end

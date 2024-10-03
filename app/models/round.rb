class Round < ApplicationRecord
  belongs_to :lyric_snippet
  belongs_to :user
  belongs_to :game_session

  validates :success, inclusion: { in: [ true, false ] }

  def score
    success ? lyric_snippet.difficulty : 0
  end
end

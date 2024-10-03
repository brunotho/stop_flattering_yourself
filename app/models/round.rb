class Round < ApplicationRecord
  belongs_to :lyric_snippet
  belongs_to :user
  belongs_to :game_session

  validates :succes, inclusion: { in: [ true, false ] }
end

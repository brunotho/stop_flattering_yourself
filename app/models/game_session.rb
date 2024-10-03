class GameSession < ApplicationRecord
  has_many :game_session_participants, dependent: :destroy
  has_many :users, through: :game_session_participants
  has_many :rounds, dependent: :destroy

  validates :status, inclusion: { in: [ true, false ] }

  before_create :set_default_status

  def check_game_session_completion
    if game_session.rounds.count >= 5
      game_session.update(status: 0)
    end
  end

  private

  def set_default_status
    self.status = true
  end
end

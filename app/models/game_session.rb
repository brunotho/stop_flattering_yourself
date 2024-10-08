class GameSession < ApplicationRecord
  has_many :rounds, dependent: :destroy
  has_many :game_session_participants, dependent: :destroy
  has_many :users, through: :game_session_participants

  before_validation :set_default_status, on: :create

  validates :status, inclusion: { in: [ true, false ] }

  def check_game_session_status
    if rounds.where(user_id: users.first.id).count >= 5
      update(status: false)
    end
  end

  def total_score(user)
    rounds.where(user: user).sum(&:score)
  end

  private

  def set_default_status
    self.status = true
  end
end

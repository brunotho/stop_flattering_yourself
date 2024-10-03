class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
        :recoverable, :rememberable, :validatable

  has_many :game_session_participants, dependent: :destroy
  has_many :game_sessions, through: :game_session_participants
  has_many :rounds

  # validates :language, inclusion: { in: %w[English German] }


  # def total_score
  #   gamesession.where(self.id).rounds.each { |round| round.score }.sum
  # end
end

class User < ApplicationRecord
  has_many :user_snippets
  has_many :lyric_snippets, through: :user_snippets

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }
  validates :password_hash, presence: true
  validates :password_salt, presence: true
end

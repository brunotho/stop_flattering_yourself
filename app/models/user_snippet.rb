class UserSnippet < ApplicationRecord
  belongs_to :user
  belongs_to :lyric_snippet
end

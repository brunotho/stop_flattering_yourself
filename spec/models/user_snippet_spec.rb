require 'rails_helper'

RSpec.describe UserSnippet, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
    it { should belong_to(:lyric_snippet) }
  end
end

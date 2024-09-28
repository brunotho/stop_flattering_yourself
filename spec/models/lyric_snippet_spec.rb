require 'rails_helper'

RSpec.describe LyricSnippet, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:snippet) }
    it { should validate_presence_of(:artist) }
    it { should validate_presence_of(:song) }
    it { should validate_presence_of(:difficulty) }
    it { should validate_inclusion_of(:difficulty).in_range(1..1000) }
  end
end


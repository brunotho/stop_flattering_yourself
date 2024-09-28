require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:name) }

    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:email) }
    it 'validates the email format' do
      bob = build(:user, email: 'circus@banana.com')
      expect(bob).to be_valid

      bob.email = 'circus@banana'
      expect(bob).not_to be_valid
    end

    it { should validate_presence_of(:password_hash) }
    it { should validate_presence_of(:password_salt) }
  end

  describe 'associations' do
    it { should have_many(:user_snippets) }
    it { should have_many(:lyric_snippets).through(:user_snippets) }
  end
end

FactoryBot.define do
  factory :user do
    name { "Banana Bob" }
    email { "circus@banana.com" }
    password_hash { "top_secret_hash" }
    password_salt { "mystery_salt" }
  end
end

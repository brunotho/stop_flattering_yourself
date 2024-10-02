Rails.application.routes.draw do
  devise_for :users
  get "welcome/home"

  get "profile", to: "users#show", as: :user_profile
  resources :users, only: [:show, :update]

  namespace :api do
    resources :users, only: [:update]
  end

  get "up" => "rails/health#show", as: :rails_health_check
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest

  root "welcome#home"
  resources :snippets, only: [:index, :create, :new]
  get "fetch_snippets", to: "snippets#fetch_snippets"
end

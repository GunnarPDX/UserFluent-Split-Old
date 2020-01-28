Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  namespace :api do
    namespace :v1 do
      resources :posts, only: %i[index create show destroy] do
        collection do
          put '/like/:id', to: 'posts#like'
          # get '/wsedrftgytcfytvjg', to: 'posts#user_posts' REMOVED
        end
      end
      resources :user, only: %i[index update] do
        collection do
          # get '/user_profile', to: 'user#user_profile'
          get '/user_info', to: 'user#user_info'
        end
      end
      resources :comments, only: %i[create destroy]
      resources :users, only: %i[show] do
        collection do
          get '/user_info/:id', to: 'users#user_info'
        end
      end
      # resources :auth, only: %i[create]
      devise_for :users
      devise_scope :api_v1_user do
        post '/new_user', to: 'auth#new_user'
        post '/new_session', to: 'auth#new_session'
      end
    end
  end

  devise_for :users
  get 'welcome/home'
  get '/app', to: 'welcome#app', as: 'app'
  root 'welcome#app'
  # root 'welcome#home'
  match '*path', to: 'welcome#app', via: :all
  get '/check.txt', to: proc { [200, {}, ['it_works']] }
end

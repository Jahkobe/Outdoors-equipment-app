Rails.application.routes.draw do
  root 'welcome#index'
  resources :notices
  resources :surves, only: [:show, :index, :new, :create, :edit, :update, :destroy]
  resources :climbs, only: [:show, :index, :new, :create, :edit, :update, :destroy]
  resources :snows, only: [:show, :index, :new, :create, :edit, :update, :destroy]
  resources :users, only: [:show, :index, :new, :create, :edit, :update]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

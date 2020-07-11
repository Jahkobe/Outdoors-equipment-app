Rails.application.routes.draw do
  resources :surves, only: [:show, :index, :new, :create, :edit, :update, :destroy]
  resources :climbs
  resources :snows
  resources :users, only: [:show, :index, :new, :create, :edit, :update]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

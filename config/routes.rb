Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'urls#index'
  
  post 'register' => 'users#new'
  post 'login' => 'session#login'
  get 'logout' => 'session#logout'

  post 'urls' => 'urls#new'
  
  #rest
  get 'user_owned' => 'users#urls'
  get 'user_favourites' => 'users#favourites'
  
  get 'tags' => 'tags#index'
  get 'url/:id/tags' => 'tags#get_tags_by_url'
  
  post 'url/:id/add_tag' => 'urls#add_tag'
  post 'remove_url' => 'users#remove_url'
  
  post 'url/:id/favourite' => 'urls#favourite'
  
  #api
  post 'api/login' => 'api#login'
  post 'api/add_url' => 'api#add_url'
  get 'api/tags_list' => 'api#tag_list'
  get 'api/urls' => 'api#url_list'
  get 'api/url/:id' => 'api#url_detail'
  get 'api/get_info_with_url' => 'api#get_info_with_url'
  get 'api/url/tag/:id' => 'api#get_urls_by_tag'
end

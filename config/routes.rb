Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
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
  get 'api/url_list' => 'api#url_list'
  get 'api/url/:id' => 'api#url_detail'
  get 'api/get_info_with_url' => 'api#get_info_with_url'
  get 'api/url/tag/:id' => 'api#get_urls_by_tag'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end

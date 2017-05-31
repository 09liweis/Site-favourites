Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'urls#index'
  
  get 'register' => 'users#register'
  post 'register' => 'users#new'
  get 'login' => 'users#login'
  post 'login' => 'session#login'
  get 'logout' => 'session#logout'
  
  get 'add_url' => 'users#add_url'

  post 'urls' => 'urls#new'
  
  #rest
  get 'user_owned' => 'users#urls'
  get 'user_favourites' => 'users#favourites'
  get 'urls_list' => 'urls#list'
  get 'get_info_with_url' => 'urls#get_info_with_url'
  
  get 'tags_list' => 'tags#list'
  get 'tags' => 'tags#index'
  get 'url/:id' => 'urls#detail'
  get 'url/:id/tags' => 'tags#get_tags_by_url'
  get 'url/tag/:id' => 'tags#get_urls_by_tag'
  
  post 'url/:id/add_tag' => 'urls#add_tag'
  post 'remove_url' => 'users#remove_url'
  
  post 'url/:id/favourite' => 'urls#favourite'
  
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

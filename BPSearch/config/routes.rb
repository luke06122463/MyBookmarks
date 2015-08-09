Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

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
  scope '(:locale)' do
    get 'help/index' => 'help#index'
    get 'version' => 'help#version'
     
    get 'user/search_ldap_user' => 'user#search_ldap_user'
    get 'auth/login' => 'auth#login'
    post 'auth/prologin' => 'auth#prologin'
    get 'auth/logout' => 'auth#logout'
    post 'auth/check_session_timeout' => 'auth#check_session_timeout'
    post 'auth/check_authentication' => 'auth#check_authentication'

    get 'bookmarks/test_insert' => 'bookmarks#test_insert'
    get 'bookmarks/test_query' => 'bookmarks#test_query'
    resources :bookmarks do
      member do
        #TODO: Add some operations route here for options 
      end
    end
    
    root "bookmarks#index"
  end
end
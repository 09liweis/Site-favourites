class SessionController < ApplicationController
    def login
        user = User.find_by(email: params[:email])
        if user && user.authenticate(params[:password])
            log_in user
            redirect_to '/urls'
        else
            render 'register'
        end
    end
    
    def logout
        log_out
        redirect_to root_url
    end
end

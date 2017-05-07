class SessionController < ApplicationController
    def login
        user = User.find_by(email: params[:email])
        if user && user.authenticate(params[:password])
            log_in user
            render json: {code: 200, msg: 'Login successfully'}
        else
            render json: {code: 400, msg: 'Something Wrong'}
        end
    end
    
    def logout
        log_out
        redirect_to root_url
    end
end

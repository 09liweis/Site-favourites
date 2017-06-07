class ApiController < ApplicationController
    def login
        user = User.find_by(email: params[:email])
        if user && user.authenticate(params[:password])
            render json: {code: 200, msg: 'Login successfully', user: user}
        else
            render json: {code: 400, msg: 'Something Wrong'}
        end
    end
    
    def test
        render json: {msg: 'test api'}
    end
end

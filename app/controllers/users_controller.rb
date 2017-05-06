class UsersController < ApplicationController

    def register
    end
    
    def new
        @user = User.new(
            email: params[:email],
            password: params[:password],
            password_confirmation: params[:password_confirmation]
        )
        if @user.save
            render json: {code: 200, msg: 'Sign up successfully'}
        else
            render json: {code: 400, msg: 'Something Wrong'}
        end
    end
    
    private
    
    def user_params
        params.require(:user).permit(:email, :password, :password_confirmation)
    end
end

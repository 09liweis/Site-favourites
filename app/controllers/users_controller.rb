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
            render 'login'
        else
            render 'register'
        end
    end
    
    private
    
    def user_params
        params.require(:user).permit(:email, :password, :password_confirmation)
    end
end

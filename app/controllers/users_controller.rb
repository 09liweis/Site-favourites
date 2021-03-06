class UsersController < ApplicationController
    
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
    
    def urls
        if session[:user_id] == nil
            render json: {code: 401, msg: 'You need to Login'}
        else
            current_user = User.find_by(id: session[:user_id])
            puts current_user
            urls = current_user.owned_urls
            render json: {code: 200, urls: urls}
        end
    end
    
    def favourites
        if session[:user_id] == nil
            render json: {code: 401, msg: 'You need to login'}
        else
            current_user = User.find_by(id: session[:user_id])
            urls = current_user.urls
            render json: {code: 200, urls: urls}
        end
    end
    
    def remove_url
        url = Url.find_by(id: params[:id])
        current_user = User.find_by(id: session[:user_id])
        current_user.urls.delete(url)
        render json: {code: 200}
    end
    
    private
    
    def user_params
        params.require(:user).permit(:email, :password, :password_confirmation)
    end
end

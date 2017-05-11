class UrlsController < ApplicationController
    def index
        if (session[:user_id])
            #@urls = Url.includes(:Urls_Users).where("Urls_Users.user_id = ?", session[:user_id])
        else
            @urls = Url.all
        end
        @urls = Url.all
    end
    
    def get_info_with_url
        website = params[:link]
        page = MetaInspector.new(website)
        url = { title: page.title, favicon: page.images.favicon }
        render json: {code: 200, url: url}
    end
    
    def new
        url = Url.new(
            title: params[:title],
            favicon: params[:favicon],
            link: params[:link]
        )
        if url.save
            current_user = User.find_by(id: session[:user_id])
            current_user.urls << url
            render json: {code: 200, msg: 'Added successfully'}
        else
            render json: {code: 400, msg: 'Fail'}
        end
    end
    
    def add_url
    end
end

class UrlsController < ApplicationController
    def index
        if (session[:user_id])
            #@urls = Url.includes(:Urls_Users).where("Urls_Users.user_id = ?", session[:user_id])
        else
            @urls = Url.all
        end
        @urls = Url.all
    end
    
    def new
        website = params[:link]
        page = MetaInspector.new(website)
        url = Url.new(
            title: page.title,
            favicon: page.images.favicon,
            link: website
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

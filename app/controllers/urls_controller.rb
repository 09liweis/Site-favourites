class UrlsController < ApplicationController
    # go to urls page
    def index
    end
    
    
    # go to add url page
    def add_url
    end
    
    
    # rest list of urls
    def list
        if (session[:user_id])
            #
        else
            #
        end
        urls = Url.all
        render json: {code: 200, urls: urls}
    end
    
    # get website info with url
    def get_info_with_url
        website = params[:link]
        page = MetaInspector.new(website)
        url = { title: page.title, favicon: page.images.favicon }
        render json: {code: 200, url: url}
    end
    
    # add new url
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
    
    # add tag to url
    def add_tag
        url = Url.find_by(id: params[:id])
        tag = Tag.find_by(name: params[:tag])
        if tag
            # if not url.tags.where(:tag_id => tag.id).any?
            #     url.tags << tag
            # end
            url.tags << tag
        else
            tag = Tag.new(name: params[:tag])
            url.tags << tag
        end
        render json: {code: 200, tags: url.tags}
    end
end

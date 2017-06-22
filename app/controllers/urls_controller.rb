class UrlsController < ApplicationController
    # go to urls page
    def index
        if session[:user_id] == nil
            @authenticated = false
        else
            @authenticated = true
        end
    end
    
    # add new url
    def new
        url = Url.new(
            title: params[:title],
            favicon: params[:favicon],
            link: params[:link]
        )
        tags = params[:tags]
        if tags
            tags.each do |t|
                tag = Tag.find_by(name: t)
                if tag
                    url.tags << tag
                else
                    tag = Tag.new(name: t)
                    url.tags << tag
                end
            end
        end

        if url.save
            current_user = User.find_by(id: session[:user_id])
            current_user.owned_urls << url
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
            ## TODO: handle tag with url in backend
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
    
    # favourite or unfavourite url
    def favourite
        if session[:user_id] == nil
            render json: {code: 401}
        else
            url_id = params[:id]
            url = Url.find_by(id: url_id)
            current_user = User.find_by(id: session[:user_id])
            if current_user.urls.exists?(url_id)
                current_user.urls.delete(url)
                favourite = false
            else
                current_user.urls << url
                favourite = true
            end
            users = url.users
            render json: {code: 200, favourite: favourite, users: users}
        end
    end
end

class UrlsController < ApplicationController
    # go to urls page
    def index
        if session[:user_id] == nil
            @authenticated = false
        else
            @authenticated = true
        end
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
    
    # get url detail
    def detail
        url = Url.find_by(id: params[:id])
        owner = false
        tags = url.tags

        if session[:user_id] == nil
            render json: {code: 200, url: url, tags: tags, owner: false, favourite: false}
        else
            if url.owner_id == session[:user_id]
                owner = true
            else
                user = User.find_by(id: session[:user_id])
                if (user.urls.exists?(url.id))
                    favourite = true
                else
                    favourite = false
                end
            end
            render json: {code: 200, url: url, owner: owner, tags: tags, favourite: favourite}
        end
    end
    
    # get website info with input url
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
            render json: {code: 200, favourite: favourite}
        end
    end
end

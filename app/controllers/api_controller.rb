class ApiController < ApplicationController
    skip_before_filter  :verify_authenticity_token
    after_filter :cors_set_access_control_headers
    
    def cors_set_access_control_headers
        headers['Access-Control-Allow-Origin'] = '*'
        headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
        headers['Access-Control-Request-Method'] = '*'
        headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    end
    
    
    def login
        user = User.find_by(email: params[:email])
        if user && user.authenticate(params[:password])
            render json: {code: 200, msg: 'Match account', user: user}
        else
            render json: {code: 400, msg: 'Something Wrong'}
        end
    end
    
    def add_url
        user_id = session[:user_id] == nil ? params[:user_id] : session[:user_id]
        user = User.find_by(id: user_id)
        if user
            url = Url.new(
                title: params[:title],
                favicon: params[:fav],
                link: params[:url]
            )
            if url.save
                user.owned_urls << url
                render json: {code: 200, msg: 'Add URL Successfully'}
            else
                render json: {code: 400, msg: 'URL Can not save'}
            end
            
        else
            render json: {code: 400, msg: 'Something Wrong'}
        end
    end
    
    # get website info with input url
    def get_info_with_url
        website = params[:link]
        puts website
        if website
            page = MetaInspector.new(website)
            if page
                url = { title: page.title, favicon: page.images.favicon ? page.images.favicon : page.images[0] }
                render json: {code: 200, url: url}
            else
                render json: {code: 500 }
            end
        end
        
    end
    
    # rest list of urls
    def url_list
        urls = Url.all.select('id, owner_id, title, link, favicon').order(created_at: :desc)
        render json: {code: 200, urls: urls}
    end
    
    # get url detail
    def url_detail
        url = Url.select('id, owner_id, title, favicon, link').find_by(id: params[:id])
        owner = false
        tags = url.tags
        users = url.users

        if session[:user_id] == nil
            render json: {code: 200, url: url, tags: tags, owner: false, favourite: false, users: users}
        else
            if url.owner_id == session[:user_id]
                owner = true
                favourite = false
            else
                user = User.find_by(id: session[:user_id])
                if (user.urls.exists?(url.id))
                    favourite = true
                else
                    favourite = false
                end
            end
            render json: {code: 200, url: url, owner: owner, tags: tags, favourite: favourite, users: users}
        end
    end
    
    # get list of tags
    def tag_list
        tags = Tag.select('id, name').order('name asc')
        render json: {code: 200, tags: tags}
    end
    
    # get urls with a specific tag id
    def get_urls_by_tag
        if (params[:id] == 'all') 
            urls = Url.all.order(created_at: :desc)
        else 
            tag = Tag.find_by(id: params[:id])
            urls = tag.urls.order(created_at: :desc)
        end
        render json: {code: 200, urls: urls}
    end
    
    def repopulate_url_info
        urls = Url.all.order(created_at: :desc)
        urls.each do |url|
            if url.link
                puts url.link
                begin
                    page = MetaInspector.new(url.link)
                    url.update_attributes(:title => page.title, :favicon => page.images.favicon)
                rescue => ex
                    logger.error ex.message
                end
            end
        end
        render json: {code: 200}
    end
    
    def remove_url
        user_id = session[:user_id] == nil ? params[:user_id] : session[:user_id]
        Url.find(params[:url_id]).destroy
        render json: {code: 200}
    end

end

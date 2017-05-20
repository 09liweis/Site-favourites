class TagsController < ApplicationController
    
    # get list of tags
    def list
        tags = Tag.all
        render json: {code: 200, tags: tags}
    end
    
    # search tags
    def index
        if (params[:keyword])
            like = '%' + params[:keyword] + '%'
            tags = Tag.where('name like ?', like)
        else
            tags = Tag.all()
        end
        
        render json: {code: 200, tags: tags}
    end
    
    # get tags with url id
    def get_tags_by_url
        url = Url.find_by(id: params[:id])
        tags = url.tags
        render json: {code: 200, tags: tags}
    end
    
    # get urls with a specific tag id
    def get_urls_by_tag
        if (params[:id] == 'all') 
            urls = Url.all
        else 
            tag = Tag.find_by(id: params[:id])
            urls = tag.urls
        end
        render json: {code: 200, urls: urls}
    end
end

class TagsController < ApplicationController
    def index
        if (params[:keyword])
            like = '%' + params[:keyword] + '%'
            tags = Tag.where('name like ?', like)
        else
            tags = Tag.all()
        end
        
        render json: {code: 200, tags: tags}
    end
    
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

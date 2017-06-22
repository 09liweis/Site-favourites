class TagsController < ApplicationController
    
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
end

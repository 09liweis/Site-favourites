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
end

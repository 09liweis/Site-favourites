class UrlsController < ApplicationController
    def index
        @urls = Url.all
        #Country.includes(:regions).all.map {|country| country.regions }.flatten
    end
    
    def new
        website = params[:url]
        page = MetaInspector.new(website)
        url = Url.new(
            title: page.title,
            favicon: page.images.favicon,
            link: website
        )
        url.save
        render json: {url: url}
    end
end

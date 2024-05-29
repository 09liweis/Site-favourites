require 'httparty'
require 'nokogiri'

class BookmarksController < ApplicationController
  def index
    render json: []
  end

  def import
    # downloading the target web page
    url = params[:url]
    unless url
      render json: { msg: 'URL is required' }, status: :bad_request
      return
    end

    requestOptions = {
      headers: {
        'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
      }
    }
    response = HTTParty.get(url, requestOptions)
    document = Nokogiri::HTML(response.body)
    # selecting all HTML product elements
    title = document.css('title')[0].text
    favicon = ''
    faviconNodes = document.css('link[rel="icon"]')[0]
    favicon = faviconNodes['href'] if faviconNodes

    keywords = ''
    keywordsNodes = document.css('meta[name="keywords"]')[0]
    keywords = keywordsNodes['content'] if keywordsNodes

    description = ''
    descriptionNodes = document.css('meta[name="description"]')[0]
    description = descriptionNodes['content'] if descriptionNodes
    data = {
      title:,
      favicon:,
      keywords:,
      description:,
      url:
    }

    render json: { msg: 'This is show page', data: }
  end
end

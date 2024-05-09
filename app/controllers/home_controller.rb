class HomeController < ApplicationController
  def index
    render json: { msg: 'This is home page' }
  end
end

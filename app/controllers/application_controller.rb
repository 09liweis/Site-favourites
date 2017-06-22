class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # require 'json_web_token'
  protect_from_forgery with: :null_session
  include SessionHelper
end

class Urltag < ActiveRecord::Base
    belongs_to :url
    belongs_to :tag
end

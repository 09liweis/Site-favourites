class Tag < ActiveRecord::Base
    has_many :urls, :through => :urltags
    has_many :urltags
end

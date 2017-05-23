class Url < ActiveRecord::Base
    has_many :user, :through => :userurls
    has_many :userurls
    
    has_many :tags, :through => :urltags
    has_many :urltags
    
    belongs_to :owner, class_name: 'User', foreign_key: :owner_id
end

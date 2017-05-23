class User < ActiveRecord::Base
    before_save { self.email = email.downcase }
    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
    validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }
    has_secure_password
    
    has_many :owned_urls, class_name: 'Url', foreign_key: :owner_id
    
    has_many :urls, :through => :userurls
    has_many :userurls
end

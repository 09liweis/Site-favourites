class User < ActiveRecord::Base
    before_save { self.email = email.downcase }
    before_create :generate_confirmation_instructions
    
    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
    validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }
    has_secure_password
    
    has_many :owned_urls, class_name: 'Url', foreign_key: :owner_id
    
    has_many :urls, :through => :userurls
    has_many :userurls
    
    def generate_confirmation_instructions
        self.confirmation_token = SecureRandom.hex(10)
    end
    
end

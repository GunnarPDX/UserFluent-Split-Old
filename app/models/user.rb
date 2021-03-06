class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable
  validates :username, presence: true
  validates_uniqueness_of :username, case_sensitive: false
  has_many :posts, dependent: :destroy
  has_many :comments
  acts_as_voter


  def avatar_small
    if avatar.nil? || avatar.blank?
      'https://res.cloudinary.com/dmqtrnawm/image/upload/q_auto:best/dpr_3.0/w_30,h_30,c_fill/v1579932804/UserFluent/uf-profile_ufqfug.png'
    else
      'https://res.cloudinary.com/dmqtrnawm/image/upload/e_improve/q_auto:best/dpr_3.0/w_30,h_30,c_fill/' + avatar + '.png'
    end
  end

  def avatar_medium
    if avatar.nil? || avatar.blank?
      'https://res.cloudinary.com/dmqtrnawm/image/upload/q_auto:best/dpr_3.0/w_60,h_60,c_fill/v1579932804/UserFluent/uf-profile_ufqfug.png'
    else
      'https://res.cloudinary.com/dmqtrnawm/image/upload/e_improve/q_auto:best/dpr_3.0/w_60,h_60,c_fill/' + avatar + '.png'
    end
  end

  def avatar_large
    if avatar.nil? || avatar.blank?
      'https://res.cloudinary.com/dmqtrnawm/image/upload/q_auto:best/dpr_3.0/w_100,h_100,c_fill/v1579932804/UserFluent/uf-profile_ufqfug.png'
    else
      'https://res.cloudinary.com/dmqtrnawm/image/upload/e_improve/q_auto:best/dpr_3.0/w_100,h_100,c_fill/' + avatar + '.png'
    end
  end


end

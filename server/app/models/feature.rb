class Feature < ApplicationRecord

    has_many :comments, dependent: :destroy
    validates  :title, :url, :place, :mag_type, :longitude, :latitude, presence: true
    validates :magnitude, numericality: { greater_than_or_equal_to: -1.0, less_than_or_equal_to: 10.0 }
    validates :latitude, numericality: { greater_than_or_equal_to: -90.0, less_than_or_equal_to: 90.0 }
    validates :longitude, numericality: { greater_than_or_equal_to: -180.0, less_than_or_equal_to: 180.0 }
    
    # Validación de unicidad basada en el url
    validates :url, uniqueness: true
  end
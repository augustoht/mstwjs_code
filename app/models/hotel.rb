class Hotel < ActiveRecord::Base
  belongs_to :trip
  attr_accessible :description, :price, :name, :trip, :nights_ordered
end

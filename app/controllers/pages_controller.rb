class PagesController < ApplicationController
  def home
    @recent_reviews = Review.latest.limit(4)
    @average_rating  = Review.average(:rating)&.round(1) || 0
    @review_count    = Review.count
  end

  def menu
  end

  def about
  end

  def contact
  end
end

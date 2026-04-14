class Review < ApplicationRecord
  validates :name, presence: true, length: { maximum: 100 }
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :rating, presence: true, inclusion: { in: 1..5 }
  validates :body, presence: true, length: { minimum: 10, maximum: 1000 }

  scope :latest, -> { order(created_at: :desc) }
  scope :approved, -> { where(rating: 1..5) }
end

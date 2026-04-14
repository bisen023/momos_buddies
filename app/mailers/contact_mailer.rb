class ContactMailer < ApplicationMailer
  default from: "momosbuddies62@gmail.com"

  MOMOS_BUDDIES_EMAIL = "momosbuddies62@gmail.com".freeze

  # Call with ContactMailer.thank_you_review(name:, email:).deliver_later
  def thank_you_review(name:, email:)
    @name  = name
    @email = email
    mail(
      to:      email,
      subject: "Thank You for Your Review — Momos Buddies 🙏"
    )
  end

  def review_notification(review)
    @review = review
    mail(
      to: MOMOS_BUDDIES_EMAIL,
      reply_to: @review.email,
      subject: "New Review Submitted by #{@review.name}"
    )
  end
end

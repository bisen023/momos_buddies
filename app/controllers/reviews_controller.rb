class ReviewsController < ApplicationController
  before_action :set_review, only: [:edit, :update, :destroy]

  def index
    @reviews = Review.latest
    @average_rating = @reviews.average(:rating)&.round(1) || 0
  end

  def new
    @review = Review.new
  end

  def create
    @review = Review.new(review_params)
    @reviews = Review.latest
    @average_rating = @reviews.average(:rating)&.round(1) || 0

    if @review.save
      ContactMailer.thank_you_review(name: @review.name, email: @review.email).deliver_now
      ContactMailer.review_notification(@review).deliver_now

      respond_to do |format|
        format.turbo_stream
        format.html { redirect_to reviews_path, notice: "🎉 Thank you for your review, #{@review.name}! A confirmation email has been sent." }
      end
    else
      respond_to do |format|
        format.turbo_stream { render turbo_stream: turbo_stream.replace("review_form", partial: "reviews/form", locals: { review: @review }) }
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  def edit
  end

  def update
    if @review.update(review_params)
      redirect_to reviews_path, notice: "✅ Review updated successfully!"
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @review.destroy
    redirect_to reviews_path, notice: "🗑️ Review deleted."
  end

  private

  def set_review
    @review = Review.find(params[:id])
  end

  def review_params
    params.require(:review).permit(:name, :email, :rating, :body)
  end
end

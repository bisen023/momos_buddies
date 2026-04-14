require "test_helper"

class ReviewsControllerTest < ActionDispatch::IntegrationTest
  test "creates review with turbo stream thank you state" do
    assert_difference("Review.count", 1) do
      post reviews_url,
           params: {
             review: {
               name: "Satyam",
               email: "",
               rating: 5,
               body: "The momos were hot, fresh, and full of flavor."
             }
           },
           as: :turbo_stream
    end

    assert_response :success
    assert_equal Mime[:turbo_stream], response.media_type
    assert_includes response.body, "review_form_card"
    assert_includes response.body, "Thank You for Your Review!"
  end
end

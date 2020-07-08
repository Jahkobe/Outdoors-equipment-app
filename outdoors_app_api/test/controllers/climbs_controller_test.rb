require 'test_helper'

class ClimbsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @climb = climbs(:one)
  end

  test "should get index" do
    get climbs_url, as: :json
    assert_response :success
  end

  test "should create climb" do
    assert_difference('Climb.count') do
      post climbs_url, params: { climb: { description: @climb.description, item: @climb.item, picture: @climb.picture, price: @climb.price } }, as: :json
    end

    assert_response 201
  end

  test "should show climb" do
    get climb_url(@climb), as: :json
    assert_response :success
  end

  test "should update climb" do
    patch climb_url(@climb), params: { climb: { description: @climb.description, item: @climb.item, picture: @climb.picture, price: @climb.price } }, as: :json
    assert_response 200
  end

  test "should destroy climb" do
    assert_difference('Climb.count', -1) do
      delete climb_url(@climb), as: :json
    end

    assert_response 204
  end
end

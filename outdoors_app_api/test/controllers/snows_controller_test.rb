require 'test_helper'

class SnowsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @snow = snows(:one)
  end

  test "should get index" do
    get snows_url, as: :json
    assert_response :success
  end

  test "should create snow" do
    assert_difference('Snow.count') do
      post snows_url, params: { snow: { description: @snow.description, item: @snow.item, picture: @snow.picture, price: @snow.price } }, as: :json
    end

    assert_response 201
  end

  test "should show snow" do
    get snow_url(@snow), as: :json
    assert_response :success
  end

  test "should update snow" do
    patch snow_url(@snow), params: { snow: { description: @snow.description, item: @snow.item, picture: @snow.picture, price: @snow.price } }, as: :json
    assert_response 200
  end

  test "should destroy snow" do
    assert_difference('Snow.count', -1) do
      delete snow_url(@snow), as: :json
    end

    assert_response 204
  end
end

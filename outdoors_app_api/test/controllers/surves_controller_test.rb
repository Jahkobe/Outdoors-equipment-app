require 'test_helper'

class SurvesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @surf = surves(:one)
  end

  test "should get index" do
    get surves_url, as: :json
    assert_response :success
  end

  test "should create surf" do
    assert_difference('Surf.count') do
      post surves_url, params: { surf: { description: @surf.description, item: @surf.item, picture: @surf.picture, price: @surf.price } }, as: :json
    end

    assert_response 201
  end

  test "should show surf" do
    get surf_url(@surf), as: :json
    assert_response :success
  end

  test "should update surf" do
    patch surf_url(@surf), params: { surf: { description: @surf.description, item: @surf.item, picture: @surf.picture, price: @surf.price } }, as: :json
    assert_response 200
  end

  test "should destroy surf" do
    assert_difference('Surf.count', -1) do
      delete surf_url(@surf), as: :json
    end

    assert_response 204
  end
end

class SnowsController < ApplicationController
  before_action :set_snow, only: [:show, :update, :destroy]

  # GET /snows
  def index
    @snows = Snow.all

    render json: @snows
  end

  # GET /snows/1
  def show
    render json: @snow
  end

  # POST /snows
  def create
    @snow = Snow.new(snow_params)

    if @snow.save
      render json: @snow, status: :created, location: @snow
    else
      render json: @snow.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /snows/1
  def update
    if @snow.update(snow_params)
      render json: @snow
    else
      render json: @snow.errors, status: :unprocessable_entity
    end
  end

  # DELETE /snows/1
  def destroy
    @snow.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_snow
      @snow = Snow.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def snow_params
      params.require(:snow).permit(:item, :picture, :description, :price)
    end
end

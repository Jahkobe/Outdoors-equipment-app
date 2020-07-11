class SurvesController < ApplicationController
  before_action :set_surf, only: [:show, :update, :destroy]

  # GET /surves
  def index
    @surves = Surf.all.reverse

    render json: @surves.to_json(include: :user)

  end

  # GET /surves/1
  def show
    render json: @surf
  end

  def edit
    render json: @surf = Surf.find(params[:id])
  end

  # POST /surves
  def create
    @surf = Surf.new(surf_params)
    @surf.user = User.first
    if @surf.save
      render json: @surf, status: :created, location: @surf
    else
      render json: @surf.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /surves/1
  def update
    if @surf.update(surf_params)
      render json: @surf
    else
      render json: @surf.errors, status: :unprocessable_entity
    end
  end

  # DELETE /surves/1
  def destroy
    @surf.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_surf
      @surf = Surf.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def surf_params
      params.require(:surf).permit(:item, :picture, :description, :price)
    end
end

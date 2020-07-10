class UsersController < ApplicationController
    before_action :set_user, only: [:show, :update, :destroy]
  
    # GET /surves
    def index
      @users = User.all.reverse
  
      render json: @users.to_json(include: [:surves])
    end
  
    # GET /surves/1
    def show
      @user = User.find(params[:id])
    end

    def edit
      @user = User.find(params[:id])
    end
  
    # POST /surves
    def create
      @user = User.new(user_params)
    
      if @user.save
        render json: @user, status: :created, location: @user
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end
  
    # PATCH/PUT /surves/1
    def update
      if @user.update(user_params)
        render json: @user
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /surves/1
    def destroy
      @user.destroy
    end
  
    private
      # Use callbacks to share common setup or constraints between actions.
      def set_user
        @user = User.find(params[:id])
      end
  
      # Only allow a trusted parameter "white list" through.
      def user_params
        params.require(:user).permit(:username, :email, :password_digest)
      end
  end
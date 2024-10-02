class Api::UsersController < ApplicationController
  before_action :authenticate_user!

  def update
    if current_user.update(user_params)
      render json: current_user.as_json(only: [:name, :email, :language])
    else
      render json: { errors: current_user.errors }, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :language, :password, :password_confirmation)
  end
end

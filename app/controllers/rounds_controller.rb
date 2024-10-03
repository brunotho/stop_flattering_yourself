class RoundsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_game_session

  def create
    @round = @game_session.rounds.build(round_params)
    @round.user = current_user

    if @round.save
      @game_session.check_game_session_completion

      render json: { message: "rounds#create success"}, status: :created
    else
      render json: { errors: @round.errors.full_messages }, status: 422
    end
  end

  private

  def set_game_session
    @game_session = current_user.game_sessions.find(params[:game_session_id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Game session not found" }, status: 404
  end

  def round_params
    params.require(:round).permit(:lyric_snippet_id, :success)
  end
end

class RoundsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_game_session

  def create
    unless @game_session.status?
      render json: { error: "Game session is already completed" }, status: 403
      return
    end

    @round = @game_session.rounds.build(round_params)
    @round.user = current_user
    @round.difficulty = @round.lyric_snippet.difficulty

    if @round.save
      @game_session.check_game_session_status

      render json: {
        message: "Round created successfully",
        round: @round.as_json(
          only: [:id, :success, :score],
          include: { lyric_snippet: { only: [:snippet] } }
        ),
        total_score: current_user.total_score,
        rounds_played: @game_session.rounds.where(user_id: current_user.id).count,
        successful_rounds_count: @game_session.rounds.where(user: current_user, success: true).count,
        status: @game_session.status?
      }, status: 201
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

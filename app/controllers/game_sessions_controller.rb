class GameSessionsController < ApplicationController
  before_action :authenticate_user!, only: [ :start_single_player ]

  # def new
  #   @game_session = current_user.game_sessions.new
  # end

  # def create
  #   @game_session = current_user.game_sessions.new(game_session_params)

  #   if @game_session.save
  #     redirect_to snippets_path
  #   else
  #     render :new, alert: "Failed to start session"
  #   end
  # end

  # def show
  #   @game_session = current_user.game_sessions.find(params[:id])
  # end


  def start_single_player
    ActiveRecord::Base.transaction do
      @game_session = current_user.game_sessions.create!
      @game_session.game_session_participants.create!(user: current_user)
    end
    redirect_to snippets_path, notice: "SP started"
  rescue ActiveRecord::RecordInvalid => e
    redirect_to root_path, alert: "Failed to start session: #{e.message}"
  end
end

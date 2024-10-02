class SnippetsController < ApplicationController
  before_action :authenticate_user!, except: [ :index, :fetch_snippets ]

  def index
  end

  def new
    @lyric_snippet = LyricSnippet.new
  end

  def create
    @lyric_snippet = LyricSnippet.new(snippet_params)

    if @lyric_snippet.save
      render :thank_you
    else
      render :new, status: :unprocessable_entity
    end
  end

  def fetch_snippets
    user_language = current_user&.language || "English"
    snippets = LyricSnippet.where(language: user_language).order("RANDOM()").limit(4)
    render json: snippets
  end

  private

  def snippet_params
    params.require(:lyric_snippet).permit(:snippet, :artist, :song, :difficulty, :language)
  end
end

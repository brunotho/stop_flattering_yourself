class SnippetsController < ApplicationController
  def index
  end

  def new
    @lyric_snippet = LyricSnippet.new
  end

  def create
    snippet = LyricSnippet.new(snippet_params)

    if snippet.save
      render json: snippet, status: :created
    else
      render json: snippet.errors, status: :unprocessable_entity
    end
  end

  def fetch_snippets
    snippets = LyricSnippet.order("RANDOM()").limit(4)
    render json: snippets
  end

  private

  def snippet_params
    params.require(:lyric_snippet).permit(:snippet, :artist, :song, :difficulty)
  end
end

require 'rails_helper'

RSpec.describe 'Snippets API', type: :request do
  describe 'GET /snippets' do
    it 'returns 4 random snippets' do
      create_list(:lyric_snippet, 10)

      get '/snippets'

      expect(response).to have_http_status(:success)

      expect(JSON.parse(response.body).size).to eq(4)
    end
  end

  describe 'POST /snippets' do
    it 'creates a new snippet' do
      snippet_params = {
        snippet: "New lyric snippet",
        artist: "New Artist",
        song: "New Song",
        difficulty: 500
      }

      post '/snippets', params: { lyric_snippet: snippet_params }

      expect(response).to have_http_status(:created)
      expect(LyricSnippet.last.snippet).to eq("New lyric snippet")
    end

    it 'returns a validation error for missing fields' do
      post '/snippets', params: { lyric_snippet: { snippet: '' } }

      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
end

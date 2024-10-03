class CreateGameSessions < ActiveRecord::Migration[7.2]
  def change
    create_table :game_sessions do |t|
      t.boolean :status

      t.timestamps
    end
  end
end

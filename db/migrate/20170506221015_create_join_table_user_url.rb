class CreateJoinTableUserUrl < ActiveRecord::Migration
  def change
    create_join_table :Users, :Urls do |t|
      t.index [:user_id, :url_id]
      t.index [:url_id, :user_id]
    end
  end
end

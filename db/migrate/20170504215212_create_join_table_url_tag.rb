class CreateJoinTableUrlTag < ActiveRecord::Migration
  def change
    create_join_table :Urls, :Tags do |t|
      t.index [:url_id, :tag_id]
      t.index [:tag_id, :url_id]
    end
  end
end

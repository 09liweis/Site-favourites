class CreateJoin < ActiveRecord::Migration
  def change
    create_table :userurls do |t|
      t.integer :user_id
      t.integer :url_id
      t.timestamps null: false
    end
    
    create_table :urltags do |t|
      t.integer :tag_id
      t.integer :url_id
      t.timestamps null: false
    end
    
  end
end

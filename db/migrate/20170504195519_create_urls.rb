class CreateUrls < ActiveRecord::Migration
  def change
    create_table :urls do |t|
      t.integer :owner_id

      t.string :title
      t.string :link
      t.string :favicon
      t.integer :view_count

      t.timestamps null: false
    end
  end
end

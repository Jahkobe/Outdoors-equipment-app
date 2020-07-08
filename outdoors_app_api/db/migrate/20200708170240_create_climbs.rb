class CreateClimbs < ActiveRecord::Migration[6.0]
  def change
    create_table :climbs do |t|
      t.string :item
      t.string :picture
      t.string :description
      t.string :price

      t.timestamps
    end
  end
end

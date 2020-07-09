class AddUserIdToSurves < ActiveRecord::Migration[6.0]
  def change
    add_column :surves, :user_id, :int
  end
end

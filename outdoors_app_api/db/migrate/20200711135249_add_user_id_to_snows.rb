class AddUserIdToSnows < ActiveRecord::Migration[6.0]
  def change
    add_column :snows, :user_id, :int
  end
end

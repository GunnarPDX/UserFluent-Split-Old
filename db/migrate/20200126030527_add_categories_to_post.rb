class AddCategoriesToPost < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :category, :string
    add_column :posts, :sub_category, :string
  end
end

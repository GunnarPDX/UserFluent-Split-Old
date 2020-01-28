class AddUserPostToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :user_post, :string
  end
end

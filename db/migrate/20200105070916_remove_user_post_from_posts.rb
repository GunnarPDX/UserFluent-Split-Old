class RemoveUserPostFromPosts < ActiveRecord::Migration[5.2]
  def change
    remove_column :posts, :user_post, :string
  end
end

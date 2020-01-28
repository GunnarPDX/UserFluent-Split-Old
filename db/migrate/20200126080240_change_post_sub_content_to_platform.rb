class ChangePostSubContentToPlatform < ActiveRecord::Migration[5.2]
  def change
    rename_column :posts, :sub_category, :platform
  end
end

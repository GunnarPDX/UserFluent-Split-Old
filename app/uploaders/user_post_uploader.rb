# frozen_string_literal: true

class UserPostUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  version :full do
    process resize_to_fit: [800, 600]
  end
  version :thumb do
    process resize_to_fit: [400, 300]
  end

  def extension_whitelist
    %w[jpg jpeg gif png]
  end
end

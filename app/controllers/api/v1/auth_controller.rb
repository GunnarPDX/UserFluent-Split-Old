# frozen_string_literal: true

module Api
  module V1
    class AuthController < Devise::SessionsController
      include Devise::Controllers::Helpers
      before_action :ensure_params_exist, only: %i[new_session]

      def new_user
        user = User.new(user_params)
        if user.save!
          sign_in('user', user)
          # yield resource if block_given?
          # respond_with resource, location: after_sign_in_path_for(resource)

          # user.save!
          render json: {}, status: 201
        else
          warden.custom_failure!
          render json: user.errors, status: 422
        end
      end

      def new_session
        resource_class.new
        user = User.find_by_email(login_params[:email])
        return invalid_login_attempt unless user

        if user.valid_password?(login_params[:password])
          sign_in('user', user)
          # yield resource if block_given?
          # respond_with resource, location: after_sign_in_path_for(resource)

          # user.save!
          render json: { success: true }, status: 201
        else
          invalid_login_attempt
        end
      end

      private

      def ensure_params_exist
        return unless params[:email].blank?

        render json: { success: false, message: 'Missing credentials!' }, status: 422
      end

      def invalid_login_attempt
        warden.custom_failure!
        render json: { success: false, message: 'Invalid Credentials!' }, status: 401
      end

      def user_params
        params.require(:auth).permit(:username, :email, :password, :password_confirmation)
      end

      def login_params
        params.require(:auth).permit(:email, :password)
      end

    end
  end
end

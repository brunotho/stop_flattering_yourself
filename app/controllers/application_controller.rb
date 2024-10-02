class ApplicationController < ActionController::Base
  before_action :configure_permitted_paramters, if: :devise_controller?
  
  allow_browser versions: :modern

  protected

  def configure_permitted_paramters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :language])
    devise_parameter_sanitizer.permit(:account_update, keys:[:name, :language])
  end
end

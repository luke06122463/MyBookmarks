require 'util/fake_client'
class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  #protect_from_forgery with: :exception
  before_filter :authenticate,:except=>[:prologin,:logout, :check_authentication]

  private
  def authenticate 
    # 1. User hasn't logged in yet, so deny his any request and redirect to the login page
    if !session[:user_name].nil? then
      # output the session
      puts "session content ------> "
      puts "user name: #{session[:user_name]}, user_id: #{session[:user_id]}, user_logon_name: #{session[:user_logon_name]}"
      puts "end ------------------> "

      # check whether token is expired. Actually, we need check token for twice, before and after the request
      # each conversation will keep an instance of Rest_Client
      @rest_client = Client::Rest_Client.new nil

      #check whether the session has been timeout
      sHelper = SessionHelper::Session.new @rest_client, session, request
      # flag to indicate whether session has been timeout
      @session_valid_flag = sHelper.check_session
    # 1.1 sessiom timeout, so let handle it accordting to the request method, ajax or normal http request
      if @session_valid_flag == false
# session timeout
        render :nothing => true, :status => 401
        return false
      end
    else
# unautheorized, user hasn't logged in yet
      puts "session is empty for user [#{session[:user_name]}]"
      render :nothing => true, :status => 401
      return false
    end
  end
end

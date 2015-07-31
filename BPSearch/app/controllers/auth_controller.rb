require 'json'
require 'constants'
require 'util/fake_client'

class AuthController < ApplicationController
  
  
  def prologin
    logon_succeed = false
    uname=params[:username]
    upass=params[:password]

    login_result = {:login_flag => false}

    # strip blank for user name
    uname.strip!

    @rest_client = Client::Rest_Client.new nil

    puts "The logon info: username [" + uname +"] attempt to logon"
    if (uname=="")
		  puts "username is empty. login failed"
		  login_result[:login_notice] = "user name is empty"
    elsif (upass=="")
		  puts "password is empty. login failed"
		  login_result[:login_notice] = "password is empty"
    else
  		#upass_encrypt = Encrypt.encrypt(upass)
  		puts "try to logon admin web"
  		parameters = { :username => uname,:password => upass}

      result = @rest_client.request_deliver(USER_AUTHENTICATION_URL, parameters)

      puts result.to_s

      if(result[:authenticated])

    		login_result[:login_notice] = "logon is successfull"
    		login_result[:login_flag] = true
  	    login_result[:login_data] = {
  	      :user_name => result[:user_name],
  	      :first_name => result[:first_name],
  	      :last_name => result[:last_name],
  	      :user_id => result[:user_id],
  	      :user_logon_name => result[:user_logon_name],
  	      :user_roles => result[:user_roles]
  	    }

  	    # store the userid into session for web validation
  	    session[:user_name]=login_result[:login_data][:user_name]
  	    session[:first_name]=login_result[:login_data][:first_name]
  	    session[:last_name]=login_result[:login_data][:last_name]
  	    session[:user_id]=login_result[:login_data][:user_id]
  	    session[:user_logon_name]=login_result[:login_data][:user_logon_name]
  	    session[:user_roles]=login_result[:login_data][:user_roles]
      end
    end
    render :json => login_result
  end
  
  def logout
    puts "user logout"
   
    render :json => {:logout_flag => true}
  end

  def check_authentication
    puts "check authentication"
    # todo: check whether the token has been expired
    if !session[:user_id].nil?
      render :json => {
        :has_login => true, 
        :login_data => {
          :user_name => session[:user_name],
          :first_name => session[:first_name],
          :last_name => session[:last_name],
          :user_id => session[:user_id],
          :user_logon_name => session[:user_logon_name],
          :user_roles => session[:user_roles]
        }
      }
    else
      render :json => {
        :has_login => false
      }
    end
  end
end

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

    # disable API
    #@rest_client = Client::Rest_Client.new nil

    # enable local call
    Mongo::Logger.level = ::Logger::INFO
    @client = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'bsm_002')
    
    sHelper = SessionHelper::Session.new @rest_client,session, request
    # clear session content rather that session itself. Otherwise, the CSRF will be changed
    sHelper.clearSessionContent

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

      # disable API
      #result = @rest_client.request_deliver(USER_AUTHENTICATION_URL, parameters)

      # enable local call
      result = nil
      @client[:users].find({:name => uname, :password=>upass}).each do |document|
        result = document#.to_json
        puts "document: #{result.to_s}"
      end

      if(!result.nil?)

    		login_result[:login_notice] = "logon is successfull"
    		login_result[:login_flag] = true
  	    login_result[:login_data] = {
  	      :user_name => result["display"],
  	      :first_name => '',#rresult[:first_name],
  	      :last_name => '',#rresult[:last_name],
  	      :user_id => result["_id"],
  	      :user_logon_name => result["name"],
  	      :user_roles => '',#rresult[:user_roles]
  	    }

  	    # store the userid into session for web validation
  	    session[:user_name]=login_result[:login_data][:user_name]
  	    session[:first_name]=login_result[:login_data][:first_name]
  	    session[:last_name]=login_result[:login_data][:last_name]
  	    session[:user_id]=login_result[:login_data][:user_id]
  	    session[:user_logon_name]=login_result[:login_data][:user_logon_name]
  	    session[:user_roles]=login_result[:login_data][:user_roles]

        # set the default value for session item. ip, last_active_time, browser_signature
        sHelper.setDefaultVaule
      end
    end
    render :json => login_result
  end
  
  def logout
    puts "user logout"

    session.clear
   
    render :json => {:logout_flag => true}
  end

  def check_authentication
    puts "check authentication"
    @rest_client = Client::Rest_Client.new nil
    sHelper = SessionHelper::Session.new @rest_client, session, request
    # todo: check whether the token has been expired
    if sHelper.check_session && sHelper.check_session_not_empty
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

  def initDB
    Mongo::Logger.level = ::Logger::INFO
    @client = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'bsm_002')

    # init users collection
    result = @client[:users].insert_many([
      { :name => 'luke', :password=> "bsm", :display=> "Luke Lu"},
      { :name => 'daisy', :password=> "bsm", :display=>"Daisy Reb"}
    ])
    t1 = result.n

    # init bookmark collection
    result = @client[:bookmarks].insert_many([
      {:title=>'ng-repeat的性能问题', :url => 'http://www.mamicode.com/info-detail-504104.html', :summary=>'(十三)通过DOM事件DOMNodeRemoved，看ng-repeat的性能问题以及track by的作用'},
      {:title=>'Oledata.mso attachment', :url => 'https://support.microsoft.com/en-us/kb/222330', :summary=>'You see a file with the extension of.wmz when you receive a message with Oledata.mso attachment'},
      {:title=>'How to Open Oledata.Mso Files', :url => 'http://www.ehow.com/how_6553901_open-oledata_mso-files.html', :summary=>'Oledata.Mso computer files are specifically formatted files relating to an attachment that is sent via email using Microsoft Outlook.'},
      {:title=>'Office & Productivity Software forum', :url => 'http://www.cnet.com/forums/discussions/what-are-oledata-mso-files-12465/', :summary=>'What are oledata.mso files?'},
      {:title=>'$watch How the $apply Runs a $digest', :url => 'http://angular-tips.com/blog/2013/08/watch-how-the-apply-runs-a-digest/', :summary=>'Angular users want to know how data-binding works. There is a lot of vocabulary around this: $watch, $apply, $digest, dirty-checking… What are they and how do they work?'},
      {:title=>'vertical-align in table cells', :url => 'http://phrogz.net/CSS/vertical-align/index.html', :summary=>'When used in table cells, vertical-align does what most people expect it to, which is mimic the (old, deprecated) valign attribute. '}
    ])
    t2 = result.n
    render :json => {:ret1=>t1, :ret2=>t2}
  end 
end

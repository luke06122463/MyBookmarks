require 'json'

module Client
  class Rest_Client
    def initialize(token)
      @token = token
      @is_expired = (token.nil?) ? true : false
      @is_cis_error = false
    end

    def request_deliver(url,params)
      case url
        when USER_AUTHENTICATION_URL
          return user_authentication(params)
      end
    end

    def user_authentication(params)
      result = {:authenticated => false}
      if(!params.nil?)
        if(params[:username] == 'luke' && params[:password] == 'luke')
          result[:authenticated] = true
          result[:user_name] = "luke"
          result[:first_name] = "Kai"
          result[:last_name] = "Lu"
          result[:user_id] = "001"
          result[:user_logon_name] = "lul4"
          result[:user_roles] = 1
        elsif(params[:username] == 'daisy' && params[:password] == 'daisy')
          result[:authenticated] = true
          result[:user_name] = "daisy"
          result[:first_name] = "Hui"
          result[:last_name] = "Ren"
          result[:user_id] = "002"
          result[:user_logon_name] = "renh1"
          result[:user_roles] = 2
        end
      end
      return result
    end

  end
end

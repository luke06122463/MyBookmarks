require 'json'
require 'constants'
#require 'mongo'
require 'util/fake_client'

class BookmarksController < ApplicationController
  def index
    bookmarks = @rest_client.request_deliver(BOOKMARK_URL,nil)
    render :json=> bookmarks
  end
=begin
  def test_insert
  	Mongo::Logger.level = ::Logger::INFO
  	client = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'music')
  	result = client[:artists].insert_one({ name: 'FKA Twigs 2a' , :id=> "a003"})
  	puts "result is #{result.n}"
	t1 = result.n #=> returns 1, because 1 document was inserted.

	result = client[:artists].insert_many([
	  { :name => 'Flying Lotus 2a', :id=> "a001" },
	  { :name => 'Aphex Twin 2a', :id=> "a002" }
	])
  	puts "result is #{result.n}"
	t2 = result.n #=> returns 2, since 2 documents were inserted.
	render :json=> {:ret1=>t1, :ret2=>t2}
  end

  def test_query
  	client = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'music')
  	count = client[:artists].find
  end
=end
end

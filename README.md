MyBookmarks aims to help us to manage our bookmarks with more visualization and accessibility.

One side, I love chrome's bookmark because it's so convenient to manage all the web resource I cherished. But on the other side, I can't help complaining its simplicity. Here is what bother me most:

+ With several year's accumulation, it becomes extremely hard to find what I want from such a messy url collection. How many times I have to go through each of bookmark folders to find the target. What was worse, it's  very likely you have no idea to your bookmark until you open the url and see the resource.

+ Considering the network condition of China, it's a great pain to re-open the bookmark since some request is hard to retrieve back, especially those resource whose server is outside of mainland.  Re-opening bookmark is time-consuming.

+ You have no idea when your bookmark is no longer available. Maybe author deletes their article or maybe the website is blocked according to some policy.

+ Since chrome has been driven out of China, we can't sync its bookmarks between different platform. I always worry about one day I may loss all of my bookmarks since it's not portable.

All in all, chrome's bookmarks can't fully support my requirement. So I decide to maintain and extend the bookmarks all by myself.

In order to maintain bookmark and achieve the functionality that I ask for, I plan to design and implement 'Bookmark Search Manager' project. Let's call it 'BSM' for short. 

Here is brief list of its features. 

+ Manage bookmarks by user
> BSM is basing on membership. User need to register as its member at first and all the  functionality are not available until he has logged in.

+ Branch-based management
> User can create/update bookmark repository by uploading chrome's bookmark to BSM. Each update will only merge the diff to the branch and all the commit will be recorded so that it's possible for user to switch to any version he wants. Actually, we call it go forward and back mechanism just as browser's go back/forward button.

+ Offline bookmarks
> BSM will do crawling for each of the bookmark automatically so that user can access the resource behind the bookmark offline without being scared of resource unavailable.

+ Show summary for bookmark
> User can add summary for each of bookmark and BSM will show title and summary of bookmark to user. This will help user have a better understanding of the resource and focus on what they are truly interested in.

+ Filter bookmarks by its organization
> Currently, chrome's bookmark is organized by folder.  So it's reasonable to provide a folder-based filter mechanism that user can choose a folder to see the bookmark under that folder. Maybe we can provide multiple selection.

+ **Provide search functionality for bookmark**
> Ideally, I want to provide search functionality for the whole website. User can search the specific bookmark according to the keywords he inputs.

+ Support for multiple bookmarks

See more in [wiki](https://github.com/luke06122463/MyBookmarks/wiki)

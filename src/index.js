                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  // //importing react in the file

import _ from 'lodash';
import React,{ Component} from 'react';
// //importing a reactdom to use react
import ReactDOM from 'react-dom';
//importing youtube API 
import YTSearch from 'youtube-api-search';
// //importing the search bar file 
import SearchBar from './components/search_bar';
// importing the video list
import VideoList from './components/video_list';
//importing videoDetail
import VideoDetail from './components/video_detail'
// //YouTub API  
const API_KEY = 'AIzaSyDUCq3l8PIvtK7gWdlLUhmVoshI0nt5Wdg';
//wix

// //create a new conponents. this components should produce
// //same HTML

class App extends Component {
  constructor(props){
    super(props);

    this.state = { 
      videos : [],
      selectedVideo: null
    };

    this.videoSearch('cute cat');
  }
  videoSearch(term){
    YTSearch({key: API_KEY, term:term}, (videos) => {
  	  this.setState({ 
        videos : videos,
        selectedVideo : videos[0]
      });
    });
  }


  render(){ 
    const videoSearch = _.debounce((term) => {this.videoSearch(term) }, 300);


  	return (
  		<div>
  	      <SearchBar onSearchTermChange={videoSearch} />
  	      <VideoDetail video={this.state.selectedVideo} />
  	      <VideoList 
            onVideoSelect={selectedVideo => this.setState({selectedVideo})}
            videos={this.state.videos} />
  	  </div>
  	);
  }
}


ReactDOM.render(<App />, document.querySelector('.container')); 

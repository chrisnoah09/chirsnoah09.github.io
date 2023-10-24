// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var vcfg = {
  height: '720', // 360
  width: '100%',
  videoId: '',
  playerVars: {
    autoplay: 1, // Auto-play the video on load
    mute: 1, // Mute the video
    controls: 0, // Show pause/play buttons in player
    showinfo: 0, // Hide the video title
    modestbranding: 1, // Hide the Youtube Logo
    fs: 0, // Hide the full screen button
    cc_load_policy: 0, // Hide closed captions
    iv_load_policy: 3, // Hide the Video Annotations
    start: '',
    end: '',
    autohide: 1, // Hide video controls when playing
  },
  events: {
  }
};

var v = { 'psg': {  'vid': [
                            { url: 'PszEoXyhju4', start: 1778 , end: 1785 },
                            { url: 'PszEoXyhju4', start: 19 , end: 40 },
                            { url: 'PszEoXyhju4', start: 31*60+19 , end: 31*60+25 },
                            { url: 'PszEoXyhju4', start: 31*60+36 , end: 31*60+42 },
                            { url: 'BAJhPuTtXjI', start: 12*60+27 , end: 12*60+35 },
                            { url: 'BAJhPuTtXjI', start: 26*60+54 , end: 27*60+02 },
                            { url: 'BAJhPuTtXjI', start: 28*60+34 , end: 28*60+41 },
                            { url: 'BAJhPuTtXjI', start: 31*60+26 , end: 31*60+34 },
                            { url: 'S3Ra7BlVq-k', start: '', end: ''},
                          ],
                 },
//          'olimpia' : { 'vid': [ 
//                            { url: 'sDVyEaAkJhM', start: 20, end: '' }, 
//                               ],
//                      }, 
//          'asaus' : { 'vid': [ 
//                           { url: '-mxnC03gBDU', start: 200, end: 210 },
//                           { url: 'Z4XLE4FiBTA', start: 0, end: 10 },
//                            { url: 'fdfNonL_VIo', start: 0, end: 10 },
//                            { url: 'J7VKaQZ1SYE', start: 0, end: 10 },
//                            { url: 'e_CHQJeaAlg', start: 0, end: 10 },
//                            { url: 'LQQGEQl7aDk', start: 0, end: 10 },
//                             ],
//                    }, 
        
                    };







function onYouTubePlayerAPIReady() {
  for (var target in v) {
    vcfg['videoId'] = v[target]['vid'][0]['url'];
    v[target]['count'] = 0;
    v[target]['falsetrigger'] = 0;

    vcfg['playerVars']['start'] = v[target]['vid'][0]['start'];
    vcfg['playerVars']['end'] = v[target]['vid'][0]['end'];

    const t = target;
    vcfg['events']['onStateChange'] = function(event){ onStateChange(event, t); };
    v[target]['player'] = new YT.Player( target+'_ytplayer', vcfg);
  }
}

function onStateChange(state, target) {
  if (state.data === YT.PlayerState.ENDED) {
    if ( v[target]['falsetrigger'] ) {
      v[target]['falsetrigger'] = 0;
    } else {
      v[target]['count']++;
      v[target]['falsetrigger'] = 1;
    }  
    if ( v[target]['count'] >= v[target]['vid'].length ) { 
      v[target]['count'] = 0; 
    }
    c = v[target]['count'];
    v[target]['player'].loadVideoById({
       videoId: v[target]['vid'][c]['url'],
       startSeconds: v[target]['vid'][c]['start'],
       endSeconds: v[target]['vid'][c]['end'],
    });
  }
}






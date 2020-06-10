// Main js file.
import { tooglePlay, loadSrc } from './videoController.js';
import { filter } from './effects.js';

window.onload = function() {

    /**
     *  INIT
     */
    
    // DATA ARRAY
    var playlist =  [  
        {name: "Big Buck Bunny", author: "Project Peach", duration: "1:00", url: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"},
        {name: "Sintel", author: "Blender Institute", duration: "2:30", url: "https://s3.amazonaws.com/senkorasic.com/test-media/video/sintel/trailer/sintel_trailer-720p.mp4" },
        {name: "Caminandes Llamigos", author: "Blender Institute", duration: "0:52", url: "https://s3.amazonaws.com/senkorasic.com/test-media/video/caminandes-llamigos/caminandes_llamigos_720p.mp4" }]; 

    var current_track; // We want to store the current track id

    // Get DOM components
    var player = document.getElementById("espotifai-player");
    var track_control = document.getElementById("track-control");
    var track_control_feedback = document.getElementById("track-control-feedback");
    var play_control = document.getElementById("play-control");
    var play_btn = document.getElementById("play-control");
    var filter_btn = document.getElementById("filter-control");

    // Set default setup
    player.src=playlist[0].url;
    player.load();

    /**
     *  EVENT LISTENERS
     */

    // #### Playlist
    var track_btn_list = document.getElementsByClassName("track-container");

    // #### Add eventlistener for each element of the track list
    Array.from(track_btn_list).forEach(function(track_btn) {
        track_btn.addEventListener('click', function(){

            // Get selected id
            var id = parseInt(this.querySelector(".track").getAttribute('value'));

            // Active class toggle
            Array.from(track_btn_list).forEach(function(track_btn) {
                track_btn.classList.remove("active");
            });
            this.classList.add("active");

            // Reset play arrow btn
            play_btn.firstElementChild.innerHTML = "play_arrow";
            
            // Load src
            loadSrc(player, playlist[id].url);
            
            // Change meta data
            current_track = parseInt(id);
            document.getElementById("trackname").innerHTML=playlist[current_track].name;
            document.getElementById("author").innerHTML=playlist[current_track].author;
            document.getElementById("duration").innerHTML=playlist[current_track].duration;

        }); 
    });

    // #### Filter BTN event listener
    filter_btn.addEventListener('click', function(){
        filter(player);
    });

    // #### Track control event listener
    play_control.addEventListener('click', function(){
        tooglePlay(player);
    });

    // #### when video track is finished, reset play_arrow icon
    player.addEventListener("ended", function(){
        play_btn.firstElementChild.innerHTML = "play_arrow";
    })
    

    // #### Track control feedback event listener
    track_control_feedback.parentElement.addEventListener('mousemove', function (e) {
        var rect = this.getBoundingClientRect(); // get relative position.
        var x = e.pageX - rect.left,
        y = e.pageY - this.offsetTop,
        clickedValue = x * track_control.getAttribute('aria-valuemax') / this.offsetWidth;
        var val = ((clickedValue/player.duration)*100) - (player.currentTime/player.duration)*100; // pointer position - current time position
        track_control_feedback.setAttribute("style", "width:"+  val +"%");
    });

    // #### Set width to 0% when mouse is out
    track_control_feedback.parentElement.addEventListener('mouseout', function (e) {
        track_control_feedback.setAttribute("style", "width:0%");
    });

    // #### Track control event listener
    track_control.parentElement.addEventListener('click', function (e) {
        var rect = this.getBoundingClientRect();
        var x = e.pageX - rect.left,
        y = e.pageY - this.offsetTop,
        clickedValue = x * track_control.getAttribute('aria-valuemax') / this.offsetWidth;
        player.currentTime = clickedValue;
        console.log("offset");
        console.log( x * parseFloat(track_control.getAttribute('aria-valuemax')) / this.offsetWidth );
        console.log("clicked");
        console.log(this.getBoundingClientRect());
    });

    // #### Assign progress bar limit
    player.onloadedmetadata = function() {
        track_control.setAttribute("aria-valuemax", player.duration);
        //track_control.valuemax = player.duration;
    };

    // #### Update progress bar status. This is relative to the track total time
    player.addEventListener('timeupdate',function(){
        track_control.setAttribute("aria-valuenow", player.currentTime);
        track_control.setAttribute("style", "width:"+(player.currentTime/player.duration)*100+"%");
    },false);


};



  

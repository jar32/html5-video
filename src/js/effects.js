
// Define
var play_btn = document.getElementById("play-control");
var filtered = false;

// #### Toggle play / stop button
play_btn.addEventListener("click", function(){
    var value = this.firstElementChild.innerHTML;
    if(value == "pause"){
        this.firstElementChild.innerHTML = "play_arrow";
    }else{
        this.firstElementChild.innerHTML = "pause";
    }
})

// #### This function adds the svg filter
export function filter(player) {
	if(!filtered){
        player.style.webkitFilter='url(#blurEffect)';
        player.style.mozFilter='url(#blurEffect)';
        player.style.filter='url(#blurEffect)';
        filtered=true;
	}
	else{
		player.style.webkitFilter='';
		player.style.mozFilter='';
		player.style.filter='';
		filtered=false;
	}
}
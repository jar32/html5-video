
// #### Play / Stop
export function tooglePlay(player) {
    if(player.paused==true){
      try {
        player.play();
      }
      catch(error) {
        response = "No hay ninguna pista seleccionada";
      }
      
    }else{
      player.pause();
    }
}


// #### Load audio track from the playlist
export function loadSrc(player, src){
  try {
    player.src=src;
    player.load();
    
  } catch (error) {
    response = "La PlayList está vacía";
  }
}

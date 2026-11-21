import {HarborGame} from './game.js';
import {installShots} from './shots.js';
const params=new URLSearchParams(location.search);
const game=new HarborGame(params.get('seed')??Date.now());
installShots(game);
document.querySelector('#hint').onclick=()=>game.hint();
for(const id of ['new','again'])document.getElementById(id).onclick=()=>game.newGame();
window.addEventListener('keydown',e=>{if(e.repeat||e.ctrlKey||e.metaKey||e.altKey)return;if(e.key.toLowerCase()==='h')game.hint();if(e.key.toLowerCase()==='r')game.newGame()});
if(params.has('shot'))window.SpotShots.run(params.get('shot'));

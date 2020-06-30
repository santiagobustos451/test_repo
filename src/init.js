import Bootloader from './bootloader.js';
import mainmenu from './scenes/mainmenu.js'; 
import gamescene from './scenes/gamescene.js';
import ayuda from './scenes/ayuda.js';

	const config = {
		width: 800,
		height: 800,
		parent: "container",
		scale: {
                    mode: Phaser.Scale.FIT,
                    autoCenter: Phaser.Scale.CENTER_BOTH
          },
	    physics: {
	        default: "arcade",
	        arcade: {
	            debug: false,
	            gravity: { y: 0}
	        }
	        },
	    scene: [
			Bootloader,
			mainmenu,
			ayuda,
	        gamescene,
	    ]
	}
	
	
	new Phaser.Game(config);

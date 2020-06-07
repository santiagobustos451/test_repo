import Bootloader from './bootloader.js'; 
import escena1 from './scenes/escena1.js';

	const config = {
	    width: 800,
	    height: 600,
	    parent: "container",
	    physics: {
	        default: "arcade",
	        arcade: {
	            debug: false,
	            gravity: { y: 0}
	        }
	        },
	    scene: [
	        Bootloader,
	        escena1,
	    ]
	}
	
	
	new Phaser.Game(config);
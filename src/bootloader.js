class Bootloader extends Phaser.Scene {
    constructor() {
        super({key: "Bootloader"});
    }
    preload() {
        this.load.on("complete", () => {
            this.scene.start("escena1");
        });
    
        //hacer acá abajo el preload
        this.load.spritesheet('Sp_cofre','./assets/cofre.png', {frameWidth: 234, frameHeight: 229});
        this.load.image('Sp_moneda','./assets/moneda.png');
<<<<<<< HEAD
        this.load.image('Sp_fondo','./assets/fondo.png');
=======
>>>>>>> c3998d04fea8228eabfed9b0860bd7e3f6414b99
    }
}

export default Bootloader;

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
        this.load.image('Sp_fondo','./assets/fondo.png');
    }
}

export default Bootloader;

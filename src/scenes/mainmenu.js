var boton;
var boton2;
var boton3;
var overlay;

class mainmenu extends Phaser.Scene {
    constructor() {
        super({key: "mainmenu"});
    }

    create(){
        let center_width = this.sys.game.config.width/2;
        let center_height = this.sys.game.config.height/2;
        

        this.add.image(center_width,center_height,'bg_mainmenu');
        
        
        boton = this.add.sprite(center_width,center_height+150,'b_jugar').setInteractive();
        boton2 = this.add.sprite(center_width,center_height+250,'b_ayuda').setInteractive();
        boton3 = this.add.sprite(center_width,center_height+350,'b_creditos').setInteractive();
        overlay = this.add.image(center_width,center_height,'creditos').setVisible(false);

        boton.on('pointerup',function(){
            console.log("From menu to game");
            this.scene.switch('gamescene');
        },this);
        boton2.on('pointerup',function(){
            console.log("From menu to game");
            this.scene.switch('ayuda');
        },this);
        boton3.on('pointerup',function(){
            console.log("From menu to game");
            overlay.setVisible(true);
        },this);
        this.input.on('pointerdown',function(){
            if(overlay.setVisible){
            overlay.setVisible(false);
            }
        },this);
    }
}

export default mainmenu;
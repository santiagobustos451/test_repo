//importar objetos aquí
import Moneda from '../gameObjects/moneda.js';
//variables aquí

var cofre;
var monedaFlag = 0;

class escena1 extends Phaser.Scene {
    constructor() {
        super({key: "escena1"});
    }
    
    //create
    create (){
        //cofre se abre y cierra
        cofre = this.add.sprite(400,300,'Sp_cofre').setInteractive();

        this.anims.create({
            key: 'open',
            frames: [ { key: 'Sp_cofre', frame: 1 } ],
            frameRate: 20,
        });
        this.anims.create({
            key: 'closed',
            frames: [ { key: 'Sp_cofre', frame: 0 } ],
            frameRate: 20,
        });

        cofre.on('pointerover', function () {

            this.anims.play('open');
    
        });
        cofre.on('pointerout', function () {

            this.anims.play('closed');
    
        });
        cofre.on('pointerdown',  function(){
            monedaFlag = 1;
        });
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;
    
        });

    }
    //update
    update (time, delta){
        if (monedaFlag==1){
            this.createMoneda();
            monedaFlag = 0;
        }
    }
    createMoneda(pointer){
        console.log("Soy createmoneda");
        this.newMoneda = new Moneda(this,this.input.mousePointer.x,this.input.mousePointer.y,'Sp_moneda');
        this.newMoneda.setInteractive();
        //this.input.setDraggable(this.newMoneda);
        this.input.on("pointermove", this.follow, this);
        this.input.on("pointerup", this.drop, this);
    }
    follow(pointer){
        this.newMoneda.x = pointer.x;
        this.newMoneda.y = pointer.y;
    }
    drop(pointer){
        console.log("soltado");
        this.input.off("pointermove", this.follow, this);
        this.newMoneda.x = pointer.upX;
        this.newMoneda.y = pointer.upY;
        this.input.off("pointerup", this.drop, this);
        this.input.setDraggable(this.newMoneda);
    }
}


export default escena1;



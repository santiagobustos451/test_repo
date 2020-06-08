//importar objetos aquí
import Moneda from '../gameObjects/moneda.js';
//variables aquí

var cofre;
var ctndr_monedas;
var F_monedaCrear = 0;
var F_monedaAgarrada = 1;
var cant_monedas = 0;

class escena1 extends Phaser.Scene {
    constructor() {
        super({key: "escena1"});
    }
    
    //create
    create (){

        
        //fondo
        var fondo = this.add.sprite(400,300,'Sp_fondo');
        ctndr_monedas = [];

        //cofre se abre y cierra
        cofre = this.add.sprite(200,300,'Sp_cofre').setInteractive();

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

        //cofre crea monedas
        cofre.on('pointerdown',  function(){
            F_monedaCrear = 1;
        });
        //puntero arrastra
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;
    
        });

    }
    //update
    update (time, delta){
        if (F_monedaCrear==1){
            this.createMoneda();
            F_monedaCrear = 0;
        }
        var i
        for(i=cant_monedas;i>0;i--){
            if (ctndr_monedas[(i-1)] != undefined && F_monedaAgarrada == 0){
                if (ctndr_monedas[(i-1)].x<575 && ctndr_monedas[(i-1)].x>425 && ctndr_monedas[(i-1)].y<225 && ctndr_monedas[(i-1)].y>75){
                    ctndr_monedas[(i-1)].x = 500;
                    ctndr_monedas[(i-1)].y = 150;
                }
                else if (ctndr_monedas[(i-1)].x<725 && ctndr_monedas[(i-1)].x>575 && ctndr_monedas[(i-1)].y<225 && ctndr_monedas[(i-1)].y>75){
                    ctndr_monedas[(i-1)].x = 650;
                    ctndr_monedas[(i-1)].y = 150;
                }
                else if (ctndr_monedas[(i-1)].x<575 && ctndr_monedas[(i-1)].x>425 && ctndr_monedas[(i-1)].y<375 && ctndr_monedas[(i-1)].y>225){
                    ctndr_monedas[(i-1)].x = 500;
                    ctndr_monedas[(i-1)].y = 300;
                }
                else if (ctndr_monedas[(i-1)].x<725 && ctndr_monedas[(i-1)].x>575 && ctndr_monedas[(i-1)].y<375 && ctndr_monedas[(i-1)].y>225){
                    ctndr_monedas[(i-1)].x = 650;
                    ctndr_monedas[(i-1)].y = 300;
                }
                else if (ctndr_monedas[(i-1)].x<575 && ctndr_monedas[(i-1)].x>425 && ctndr_monedas[(i-1)].y<525 && ctndr_monedas[(i-1)].y>375){
                    ctndr_monedas[(i-1)].x = 500;
                    ctndr_monedas[(i-1)].y = 450;
                }
                else if (ctndr_monedas[(i-1)].x<725 && ctndr_monedas[(i-1)].x>575 && ctndr_monedas[(i-1)].y<525 && ctndr_monedas[(i-1)].y>375){
                    ctndr_monedas[(i-1)].x = 650;
                    ctndr_monedas[(i-1)].y = 450;
                }
                else{  
                    if(ctndr_monedas[(i-1)].active){
                        
                        ctndr_monedas[(i-1)].destroy();
                        ctndr_monedas.splice(i-1,1);
                        cant_monedas--;
                        console.log(ctndr_monedas);

                    }
                }
            }
        }
    }

    //Crea una moneda
    createMoneda(){
        
        //console.log("Soy createmoneda");
        this.newMoneda = new Moneda(this,this.input.mousePointer.x,this.input.mousePointer.y,'Sp_moneda');
        cant_monedas++;
        ctndr_monedas.push(this.newMoneda);
        console.log(cant_monedas); 
        this.newMoneda.setInteractive();
        //this.input.setDraggable(this.newMoneda);
        this.input.on("pointermove", this.follow, this); //sigue al cursor
        this.input.on("pointerup", this.drop, this); //si se suelta, se vuelve draggeable
        this.input.on("drag", this.drag, this); //al draggear, la moneda está agarrada
        F_monedaAgarrada = 1;
        console.log(ctndr_monedas);
        
    }

    //
    follow(pointer){
        
        //console.log(F_monedaAgarrada);
        this.newMoneda.x = pointer.x;
        this.newMoneda.y = pointer.y;
    }
    drop(pointer){
        
        this.input.off("pointermove", this.follow, this);
        this.input.setDraggable(this.newMoneda);
        F_monedaAgarrada = 0;
        //console.log(F_monedaAgarrada);
    }
    drag(){
        
        F_monedaAgarrada = 1;
        //console.log(F_monedaAgarrada);
    }
}


export default escena1;



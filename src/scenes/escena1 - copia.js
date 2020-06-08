//importar objetos aquí
import Moneda from '../gameObjects/moneda.js';
//variables aquí

var i;
var cofre;
var ctndr_monedas = [];
var F_monedaCrear = 0;
var F_monedaAgarrada = 1;
var cant_monedas = 0;
var celdaAnt_moneda = undefined;
const celdasX = [500,650,500,650,500,650];
const celdasY = [150,150,300,300,450,450];
const limitesCeldasX1 = [425,575,425,575,425,575];
const limitesCeldasX2 = [575,725,575,725,575,725];
const limitesCeldasY1 = [75,225,375,75,225,375];
const limitesCeldasY2 = [225,375,525,225,375,525];
var F_celdas = [0,0,0,0,0,0];

class escena1 extends Phaser.Scene {
    constructor() {
        super({key: "escena1"});
    }
    
    //create
    create (){

        
        //fondo
        var fondo = this.add.sprite(400,300,'Sp_fondo');
        //ctndr_monedas;

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
        
        for(i=cant_monedas;i>0;i--){
            if (ctndr_monedas[(i-1)] != undefined && F_monedaAgarrada == 0){ 
                if(ctndr_monedas[(i-1)].x>425 && ctndr_monedas[(i-1)].x<725 && ctndr_monedas[(i-1)].y>75 && ctndr_monedas[(i-1)].y<525){
                    var a
                    for(a=0;a<6;a++){
                        console.log(ctndr_monedas);
                        //si la moneda se suelta en la caja
                        if (ctndr_monedas[(i-1)].x>limitesCeldasX1[a] && ctndr_monedas[(i-1)].x<limitesCeldasX2[a] && ctndr_monedas[(i-1)].y>limitesCeldasY1[a] && ctndr_monedas[(i-1)].y<limitesCeldasY2[a] ){
                            //si la moneda pertenece a la caja
                            if(ctndr_monedas[(i-1)].data.values.celda == a){
                                ctndr_monedas[(i-1)].x = 500;
                                ctndr_monedas[(i-1)].y = 150;
                            }
                            //si la caja está vacía
                            else if(F_celdas[a]==a){
                                ctndr_monedas[(i-1)].x = 500;
                                ctndr_monedas[(i-1)].y = 150;
                                if(ctndr_monedas[(i-1)].data.values.celda != a){   
                                    F_celdas[ctndr_monedas[(i-1)].data.values.celda] = a;
                                }
                                ctndr_monedas[(i-1)].data.values.celda = 0;
                                F_celdas[a] = 1;
                            }
                            //si no pertenece ni está vacía
                            else {
                                //si no pertenece a ninguna celda, borrar
                                if(ctndr_monedas[(i-1)].data.values.celda == undefined){
                                    this.deleteMoneda(i);
                                }
                                //si pertenece a otra celda, volver a la celda
                                else{
                                    ctndr_monedas[(i-1)].x = celdasX[ctndr_monedas[(i-1)].data.values.celda];
                                    ctndr_monedas[(i-1)].y = celdasY[ctndr_monedas[(i-1)].data.values.celda];
                                }
                            }   
                        }
                        
                    }
                }
                else{  
                    this.deleteMoneda(i);
                }
                
            }
        }
              
        /*
        var i;
        for(i=cant_monedas;i>0;i--){
            if (ctndr_monedas[(i-1)] != undefined && F_monedaAgarrada == 0){
                //si la moneda se suelta en la caja
                if (ctndr_monedas[(i-1)].x<575 && ctndr_monedas[(i-1)].x>425 && ctndr_monedas[(i-1)].y<225 && ctndr_monedas[(i-1)].y>75){
                    //si la moneda pertenece a la caja
                    if(ctndr_monedas[(i-1)].data.values.celda == 0){
                        ctndr_monedas[(i-1)].x = 500;
                        ctndr_monedas[(i-1)].y = 150;
                    }
                    //si la caja está vacía
                    else if(F_celdas[0]==0){
                        ctndr_monedas[(i-1)].x = 500;
                        ctndr_monedas[(i-1)].y = 150;
                        if(ctndr_monedas[(i-1)].data.values.celda != 0){   
                            F_celdas[ctndr_monedas[(i-1)].data.values.celda] = 0;
                        }
                        ctndr_monedas[(i-1)].data.values.celda = 0;
                        F_celdas[0] = 1;
                    }
                    //si no pertenece ni está vacía
                    else {
                        //si no pertenece a ninguna celda, borrar
                        if(ctndr_monedas[(i-1)].data.values.celda == undefined){
                            this.deleteMoneda(i);
                        }
                        //si pertenece a otra celda, volver a la celda
                        else{
                            ctndr_monedas[(i-1)].x = celdasX[ctndr_monedas[(i-1)].data.values.celda];
                            ctndr_monedas[(i-1)].y = celdasY[ctndr_monedas[(i-1)].data.values.celda];
                        }
                    }        
                }
                else if (ctndr_monedas[(i-1)].x<725 && ctndr_monedas[(i-1)].x>575 && ctndr_monedas[(i-1)].y<225 && ctndr_monedas[(i-1)].y>75){
                    if(ctndr_monedas[(i-1)].data.values.celda == 1){
                        ctndr_monedas[(i-1)].x = 650;
                        ctndr_monedas[(i-1)].y = 150;
                    }
                    else if(F_celdas[1]==0){
                        ctndr_monedas[(i-1)].x = 650;
                        ctndr_monedas[(i-1)].y = 150;
                        if(ctndr_monedas[(i-1)].data.values.celda != 1){   
                            F_celdas[ctndr_monedas[(i-1)].data.values.celda] = 0;
                        }
                        ctndr_monedas[(i-1)].data.values.celda = 1;
                        F_celdas[1] = 1;
                    }
                    else {
                        if(ctndr_monedas[(i-1)].data.values.celda == undefined){
                            this.deleteMoneda(i);
                        }
                        else{
                            ctndr_monedas[(i-1)].x = celdasX[ctndr_monedas[(i-1)].data.values.celda];
                            ctndr_monedas[(i-1)].y = celdasY[ctndr_monedas[(i-1)].data.values.celda];
                        }
                    } 
                }
                else if (ctndr_monedas[(i-1)].x<575 && ctndr_monedas[(i-1)].x>425 && ctndr_monedas[(i-1)].y<375 && ctndr_monedas[(i-1)].y>225){
                    if(ctndr_monedas[(i-1)].data.values.celda == 2){
                        ctndr_monedas[(i-1)].x = 500;
                        ctndr_monedas[(i-1)].y = 300;
                    }
                    else if(F_celdas[2]==0){
                        ctndr_monedas[(i-1)].x = 500;
                        ctndr_monedas[(i-1)].y = 300;
                        if(ctndr_monedas[(i-1)].data.values.celda != 2){   
                            F_celdas[ctndr_monedas[(i-1)].data.values.celda] = 0;
                        }
                        ctndr_monedas[(i-1)].data.values.celda = 2;
                        F_celdas[2] = 1;
                    }
                    else {
                        if(ctndr_monedas[(i-1)].data.values.celda == undefined){
                            this.deleteMoneda(i);
                        }
                        else{
                            ctndr_monedas[(i-1)].x = celdasX[ctndr_monedas[(i-1)].data.values.celda];
                            ctndr_monedas[(i-1)].y = celdasY[ctndr_monedas[(i-1)].data.values.celda];
                        }
                    } 
                }
                else if (ctndr_monedas[(i-1)].x<725 && ctndr_monedas[(i-1)].x>575 && ctndr_monedas[(i-1)].y<375 && ctndr_monedas[(i-1)].y>225){
                    if(ctndr_monedas[(i-1)].data.values.celda == 3){
                        ctndr_monedas[(i-1)].x = 650;
                        ctndr_monedas[(i-1)].y = 300;
                    }
                    else if(F_celdas[3]==0){
                        ctndr_monedas[(i-1)].x = 650;
                        ctndr_monedas[(i-1)].y = 300;
                        if(ctndr_monedas[(i-1)].data.values.celda != 3){   
                            F_celdas[ctndr_monedas[(i-1)].data.values.celda] = 0;
                        }
                        ctndr_monedas[(i-1)].data.values.celda = 3;
                        F_celdas[3] = 1;
                    }
                    else {
                        if(ctndr_monedas[(i-1)].data.values.celda == undefined){
                            this.deleteMoneda(i);
                        }
                        else{
                            ctndr_monedas[(i-1)].x = celdasX[ctndr_monedas[(i-1)].data.values.celda];
                            ctndr_monedas[(i-1)].y = celdasY[ctndr_monedas[(i-1)].data.values.celda];
                        }
                    } 
                }
                else if (ctndr_monedas[(i-1)].x<575 && ctndr_monedas[(i-1)].x>425 && ctndr_monedas[(i-1)].y<525 && ctndr_monedas[(i-1)].y>375){
                    if(ctndr_monedas[(i-1)].data.values.celda == 4){
                        ctndr_monedas[(i-1)].x = 500;
                        ctndr_monedas[(i-1)].y = 450;
                    }
                    else if(F_celdas[4]==0){
                        ctndr_monedas[(i-1)].x = 500;
                        ctndr_monedas[(i-1)].y = 450;
                        if(ctndr_monedas[(i-1)].data.values.celda != 4){   
                            F_celdas[ctndr_monedas[(i-1)].data.values.celda] = 0;
                        }
                        ctndr_monedas[(i-1)].data.values.celda = 4;
                        F_celdas[4] = 1;
                    }
                    else {
                        if(ctndr_monedas[(i-1)].data.values.celda == undefined){
                            this.deleteMoneda(i);
                        }
                        else{
                            ctndr_monedas[(i-1)].x = celdasX[ctndr_monedas[(i-1)].data.values.celda];
                            ctndr_monedas[(i-1)].y = celdasY[ctndr_monedas[(i-1)].data.values.celda];
                        }
                    } 
                }
                else if (ctndr_monedas[(i-1)].x<725 && ctndr_monedas[(i-1)].x>575 && ctndr_monedas[(i-1)].y<525 && ctndr_monedas[(i-1)].y>375){
                    if(ctndr_monedas[(i-1)].data.values.celda == 5){
                        ctndr_monedas[(i-1)].x = 650;
                        ctndr_monedas[(i-1)].y = 450;
                    }
                    else if(F_celdas[5]==0){
                        ctndr_monedas[(i-1)].x = 650;
                        ctndr_monedas[(i-1)].y = 450;
                        if(ctndr_monedas[(i-1)].data.values.celda != 5){   
                            F_celdas[ctndr_monedas[(i-1)].data.values.celda] = 0;
                        }
                        ctndr_monedas[(i-1)].data.values.celda = 5;
                        F_celdas[5] = 1;
                    }
                    else {
                        if(ctndr_monedas[(i-1)].data.values.celda == undefined){
                            this.deleteMoneda(i);
                        }
                        else{
                            ctndr_monedas[(i-1)].x = celdasX[ctndr_monedas[(i-1)].data.values.celda];
                            ctndr_monedas[(i-1)].y = celdasY[ctndr_monedas[(i-1)].data.values.celda];
                        }
                    } 
                }
                else{  
                    this.deleteMoneda(i);
                
                }
                
            }
        }*/
    }

    //Crea una moneda
    createMoneda(){
        
        this.newMoneda = new Moneda(this,this.input.mousePointer.x,this.input.mousePointer.y,'Sp_moneda');
        cant_monedas++;
        ctndr_monedas.push(this.newMoneda);
        console.log(cant_monedas); 
        this.newMoneda.setInteractive();
        this.newMoneda.setData({celda: undefined});
        this.input.on("pointermove", this.follow, this); //sigue al cursor
        this.input.on("pointerup", this.drop, this); //si se suelta, se vuelve draggeable
        this.input.on("drag", this.drag, this); //al draggear, la moneda está agarrada
        F_monedaAgarrada = 1;
        
        
        
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
        //this.input.off("pointerup", this.drop, this);
        //console.log(F_monedaAgarrada);
    }
    deleteMoneda(i){
        if(ctndr_monedas[(i-1)].data.values.celda != undefined){   
            F_celdas[ctndr_monedas[(i-1)].data.values.celda] = 0;
        }
        ctndr_monedas[(i-1)].data.values.celda = undefined;
        ctndr_monedas[(i-1)].x = 1200;
        ctndr_monedas.splice(i-1,1);
        cant_monedas--;
        //console.log(F_celdas);
    }
}


export default escena1;



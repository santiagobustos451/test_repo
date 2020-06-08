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
const celdasX = [500,650,500,650,500,650];//centros de cada celda
const celdasY = [150,150,300,300,450,450];
const limitesCeldasX1 = [425,575,425,575,425,575];//límites de cada celda
const limitesCeldasX2 = [575,725,575,725,575,725];
const limitesCeldasY1 = [75,75,225,225,375,375];
const limitesCeldasY2 = [225,225,375,375,525,525];
var F_celdas = [0,0,0,0,0,0];

class escena1 extends Phaser.Scene {
    constructor() {
        super({key: "escena1"});
    }
    
    //create
    create (){      
        //fondo
        var fondo = this.add.sprite(400,300,'Sp_fondo');

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
            console.log(F_celdas);
        }
        for(i=cant_monedas;i>0;i--){
            if (ctndr_monedas[(i-1)] != undefined && F_monedaAgarrada == 0){ 
                
                if (ctndr_monedas[(i-1)].x>limitesCeldasX1[0] && ctndr_monedas[(i-1)].x<limitesCeldasX2[0] && ctndr_monedas[(i-1)].y>limitesCeldasY1[0] && ctndr_monedas[(i-1)].y<limitesCeldasY2[0] ){
                    this.situarMoneda(i,0)
                }
                else if (ctndr_monedas[(i-1)].x>limitesCeldasX1[1] && ctndr_monedas[(i-1)].x<limitesCeldasX2[1] && ctndr_monedas[(i-1)].y>limitesCeldasY1[1] && ctndr_monedas[(i-1)].y<limitesCeldasY2[1] ){
                    this.situarMoneda(i,1)
                }
                else if (ctndr_monedas[(i-1)].x>limitesCeldasX1[2] && ctndr_monedas[(i-1)].x<limitesCeldasX2[2] && ctndr_monedas[(i-1)].y>limitesCeldasY1[2] && ctndr_monedas[(i-1)].y<limitesCeldasY2[2] ){
                    this.situarMoneda(i,2)
                }
                else if (ctndr_monedas[(i-1)].x>limitesCeldasX1[3] && ctndr_monedas[(i-1)].x<limitesCeldasX2[3] && ctndr_monedas[(i-1)].y>limitesCeldasY1[3] && ctndr_monedas[(i-1)].y<limitesCeldasY2[3] ){
                    this.situarMoneda(i,3)
                }
                else if (ctndr_monedas[(i-1)].x>limitesCeldasX1[4] && ctndr_monedas[(i-1)].x<limitesCeldasX2[4] && ctndr_monedas[(i-1)].y>limitesCeldasY1[4] && ctndr_monedas[(i-1)].y<limitesCeldasY2[4] ){
                    this.situarMoneda(i,4)
                }
                else if (ctndr_monedas[(i-1)].x>limitesCeldasX1[5] && ctndr_monedas[(i-1)].x<limitesCeldasX2[5] && ctndr_monedas[(i-1)].y>limitesCeldasY1[5] && ctndr_monedas[(i-1)].y<limitesCeldasY2[5] ){
                    this.situarMoneda(i,5)
                }
                else{  
                    this.deleteMoneda(i);
                }
            }
        }
        
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

    follow(pointer){      
        //console.log(F_monedaAgarrada);
        this.newMoneda.x = pointer.x;
        this.newMoneda.y = pointer.y;
    }
    drop(pointer){ 
        this.input.off("pointermove", this.follow, this);
        this.input.setDraggable(this.newMoneda);
        F_monedaAgarrada = 0;
    }
    drag(){   
        F_monedaAgarrada = 1;
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
    situarMoneda(i,a){
        //si pertenece a la celda
        if(ctndr_monedas[(i-1)].data.values.celda == a){//se sitúa en el centro de la celda
            ctndr_monedas[(i-1)].x = celdasX[a];
            ctndr_monedas[(i-1)].y = celdasY[a];
        }
        //si la celda está vacía
        else if(F_celdas[a]==0){//se sitúa en el centro de la celda
            ctndr_monedas[(i-1)].x = celdasX[a];
            ctndr_monedas[(i-1)].y = celdasY[a];
            if(ctndr_monedas[(i-1)].data.values.celda != a){   
                F_celdas[ctndr_monedas[(i-1)].data.values.celda] = 0;//se vacía la celda anterior
            }
            ctndr_monedas[(i-1)].data.values.celda = a;//moneda pertenece a celda actual
            F_celdas[a] = 1;//se llena celda actual
        }
        //si no pertenece ni está vacía
        else {
            if(ctndr_monedas[(i-1)].data.values.celda == undefined){//si no pertenece a otra celda, se elimina
                this.deleteMoneda(i);
            }
            else{//si pertenece a otra celda, se regresa a su celda
                ctndr_monedas[(i-1)].x = celdasX[ctndr_monedas[(i-1)].data.values.celda];
                ctndr_monedas[(i-1)].y = celdasY[ctndr_monedas[(i-1)].data.values.celda];
            }
        }       
    }
}


export default escena1;



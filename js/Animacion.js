// alert("Hola prueba")

var container = document.getElementById('Triqui');
 console.log(container);
var game;

container.addEventListener('click', onCellClick);
StarButton.addEventListener('click', star)

function onCellClick(event){
    var target = event.target;
    var dataset = target.dataset;
    // console.log(dataset)

    if(dataset && dataset.row){
        // console.log('pos', dataset.row , dataset.column);

        game.input(dataset.row , dataset.column);
        render(game.output());
    }

}

function triqui(){
    this.player = 'x';

    this.Matrix = [
        [null,null,null],
        [null,null,null],
        [null,null,null],

    ];
}

triqui.prototype.input = function(row, column){
 if(this.setValue(row, column)){
    this.ToggerPlayer();
 }
   
  


}
triqui.prototype.setValue= function(row, column){
 
     var matrix = this.Matrix;
     if( matrix[row][column] === null){
        matrix[row][column] = this.player;
        return true;

     }
     return false;

}
triqui.prototype.ToggerPlayer = function(){
    
    this.player = this.player === 'x' ? '0': 'x';


}


triqui.prototype.output = function(){
  
    return this.Matrix;

}

function star(){
// console.log('star')
 game = new triqui();
render(game.output());
}

function render(Matrix){
 var value =  Matrix.reduce(function(array , row , rowIndex){
      return array.concat(row.map(function(cell, cellIndex){
        
            return{
              
                value: cell,
                id: 'Cell-'+ rowIndex +'-'+ cellIndex


            };

        }));


    },[]);

    // console.log(value);

  value.forEach(function(cell){

   var callElement = document.getElementById(cell.id);
   callElement.innerHTML= cell.value != null ?  cell.value  : '';

      
  });


}

star();
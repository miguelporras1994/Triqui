// alert("Hola prueba")

var container = document.getElementById('Triqui');
var gameState = document.getElementById('status');

var game;

container.addEventListener('click', onCellClick);
StarButton.addEventListener('click', star)

function onCellClick(event){
    var target = event.target;
    var dataset = target.dataset;
    // console.log(dataset)

    if(dataset && dataset.row){
     // console.log('pos', dataset.row , dataset.column);

     var results = game.input(dataset.row , dataset.column);
     if (results) {
        if (results.game === 'won') {
          gameState.innerHTML = 'Jugador'+ " " + results.player + ' Gano ';
        }

        if (results.game === 'tie') {
          gameState.innerHTML = ' Quedaron Empatados';
        }
      }
        render(game.output());
    }

}

function triqui(){
    this.results = 'null';
    this.state = 'play' ;
    this.player = 'x';
    this.round = 0;

    this.Matrix = [
        [null,null,null],
        [null,null,null],
        [null,null,null],

    ];
}

triqui.prototype.input = function(row, column){

if(this.getState() ==='over'){
    return this.getResults();
}


 if(this.setValue(row, column)){
     if(this.checkGame(row, column)){
     
        this.setState('over');
        this.setResults({
            player: this.player,
            game: 'won'
          });
          return this.getResults();
     }
     else{
        this.ToggerPlayer();
        
     }

     this.round++;
     if (this.round === 9) {
       this.setState('over');
       this.setResults({
         game: 'tie'
       });
       return this.getResults();
     }
   }
   return this.getResults();    
};


triqui.prototype.setState = function(state){
     this.state = state;
};



triqui.prototype.getState = function(state){
   return  this.state; 
    };



triqui.prototype.setResults = function(results){
    return  this.results =  results; 
     };

 
triqui.prototype.getResults = function(){
    return  this.results; 
    };

triqui.prototype.checkGame = function(row, column){
    var matrix = this.Matrix
    var symbol = this.player;
    var  checks = [
    
   checkRom( matrix , row , symbol),
    checkcolum(matrix,column , symbol),
    checkDiagonal(matrix, symbol),
   checkAntiDiagonal(matrix, symbol),
    ]

    return checks.reduce(function (acc , check){
        return acc + check;
    }, false);

    // console.log('checkRom', checkRom( matrix , row , symbol));
    // console.log('checkcolum', checkcolum(matrix,column , symbol));
    // console.log('checkDiagonal',  checkDiagonal(matrix, symbol));
    // console.log('checkAntiDiagonal', checkAntiDiagonal(matrix, symbol));

    function checkRom( matrix , row , symbol){

        var row = matrix[row];
        var length = row.length;
        for(var i = 0; i < length ; i ++ ){
            var cell = row[i];
            if(cell != symbol){
                return false;
            }

        }
      
        return true;
    }

    function checkcolum(matrix,column , symbol){
        var  Cadena = matrix.length;

        for( var  i = 0 ; i < Cadena ;i++){
            var cell = matrix[i][column];
            if(cell != symbol){
                return false;
            }
        }
            return true;
    }

    function checkDiagonal(matrix, symbol){
        //0,0 ; 1,1 ; 2,3
         var cadena = matrix.length;
         for(var i = 0; i < cadena ; i ++ ){
             var cell = matrix[i][i]
             if(cell != symbol){
                 return false;
             }


         }
      return true;

     }

     function checkAntiDiagonal(matrix, symbol){
        //0,3 ; 1,1 ; 2,0
         var cadena = matrix.length;
         for(var i = 0, j = cadena -1 ;i  < cadena  ; i ++ ){
             var cell = matrix[i][j]
             if(cell != symbol){
                 return false;
             }

           j --
         }
      return true;

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
    
    this.player = this.player === 'x' ? 'o': 'x';


}


triqui.prototype.output = function(){
  
    return this.Matrix;

}

function star(){
// console.log('star')
 game = new triqui();
render(game.output());
gameState.innerHTML = 'Jugando';
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
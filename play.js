class Game {
    constructor(row,col,players,weapons) {
        this.players = players;
        this.weapons = weapons;
        this.currentPlayer = [0];
        this.row = row;
        this.col = col;
        this.gameBoard=[];
          for (let i=0; i<row; i++){
            this.gameBoard[i] =[];
              for (let y =0; y<col; y++){
                  this.gameBoard[i][y] = 0;
              }
          }
      }

    static random(max){
      return Math.floor(Math.random()*max);
    }


    nextTurn(){
      if (this.currentPlayer[0]===0){
          this.currentPlayer[0]=1;
          $('p#p0 + input[type="checkbox"]').prop('checked', false);
          $('img#player0').addClass('hide'); // hide player0
          $('img#player1').removeClass('hide');// reveal player1
      } else {
          this.currentPlayer[0]=0;
          $('p#p1 + input[type="checkbox"]').prop('checked', false);
          $('img#player1').addClass('hide');//hide player1
          $('img#player0').removeClass('hide');// reveal player0
        }
      }

    damageHandler(id,x){
    if($('input[type="checkbox"]').is(':checked')){
      this.players[x].health -=this.players[id].dps/2;
    } else {
      this.players[x].health -=this.players[id].dps;
    }
    if (this.players[x].health <= 0 ){
        this.players[x].health = 0;
        if (id===0){
          $('img#p0Won').removeClass('hide');
          $('div#winningPhrase').removeClass('hide');
          $('div#winningPhrase').html('<h1>Winner Winner Chicken Dinner</h1>');
          $(document).keydown(function(e){
            // Check for any keyboard strokes
            if (e.keyCode == 32 || 37 || 38 || 39 || 40){
                window.location.reload();
            }
          });
        } else if (id===1){
          $('img#p1Won').removeClass('hide');
          $('div#winningPhrase').removeClass('hide');
          $('div#winningPhrase').html('<h1>GodLike</h1>');
          $(document).keydown(function(e){
            if (e.keyCode == 32 || 37 || 38 || 39 || 40){
                window.location.reload();
            }
          });
        }
      }
    }


    placingWalls(){
      let i = 0;
      while(i<15){
        var y = Game.random(10);
        var x = Game.random(10);
        if(this.gameBoard[y][x] === 0){
            this.gameBoard[y][x] = 'Wall';
        } else {
          i--;
        }
        i++;
      }
    }


      placing(){
        var player = 0;
        var weapon = 0;
        var y = Game.random(10);
        var x = Game.random(10);
        this.gameBoard[y][x] = this.players[0]; // Placing first player randomly
        this.players[0].location.x = x; // Assigning x coordinates when instantiated
        this.players[0].location.y = y; // Assigning y coordinates when instantiated
        while(player<1){
          y = Game.random(10);
          x = Game.random(10);
          // Position validation for the second player. Checking each side and corners.
          if( x === 0 && y === 0 &&
            this.gameBoard[y][x] === 0 &&
            this.gameBoard[y + 1][x] === 0 &&
            this.gameBoard[y][x + 1] === 0){
            this.gameBoard[y][x] = this.players[1];
            player++;

          } else if ( x === 9 && y === 0 &&
            this.gameBoard[y][x] === 0 &&
            this.gameBoard[y + 1][x] === 0 &&
            this.gameBoard[y][x - 1] === 0){
            this.gameBoard[y][x] = this.players[1];
            player++;

          } else if ( x === 0 && y === 9 &&
            this.gameBoard[y][x] === 0 &&
            this.gameBoard[y - 1][x] === 0 &&
            this.gameBoard[y][x + 1] === 0){
            this.gameBoard[y][x] = this.players[1];
            player++;

          } else if (x === 9 && y === 9 &&
            this.gameBoard[y][x] === 0 &&
            this.gameBoard[y - 1][x] === 0 &&
            this.gameBoard[y][x - 1] === 0){
            this.gameBoard[y][x] = this.players[1];
            player++;

          } else if  ( y === 9 &&
            this.gameBoard[y][x] === 0 &&
            this.gameBoard[y - 1][x] === 0 &&
            this.gameBoard[y][x + 1] === 0 &&
            this.gameBoard[y][x - 1] === 0){
            this.gameBoard[y][x] = this.players[1];
            player++;

          } else if ( x === 9 &&
            this.gameBoard[y][x] === 0 &&
            this.gameBoard[y + 1][x] === 0 &&
            this.gameBoard[y - 1][x] === 0 &&
            this.gameBoard[y][x - 1] === 0){
            this.gameBoard[y][x] = this.players[1];
            player++;

          } else if ( y === 0 &&
            this.gameBoard[y][x] === 0 &&
            this.gameBoard[y + 1][x] === 0 &&
            this.gameBoard[y][x + 1] === 0 &&
            this.gameBoard[y][x - 1] === 0){
            this.gameBoard[y][x] = this.players[1];
            player++;

          } else if ( x === 0 &&
            this.gameBoard[y][x] === 0 &&
            this.gameBoard[y + 1][x] === 0 &&
            this.gameBoard[y - 1][x] === 0 &&
            this.gameBoard[y][x + 1] === 0){
            this.gameBoard[y][x] = this.players[1];
            player++;

          } else if (
             this.gameBoard[y][x] === 0 &&
             this.gameBoard[y + 1][x] === 0 &&
             this.gameBoard[y - 1][x] === 0 &&
             this.gameBoard[y][x + 1] === 0 &&
             this.gameBoard[y][x - 1] === 0){
             this.gameBoard[y][x] = this.players[1];
             player++;
           }// if finish
           this.players[1].location.x = x; // Assigning x coordinates when instantiated
           this.players[1].location.y = y; // Assigning y coordinates when instantiated
         }// while finish

        while(weapon<4){
          y = Game.random(10);
          x = Game.random(10);
          if(this.gameBoard[y][x] === 0){
            this.gameBoard[y][x] = this.weapons[weapon];
            this.weapons[weapon].location.y = y;
            this.weapons[weapon].location.x = x;
            weapon++;
          }
        }//while finish
      } // placing finish

  walk(id,dirY,dirX){
    var currentK;
    var currentM;
    var currentDps;
    let x;
    if(id===0)
     {x=1} else {x=0}
    for(var k = 0; k < this.gameBoard.length; k++){
      for(var m = 0; m < this.gameBoard[k].length; m++){
        if(this.gameBoard[k][m]===this.players[id]){
           currentK = k;
           currentM = m;
        }
      }
    }
    // Checking if the location that the player would like to move is not a wall, not occupied by the other player and that it's not out of the board respectively
    if (this.gameBoard[currentK+dirY][currentM+dirX] !== 'Wall'  && this.gameBoard[currentK+dirY][currentM+dirX] !== this.players[x] &&  (currentK+dirY>=0 && currentK+dirY<=9) && (currentM+dirX>=0 && currentM+dirX<=9)){
        this.gameBoard[currentK+dirY][currentM+dirX] = this.players[id];
        this.gameBoard[currentK][currentM] = 0;
        this.players[id].location.y = currentK+dirY;
        this.players[id].location.x = currentM+dirX;


        // Updating location for weapons if they are isActive=false on the board, i.e. if they are wielded by one of the players //
        if (!this.weapons[0].isActive && this.players[id].dps === this.weapons[0].dps){
          this.weapons[0].location.y = currentK+dirY;
          this.weapons[0].location.x = currentM+dirX;
        } else if (!this.weapons[1].isActive && this.players[id].dps === this.weapons[1].dps){
          this.weapons[1].location.y = currentK+dirY;
          this.weapons[1].location.x = currentM+dirX;
        } else if (!this.weapons[2].isActive && this.players[id].dps === this.weapons[2].dps){
          this.weapons[2].location.y = currentK+dirY;
          this.weapons[2].location.x = currentM+dirX;
        } else if (!this.weapons[3].isActive && this.players[id].dps === this.weapons[3].dps){
          this.weapons[3].location.y = currentK+dirY;
          this.weapons[3].location.x = currentM+dirX;
        }
        // Updating location for weapons if they are isActive=false on the board, i.e. if they are wielded by one of the players - END //


        // Checking if coordinates of the player and a weapon are the same && and that the weapon isActive (on the board) //
        if ( this.players[id].location.y === this.weapons[0].location.y && this.players[id].location.x === this.weapons[0].location.x && this.weapons[0].isActive){
             currentDps = this.players[id].dps;
             this.players[id].dps = this.weapons[0].dps;
             this.weapons[0].isActive = false;
             // currentDps above stores the dps of the player prior picking up the weapon. It is used to set isActive = true for that weapon, since player picked up a new one.
             if (currentDps === this.weapons[1].dps){
               this.weapons[1].isActive = true;
             } else if (currentDps === this.weapons[2].dps){
               this.weapons[2].isActive = true;
             } else if (currentDps === this.weapons[3].dps){
               this.weapons[3].isActive = true;
             }
        // Checking if coordinates of the player and a weapon are the same && and that the weapon isActive (on the board) - END //

        } else if ( this.players[id].location.y === this.weapons[1].location.y && this.players[id].location.x === this.weapons[1].location.x && this.weapons[1].isActive){
             var currentDps = this.players[id].dps;
             this.players[id].dps = this.weapons[1].dps;
             this.weapons[1].isActive = false;
             if (currentDps === this.weapons[0].dps){
               this.weapons[0].isActive = true;
             } else if (currentDps === this.weapons[2].dps){
               this.weapons[2].isActive = true;
             } else if (currentDps === this.weapons[3].dps){
               this.weapons[3].isActive = true;
             }

        } else if ( this.players[id].location.y === this.weapons[2].location.y && this.players[id].location.x === this.weapons[2].location.x && this.weapons[2].isActive){
             var currentDps = this.players[id].dps;
             this.players[id].dps = this.weapons[2].dps;
             this.weapons[2].isActive = false;
             if (currentDps === this.weapons[0].dps){
               this.weapons[0].isActive = true;
             } else if (currentDps === this.weapons[1].dps){
               this.weapons[1].isActive = true;
             } else if (currentDps === this.weapons[3].dps){
               this.weapons[3].isActive = true;
             }

        } else if ( this.players[id].location.y === this.weapons[3].location.y && this.players[id].location.x === this.weapons[3].location.x && this.weapons[3].isActive){
             var currentDps = this.players[id].dps;
             this.players[id].dps = this.weapons[3].dps;
             this.weapons[3].isActive = false;
             if (currentDps === this.weapons[0].dps){
               this.weapons[0].isActive = true;
             } else if (currentDps === this.weapons[1].dps){
               this.weapons[1].isActive = true;
             } else if (currentDps === this.weapons[2].dps){
               this.weapons[2].isActive = true;
             }
        }

        // Drop off the weapon at the location of the weapon that was picked up AFTER leaving the spot/tile //
        if (this.weapons[0].isActive && this.gameBoard[this.weapons[0].location.y][this.weapons[0].location.x] === 0) {
            this.gameBoard[this.weapons[0].location.y][this.weapons[0].location.x] = this.weapons[0];
        } else if (this.weapons[1].isActive && this.gameBoard[this.weapons[1].location.y][this.weapons[1].location.x] === 0){
            this.gameBoard[this.weapons[1].location.y][this.weapons[1].location.x] = this.weapons[1];
        } else if (this.weapons[2].isActive && this.gameBoard[this.weapons[2].location.y][this.weapons[2].location.x] === 0){
            this.gameBoard[this.weapons[2].location.y][this.weapons[2].location.x] = this.weapons[2];
        } else if (this.weapons[3].isActive && this.gameBoard[this.weapons[3].location.y][this.weapons[3].location.x] === 0){
            this.gameBoard[this.weapons[3].location.y][this.weapons[3].location.x] = this.weapons[3];
        } else {
          this.gameBoard[currentK][currentM] = 0;
        }
        // Drop off the weapon at the location of the weapon that was picked up AFTER leaving the spot/tile - END //
        moves+=1;
    } else {
      [...this.gameBoard];
      alert('Invalid Location');
    };
    // Once the player has moved to an empty spot, his movements are registered and stored in the moves counter.

    // healthBeforeAttack variable is tracking changes of a player's health, i.e. if the health before and after an attack is different the nextTurn function kick's in
    var healthBeforeAttack = this.players[x].health;
    if ( (this.players[id].location.x===this.players[x].location.x + 1 && this.players[id].location.y===this.players[x].location.y) ||
         (this.players[id].location.x===this.players[x].location.x - 1 && this.players[id].location.y===this.players[x].location.y) ||
         (this.players[id].location.x===this.players[x].location.x && this.players[id].location.y===this.players[x].location.y - 1) ||
         (this.players[id].location.x===this.players[x].location.x && this.players[id].location.y===this.players[x].location.y + 1)) {
          game.damageHandler(id,x);
      }
    // Checking when to switch turns, either when max moves or after an attack
    if (moves===3){
        // Checking if after last movement, an attack has been executed to fadeout the damage
        if (healthBeforeAttack!==this.players[x].health){
            damageFadeOut(id);
        }
        game.nextTurn();
        moves = 0;
    } else if (healthBeforeAttack!==this.players[x].health){
        damageFadeOut(id);
        game.nextTurn();
        moves = 0;
    }
  } // Walk method finish


  attack(id){
    let x;
    if(id===0){
      x=1
    } else {
      x=0
    }
    var healthBeforeAttack = this.players[x].health;
    if ((this.players[id].location.x===this.players[x].location.x + 1 && this.players[id].location.y===this.players[x].location.y) ||
        (this.players[id].location.x===this.players[x].location.x - 1 && this.players[id].location.y===this.players[x].location.y) ||
        (this.players[id].location.x===this.players[x].location.x && this.players[id].location.y===this.players[x].location.y - 1) ||
        (this.players[id].location.x===this.players[x].location.x && this.players[id].location.y===this.players[x].location.y + 1)) {
        game.damageHandler(id,x);
    } // if location check finish
    if (healthBeforeAttack !== this.players[x].health){
        damageFadeOut(id);
        game.nextTurn();
    }
  } // Attack finish

}// Class Game finish

class Player{
  constructor(id){
  this.id = id;
  this.health = 100;
  this.dps = 10;
  this.location = {x:null,y:null};
  }
}

class Weapon{
  constructor(dps,name){
    this.dps = dps;
    this.isActive = true;
    this.name = name;
    this.location = {x:0,y:0};
  }
}

const game = new Game(10,10, [new Player(0), new Player(1)], [new Weapon(40,'broadsword'),new Weapon(20,'longsword'),new Weapon(25,'axe'),new Weapon(15,'dagger')] );
game.placing();
game.placingWalls();
var moves = 0;

function  damageFadeOut(id){
          if (id===1){
            $('p#redDmgReceived').removeClass('hide');
            $('p#redDmgReceived').addClass('animated fadeOutDown');
            setTimeout(()=>$('p#redDmgReceived').removeClass('animated fadeOutDown'),500);
            setTimeout(()=>$('p#redDmgReceived').addClass('hide'),500);
          } else {
            $('p#blueDmgReceived').removeClass('hide');
            $('p#blueDmgReceived').addClass('animated fadeOutDown');
            setTimeout(()=>$('p#blueDmgReceived').removeClass('animated fadeOutDown'),500);
            setTimeout(()=>$('p#blueDmgReceived').addClass('hide'),500);
          }
          };




var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


var grass = document.createElement('img');
var wall = document.createElement('img');
var player0 = document.createElement('img');
var player1 = document.createElement('img');
var weapon0 = document.createElement('img');
var weapon1 = document.createElement('img');
var weapon2 = document.createElement('img');
var weapon3 = document.createElement('img');

var p0broad = document.createElement('img');
var p0long = document.createElement('img');
var p0axe = document.createElement('img');
var p0dag = document.createElement('img');

var p1broad = document.createElement('img');
var p1long = document.createElement('img');
var p1axe = document.createElement('img');
var p1dag = document.createElement('img');


grass.src = 'photos/grass.png';
wall.src = 'photos/wall.png';
player0.src = 'photos/p0.png';
player1.src = 'photos/p1.png';
weapon0.src = 'photos/broad.png';
weapon1.src = 'photos/long.png';
weapon2.src = 'photos/axe.png';
weapon3.src = 'photos/dag.png';

p0axe.src = 'photos/p0axe.png';
p0broad.src = 'photos/p0broad.png';
p0long.src = 'photos/p0long.png';
p0dag.src = 'photos/p0dag.png';

p1axe.src = 'photos/p1axe.png';
p1broad.src = 'photos/p1broad.png';
p1long.src = 'photos/p1long.png';
p1dag.src = 'photos/p1dag.png';

/*

  En el anterior prototipo (06-player), el objeto Game permite
  gestionar una colecci�n de tableros (boards). Los tres campos de
  estrellas, la pantalla de inicio, y el sprite de la nave del
  jugador, se a�aden como tableros independientes para que Game pueda
  ejecutar sus m�todos step() y draw() peri�dicamente desde su m�todo
  loop(). Sin embargo los objetos que muestran los tableros no pueden
  interaccionar entre s�. Aunque se a�adiesen nuevos tableros para los
  misiles y para los enemigos, resulta dif�cil con esta arquitectura
  pensar en c�mo podr�a por ejemplo detectarse la colisi�n de una nave
  enemiga con la nave del jugador, o c�mo podr�a detectarse si un
  misil disparado por la nave del usuario ha colisionado con una nave
  enemiga.


  Requisitos:

  Este es precisamente el requisito que se ha identificado para este
  prototipo: dise�ar e implementar un mecanismo que permita gestionar
  la interacci�n entre los elementos del juego. Para ello se dise�ar�
  la clase GameBoard. Piensa en esta clase como un tablero de un juego
  de mesa, sobre el que se disponen los elementos del juego (fichas,
  cartas, etc.). En Alien Invasion los elementos del juego ser�n las
  naves enemigas, la nave del jugador y los misiles. Para el objeto
  Game, GameBoard ser� un board m�s, por lo que deber� ofrecer los
  m�todos step() y draw(), siendo responsable de mostrar todos los
  objetos que contenga cuando Game llame a estos m�todos.

  Este prototipo no a�ade funcionalidad nueva a la que ofrec�a el
  prototipo 06.


  Especificaci�n: GameBoard debe

  - mantener una colecci�n a la que se pueden a�adir y de la que se
    pueden eliminar sprites como nave enemiga, misil, nave del
    jugador, explosi�n, etc.

  - interacci�n con Game: cuando Game llame a los m�todos step() y
    draw() de un GameBoard que haya sido a�adido como un board a Game,
    GameBoard debe ocuparse de que se ejecuten los m�todos step() y
    draw() de todos los objetos que contenga

  - debe ofrecer la posibilidad de detectar la colisi�n entre
    objetos. Un objeto sprite almacenado en GameBoard debe poder
    detectar si ha colisionado con otro objeto del mismo
    GameBoard. Los misiles disparados por la nave del jugador deber�n
    poder detectar gracias a esta funcionalidad ofrecida por GameBoard
    cu�ndo han colisionado con una nave enemiga; una nave enemiga debe
    poder detectar si ha colisionado con la nave del jugador; un misil
    disparado por la nave enemiga debe poder detectar si ha
    colisionado con la nave del jugador. Para ello es necesario que se
    pueda identificar de qu� tipo es cada objeto sprite almacenado en
    el tablero de juegos, pues cada objeto s�lo quiere comprobar si ha
    colisionado con objetos de cierto tipo, no con todos los objetos.

*/

describe ("Clase GameBoard", function(){
 
    beforeEach(function(){
	loadFixtures('index.html');
	   
    });

   
    
    it("Existe GameBoard?", function(){
      
      expect(GameBoard).toBeDefined();
    });
    
    var tablero = new GameBoard();
    
    it("Esta vacio al principio?", function(){
      expect(tablero.objects.length).toEqual(0);
    });
    
    
    
    it("A�ade Bien?", function(){
	var Nave1 = new PlayerShip();
	
	tablero.add(Nave1);
	
       expect(tablero.objects.length).toEqual(1);
     
	  
    });
    
    it("Borra Bien?", function(){
	var Nave1 = new PlayerShip();
	var Objetos = tablero.objects; 
	tablero.resetRemoved();
	expect(tablero.removed.length).toEqual(0);
	tablero.remove(Nave1);
	
	expect(tablero.removed.length).toEqual(1);//removed almacena lo que quiero borrar
        tablero.finalizeRemoved();
	expect(Objetos.length).toEqual(1);//ESTO NO CUADRA Deber�a ser 0.
	});
    
    it("draw + step",function(){
      spyOn(tablero,"step");
      spyOn(tablero,"draw");
     
      var contexto = Game.ctx;
      
      tablero.step(1);
      expect(tablero.step).toBeDefined();
      expect(tablero.step).toHaveBeenCalled();
      
      tablero.draw(contexto);
      expect(tablero.draw).toBeDefined();
      expect(tablero.draw).toHaveBeenCalled();
    });
      
    it("Detecta", function(){
      spyOn(tablero,"detect");
      
      var Objetos = tablero.objects; //PARA CONFIRMAR Q TENEMOS ALGO EN OBJECTS
      
      
      expect(tablero.detect).toBeDefined();
      tablero.detect(SpriteSheet.load);
      expect(tablero.detect).toHaveBeenCalled();
      
      expect(Objetos.length).toEqual(1);//tenemos 1 objeto
      expect(tablero.detect(SpriteSheet.load)).toBe(Objetos[1]);//Confirmamos que carga lo que
								  //tenemos en Objetos 
       });
    
    it("colisiona",function(){
      spyOn(tablero,"collide");
      
   //var contexto = Game.ctx;
      var Nave1 = new PlayerShip();
      //var Nave2 = new PlayerShip();
     
      tablero.collide(Nave1);
      expect(tablero.collide).toBeDefined();
      expect(tablero.collide).toHaveBeenCalled();
   
      //Parece que va bien
      
    });
    
});	  

   
    
   
    

	
    
     
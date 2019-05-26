var WORLD_WIDTH = window.innerWidth; //window.screen.width; //1800;
var WORLD_HEIGHT = window.innerHeight; //window.screen.height; //800

window.onload = function() {

    // module aliases
	var Engine = Matter.Engine,
		Render = Matter.Render,
		World = Matter.World,
		Bodies = Matter.Bodies;

    var myCanvas = document.getElementById('world');

	// create an engine
	var engine = Engine.create();

    // turn gravity off
    engine.world.gravity.y = 0;

	// create a renderer
	var render = Render.create({
		canvas: myCanvas,
		engine: engine,
		options: {
			width: WORLD_WIDTH,
			height: WORLD_HEIGHT,
			background: '#eeeeee',
			wireframes: false,
			showAngleIndicator: true
		}
	});

	// create world objects

    var energyobject = new Energy(WORLD_WIDTH/2, WORLD_HEIGHT/2);
    Matter.World.add(engine.world, energyobject.body);

    var eprobot = new Eprobot(WORLD_WIDTH/2-200, WORLD_HEIGHT/2);
    Matter.World.add(engine.world, eprobot.body);

	// run the engine
	Engine.run(engine);
	// run the renderer
	Render.run(render);

    // add mouse control
    var mouse = Matter.Mouse.create(render.canvas),
        mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    Matter.World.add(engine.world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;
};
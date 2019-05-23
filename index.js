var WORLD_WIDTH = window.innerWidth; //window.screen.width; //1800;
var WORLD_HEIGHT = window.innerHeight; //window.screen.height; //800

window.onload = function() {

    Matter.use(
        'matter-wrap',
        'matter-attractors'
    );

    let plugin_opts1 = {
        /*wrap: {
            min: {
                x: 0,
                y: 0
            },
            max: {
                x: WORLD_WIDTH,
                y: WORLD_HEIGHT
            }
        },*/
        attractors: [
            // there is a built in helper function for Newtonian gravity!
            // you can find out how it works in index.js
            //MatterAttractors.Attractors.gravity
            function(bodyA, bodyB) {
                return {
                    x: (bodyA.position.x - bodyB.position.x) * 1e-6,
                    y: (bodyA.position.y - bodyB.position.y) * 1e-6,
                };
            }
        ],
    }

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
			//showAngleIndicator: true
		}
	});

	// create two boxes and a ground
	var boxA = Bodies.circle(WORLD_WIDTH/2, WORLD_HEIGHT/2, 30, {
        //density: 0.04, //default 0.001
        //friction: 0.01, //default 0.1
        frictionAir: 0, //default 0.01
        //restitution: 0.8, //default 0
        plugin: plugin_opts1
    });


	// add all of the bodies to the world
	World.add(engine.world, boxA);

    for (let i=0;i<10;i++){
        let boxB = Bodies.circle(Matter.Common.random(0,WORLD_WIDTH), Matter.Common.random(0,WORLD_HEIGHT), 15, {frictionAir: 0});
        World.add(engine.world, boxB);
    }

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
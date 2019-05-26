class Eprobot {

    constructor(x_pos, y_pos) {
        let options_body = {
            isStatic: false,
            frictionAir: 0,
            render: {
                fillStyle: '#ff0000',
            }
        }

        let options_sensor = {
            //density: 0.04, //default 0.001
            friction: 0, //default 0.1
            frictionAir: 0, //default 0.01
            //restitution: 0.8, //default 0
            render: {
                fillStyle: '#1400f5',
                //strokeStyle: 'black',
                //lineWidth: 1
                visible: true
            },
            chamfer: { radius: [0, 0, 90, 0] }
        }

        // -------------
        let eprobots_radius = 50;
        let eprobot_body = Matter.Bodies.circle(x_pos, y_pos, eprobots_radius, options_body);
        eprobot_body.my_label = "Eprobot";
        eprobot_body.my_parent = this;

        let eprobot_sensor = Matter.Bodies.rectangle(x_pos+eprobots_radius, y_pos, eprobots_radius*2, eprobots_radius*2, options_sensor);
        Matter.Body.rotate(eprobot_sensor, -Math.PI/4);
        eprobot_sensor.isSensor = true;
        eprobot_sensor.my_label = "Eprobot Sensor";
        eprobot_sensor.my_parent = this;

        let eprobot_compound = Matter.Body.create({
            parts: [eprobot_body, eprobot_sensor]
        });

        //Matter.Body.scale(eprobot_compound, 0.5, 0.5);
        this.body = eprobot_compound;
        // -------------

    }
}
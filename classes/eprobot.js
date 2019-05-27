class Eprobot {

    constructor(x_pos, y_pos) {
        this.body = Matter.Bodies.circle(x_pos, y_pos, 50, {
            isStatic: false,
            render: {
                fillStyle: '#940000',
            }
        });

        this.body.my_label = "Eprobot";
        this.body.my_parent = this;
    }
}
class Energy {

    constructor(x_pos, y_pos) {
        this.body = Matter.Bodies.circle(x_pos, y_pos, 50, {
            isStatic: true,
            render: {
                fillStyle: '#0bcb11',
            }
        });

        this.body.my_label = "Energy";
        this.body.my_parent = this;
    }
}
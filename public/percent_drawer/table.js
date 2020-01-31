// coderistan - 2019
var Table = function (canvas_id, scale) {
    var object = new Object();

    object.main = function (canvas_id) {
        this.canvas = document.getElementById(canvas_id);
        this.pencil = this.canvas.getContext("2d");
        this.right_blank = 20;
        this.bottom_blank = 20;
        if (scale != undefined) {
            this.scale = scale;
        } else {
            this.scale = 10;
        }
        this.draw_line();
        this.draw_y();
    }

    object.draw_line = function () {
        this.pencil.beginPath();
        this.pencil.moveTo(this.right_blank, 0);
        this.pencil.strokeStyle = "black";
        this.pencil.lineTo(this.right_blank, this.canvas.height - this.bottom_blank);
        this.pencil.stroke();
    }

    object.test = function () {
        console.log(this.right_blank);
        console.log(this.bottom_blank);
    }

    object.draw_points = function (y_array) {
        // X elemanlarının çizimi
        this.pencil.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.draw_line();
        this.draw_y();

        this.before_y = this.canvas.height - this.bottom_blank;
        this.before_x = this.right_blank;
        if (length == undefined) {
            for (let i = 0; i < this.scale; i++) {
                this.pencil.fillText("" + (i + 1), ((this.canvas.width - this.right_blank) / this.scale) * i + this.right_blank, this.canvas.height);
            }
        } else {
            for (let i = 0; i < this.scale; i++) {
                x = this.right_blank + (this.canvas.width - this.right_blank) / this.scale * i;
                y = this.canvas.height - 20 + this.bottom_blank
                this.draw_p(x, y_array[i], this.scale);
                this.before_x = x;
            }
        }

    }

    object.draw_p = function (x, y, length) {
        // burada belirtilen indexlere nokta çizim işlemi yapılacaktır
        this.pencil.fillStyle = "rgb(250,0,100)";
        y = (this.canvas.height - this.bottom_blank) - (this.canvas.height - this.bottom_blank * 2) * y / 100;

        this.pencil.beginPath();
        this.pencil.moveTo(this.before_x, this.before_y);
        this.pencil.lineTo(x, y);
        this.pencil.stroke();
        this.pencil.beginPath()
        this.pencil.arc(x, y, 2, 0, 360, Math.PI * 2);
        this.pencil.fill();
        this.pencil.fillStyle = "black";

        this.before_y = y;
    }

    object.draw_y = function () {
        this.pencil.moveTo(10, this.canvas.height - 10);
        // Y elemanlarının çizimi
        this.pencil.fillStyle = "rgb(0,138,255)";
        for (let i = 0; i < 10; i++) {
            this.pencil.fillText("" + (10 - i) * 10, 0, ((this.canvas.height - this.bottom_blank) / 10) * i + this.bottom_blank - 10);
        }
        this.pencil.fillStyle = "black";
    }
    object.main(canvas_id, scale);

    return object;
}
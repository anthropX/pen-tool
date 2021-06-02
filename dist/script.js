const app = Vue.createApp({
  data() {
    return {
      canvasWidth: 0,
      canvasHeight: 0,
      ctx: null,
      isErasing: false,
      justStarted: true,
      hue: (Math.random()*360),
      previousX: -1,
      previousY: -1,
    }
  },
  computed: {

  },
  mounted() {
    const self = this;
    const canvas = self.$refs.myCanvas;
    self.canvasWidth = canvas.width = window.innerWidth;
    self.canvasHeight = canvas.height = window.innerHeight;
    if (canvas.getContext) {
      self.ctx  = canvas.getContext('2d');
      self.paintBg();
      self.startDrawing();
    }
  },
  methods: {
    paintBg() {
      this.ctx.fillStyle = 'hsl(0, 0%, 0%)';
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    },
    startDrawing() {
      const self = this;
      self.ctx.beginPath();
      document.addEventListener('keyup', function(event) {
        if (event.keyCode === 16 || event.keyCode === 17) {
          self.ctx.closePath();
          self.ctx.beginPath();
          self.previousX = -1;
          self.previousY = -1;
        }
      });
      document.addEventListener('mousemove', function(event) {  
        if (event.ctrlKey === true && event.shiftKey === false) {
          self.ctx.strokeStyle = 'hsl(0, 0%, 0%)';
          self.ctx.lineWidth = 200;
          self.ctx.lineTo(event.clientX, event.clientY);
          self.ctx.stroke();
        } else if (event.shiftKey === true) {
          self.ctx.strokeStyle = `hsl(${self.hue}, 100%, 50%)`;
          self.ctx.lineWidth = 50;
          self.hue = self.hue + 0.5;
          var startFresh = false;
          if (self.previousX === -1) {
            startFresh = true;
          }
          self.ctx.moveTo(startFresh ? event.clientX : self.previousX , startFresh ? event.clientY : self.previousY);
          self.ctx.lineTo(event.clientX, event.clientY);
          self.ctx.stroke();
          self.ctx.closePath();
          self.ctx.beginPath();
          self.previousX = event.clientX;
          self.previousY = event.clientY;
        }
      });
    },
    paintRects() {
      // 1.
      this.ctx.fillStyle = 'hsl(0, 0%, 100%)';
      this.ctx.fillRect(100, 100, 200, 150);
      // 2.
      this.ctx.strokeStyle = 'hsl(30, 50%, 50%)';
      this.ctx.strokeRect(125, 125, 75, 75);
      // 3.
      this.ctx.clearRect(150, 150, 150, 100);
    },
    drawPaths() {
      this.drawPath();
      this.drawTriangle();
      this.drawSmiley();
    },
    drawPath() {
      this.ctx.strokeStyle = 'hsl(0, 0%, 100%)';
      this.ctx.lineWidth = 5;
      this.ctx.beginPath();
      this.ctx.moveTo(this.canvasWidth/2, this.canvasHeight/2);
      this.ctx.lineTo(10, 10);
      this.ctx.lineTo(10, this.canvasHeight - 10);
      
      this.ctx.stroke();
    },
    drawTriangle() {
      this.ctx.beginPath();
      this.ctx.moveTo(this.canvasWidth/2, this.canvasHeight/2);
      this.ctx.lineTo(this.canvasWidth, 0);
      this.ctx.lineTo(this.canvasWidth, this.canvasHeight);
      this.ctx.strokeStyle = 'hsl(90, 100%, 50%)';
      this.ctx.closePath();
      this.ctx.stroke();
    },
    drawSmiley() {
      this.ctx.strokeStyle = 'hsl(180, 100%, 50%)';
      // Face
      this.ctx.beginPath();
      this.ctx.arc(this.canvasWidth/2, this.canvasHeight/2 + 200, 175, 0, Math.PI * 2);
      this.ctx.stroke();
      // Mouth
      this.ctx.beginPath();
      this.ctx.arc(this.canvasWidth/2, this.canvasHeight/2 + 200, 120, 20*Math.PI/180, 150*Math.PI/180, false);
      this.ctx.stroke();
      // Left eye
      this.ctx.beginPath();
      this.ctx.arc(this.canvasWidth/2 - 80, this.canvasHeight/2 + 165, 20, 0, Math.PI * 2);
      this.ctx.stroke();
      // Right eye
      this.ctx.beginPath();
      this.ctx.arc(this.canvasWidth/2 + 80, this.canvasHeight/2 + 165, 15, 0, Math.PI * 2);
      this.ctx.stroke();
    }
  }
});

app.mount('.app');
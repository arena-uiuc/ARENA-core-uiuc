AFRAME.registerComponent('sprite', {
  schema: {
    on: {
      default: ''
    },
    follow: {
      default: ''
    }
  },
  multiple: true,
  init: function() {
    this.tick();
  },
  update: function() {
    let data = this.data;
    const el = this.el;

    if (data.on) {
      el.addEventListener(data.on, function(evt) {
        console.log("Sprite clicked");
        data.follow = ARENA.camName;
      })
    }
  },
  tick: function() {
    let data = this.data;
    if (data.follow === ARENA.camName) {
      const thisPos = this.getAttribute('position');
      const camera = document.querySelecter('#my-camera');
      const cameraPos = camera.getAttribute('position');
      const deltaPos = cameraPos - thisPos;

      const msg = {
        object_id: this.el.id,
        action: "update",
        type: "object",
        data: {
          rotation: {
            x: Math.atan2(deltaPos.z, deltaPos.x) / (2 * Math.PI) * 360,
            y: Math.atan2(deltaPos.z, deltaPos.y) / (2 * Math.PI) * 360,
            z: Math.atan2(Math.sqrt(deltaPos.x * deltaPos.x + deltaPos.y * deltaPos.y), deltaPos.z) / (2 * Math.Pi) * 360
          }
        }
      }
      console.log("Try publishing. OutputTopic: ${ARENA.outputTopic}");
      // TODO add publish
    }
    setInterval(tick, 100);
  }
})
AFRAME.registerComponent('sprite', {
  schema: {
    on: {
      default: ''
    },
    follow: {
      default: ''
    },
    type: {
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
    let self = this;
    if (self.data.follow === ARENA.camName) {
      const thisPos = self.getAttribute('position');
      const camera = document.querySelecter('#my-camera');
      const cameraPos = camera.getAttribute('position');
      const deltaPos = cameraPos - thisPos;

      const msg = {
        object_id: self.el.id,
        action: "update",
        type: "object",
        data: {
          object_type: data.type,
          rotation: {
            x: Math.atan2(deltaPos.z, deltaPos.x) / (2 * Math.PI) * 360,
            y: Math.atan2(deltaPos.z, deltaPos.y) / (2 * Math.PI) * 360,
            z: Math.atan2(Math.sqrt(deltaPos.x * deltaPos.x + deltaPos.y * deltaPos.y), deltaPos.z) / (2 * Math.Pi) * 360
          }
        }
      }
      console.log(`Try publishing. OutputTopic: ${ARENA.outputTopic}`);
      ARENA.Mqtt.publish(`${ARENA.outputTopic}${self.el.id}`, msg)
    }
    setInterval(tick, 100);
  }
})
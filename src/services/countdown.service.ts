export default class CountDownService {
  private scene: Phaser.Scene;
  private label: Phaser.GameObjects.Text;
  private timerEvent?: Phaser.Time.TimerEvent;
  private timerCallback = () => {};
  private duration = 0;

  constructor(scene: Phaser.Scene, label: Phaser.GameObjects.Text) {
    this.scene = scene;
    this.label = label;
  }

  start(callback?: () => void, duration = 1000 * 60 * 2) {
    this.stop();
    this.duration = duration;
    if (callback) {
      this.timerCallback = callback;
    }
    this.timerEvent = this.scene.time.addEvent({
      delay: this.duration,
      callback: () => {
        this.label.text = "00:00";
        this.stop();
        this.timerCallback();
      },
    });
  }

  stop() {
    if (this.timerEvent) {
      this.timerEvent.destroy();
      this.timerEvent = undefined;
    }
  }

  update() {
    if (!this.timerEvent || this.duration <= 0) {
      return;
    }
    const elapsed = this.timerEvent.getElapsed();
    const remaining = this.duration - elapsed;
    const minutes = (Math.round(remaining) / (1000 * 60)) % 60;
    const seconds = (Math.round(remaining) / 1000) % 60;
    const format = (value) => {
      const _value = value.toFixed(2);
      if (_value.length < 5) {
        return `0${_value.slice(0, 1)}`;
      }
      return _value.slice(0, 2);
    };
    this.label.text = `${format(minutes)}:${format(seconds)}`;
  }
}

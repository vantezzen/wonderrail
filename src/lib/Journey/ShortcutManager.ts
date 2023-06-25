import EventEmitter from "events";

export default class ShortcutManager extends EventEmitter {
  constructor() {
    super();
    window.addEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e: KeyboardEvent) => {
    const hasCtrl = e.ctrlKey || e.metaKey;
    if (hasCtrl && e.shiftKey && e.key.length === 1) {
      e.preventDefault();
      this.emit(`ctrl-shift-${e.key}`);
    } else if (hasCtrl && e.key.length === 1) {
      e.preventDefault();
      this.emit(`ctrl-${e.key}`);
    }
  };
}

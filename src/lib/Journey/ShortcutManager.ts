import EventEmitter from "events";
import { trackEvent } from "../analytics";

export default class ShortcutManager extends EventEmitter {
  constructor() {
    super();
    window.addEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e: KeyboardEvent) => {
    const hasCtrl = e.ctrlKey || e.metaKey;
    if (hasCtrl && e.shiftKey && e.key.length === 1) {
      trackEvent(`shortcut_ctrl_shift_${e.key}`);
      this.emit(`ctrl-shift-${e.key}`);
      if (this.isShortcutRegistered(`ctrl-shift-${e.key}`)) {
        e.preventDefault();
      }
    } else if (hasCtrl && e.key.length === 1) {
      trackEvent(`shortcut_ctrl_${e.key}`);
      this.emit(`ctrl-${e.key}`);
      if (this.isShortcutRegistered(`ctrl-${e.key}`)) {
        e.preventDefault();
      }
    }
    return true;
  };

  isShortcutRegistered(shortcut: string) {
    return this.eventNames().includes(shortcut);
  }
}

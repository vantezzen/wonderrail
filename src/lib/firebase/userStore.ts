import { User } from "firebase/auth";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UserState {
  user: User;
  setUser: (user: User) => void;
}

const useUserStore = create<UserState>()(
  devtools((set) => ({
    user: null as any,
    setUser: (user: User) => set({ user }),
  }))
);
export default useUserStore;

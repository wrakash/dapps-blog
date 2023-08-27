import { action, Action, createStore, persist } from "easy-peasy";
import { User } from "../type";

export interface EasyPeasyStore {
  isAuthenticated: boolean;
  user: User;
  setUser: Action<this, User>;
  removeUser: Action<this>;
}

const initialState = {
  isAuthenticated: false,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    role: [],
  },
};

export const store = createStore<EasyPeasyStore>(
  persist(
    {
      ...initialState,
      setUser: action((state: any, user: User) => {
        state.user = user;
        state.isAuthenticated = true;
      }),
      removeUser: action((state: any) => {
        state.user = {
          firstName: "",
          lastName: "",
          email: "",
          role: [],
        };
        state.isAuthenticated = false;
      }),
    },
    {
      storage: {
        getItem: async function (key) {
          const value: any = await localStorage.getItem(key);
          return JSON.parse(value);
        },

        setItem: function (key, value) {
          localStorage.setItem(key, JSON.stringify(value));
        },

        removeItem: function (key) {
          localStorage.removeItem(key);
        },
      },
      allow: ["user", "isAuthenticated"],
    }
  ),
  {
    name: "thedapplist",
  }
);

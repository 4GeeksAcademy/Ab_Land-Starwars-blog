export const initialStore = () => {
  return {
    theme: "light",
    arrWhats: [
      "Characters",
      "Planets",
      "Films",
      "Species",
      "Starships",
      "Vehicles",
    ],
    favorites: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "TOGGLE_THEME":
      return { ...store, theme: store.theme === "light" ? "dark" : "light" };

    case "Add_Like":
      return { ...store, favorites: [...store.favorites, action.payload] };

    case "Delete_Like":
      return {
        ...store,
        favorites: store.favorites.filter((_, i) => i !== action.payload),
      };

    default:
      throw Error("Unknown action.");
  }
}

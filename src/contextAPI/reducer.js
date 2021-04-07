export const initialState = {
  details: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_DETAILS":
      return {
        ...state,
        details: [...state.details, action.item],
      };
    default:
      return state;
  }
};

export default reducer;

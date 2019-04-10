import { GET_CATEGORIES } from "../actions/actionTypes";

export function categories(state = {}, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        ...action.categories.reduce(function(myArray, category) {
          myArray[category.name] = category;
          return myArray;
        }, {})
      };
    default:
      return state;
  }
}
export default categories;

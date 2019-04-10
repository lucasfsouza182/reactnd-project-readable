import { GET_CATEGORIES } from '../actions/actionTypes';
import { getAllCategories }  from '../utils/api';

export function getCategories({ categories }) {	
	return {
	  type: GET_CATEGORIES,
	  categories
	}
}
  
  export function getCategoriesAPI() {
	return function (dispatch) {
	  getAllCategories().then(categories => {
		dispatch(getCategories({ categories }));
	  });
	}
}
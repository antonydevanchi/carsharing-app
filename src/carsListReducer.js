export function carsListReducer(state, action) {
  switch (action.type) {
    case "category": {
      return {
        ...state,
        carCategories: action.value,
      };
    }
    case "cars": {
      return {
        ...state,
        cars: action.value,
        isFetchError: false,
        carPages: action.count,
      };
    }

    case "error": {
      return {
        ...state,
        isFetchError: true,
      };
    }
    case "page": {
      return {
        ...state,
        currentPage: action.value,
      };
    }
    case "url": {
      return {
        ...state,
        carsUrlEnd: action.value,
        currentPage: 0,
        activeIndex: 0,
      };
    }
    case "reset": {
      return {
        ...state,
        carsUrlEnd: "",
        currentPage: 0,
        activeIndex: 0,
        searchItems: action.value,
      };
    }
    case "right": {
      return {
        ...state,
        activeIndex: state.activeIndex + 1,
      };
    }
    case "left": {
      return {
        ...state,
        activeIndex: state.activeIndex - 1,
      };
    }
    case "search": {
      return {
        ...state,
        searchItems: { ...state.searchItems, [action.field]: action.value },
      };
    }
    default:
      break;
  }
  return state;
}

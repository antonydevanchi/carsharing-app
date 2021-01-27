export function pointsListReducer(state, action) {
  switch (action.type) {
    case "city": {
      return {
        ...state,
        cities: action.value,
      };
    }
    case "points": {
      return {
        ...state,
        points: action.value,
        isFetchError: false,
        pointPages: action.count,
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
        pointsUrlEnd: action.value,
        currentPage: 0,
        activeIndex: 0,
      };
    }
    case "reset": {
      return {
        ...state,
        pointsUrlEnd: "",
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

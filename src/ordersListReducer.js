export function ordersListReducer(state, action) {
  switch (action.type) {
    case "city": {
      return {
        ...state,
        cities: action.value,
      };
    }
    case "status": {
      return {
        ...state,
        statuses: action.value,
      };
    }
    case "car": {
      return {
        ...state,
        cars: action.value,
      };
    }
    case "orders": {
      return {
        ...state,
        orders: action.value,
        isFetchError: false,
        orderPages: action.count,
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
        ordersUrlEnd: action.value,
        currentPage: 0,
        activeIndex: 0,
      };
    }
    case "reset": {
      return {
        ...state,
        ordersUrlEnd: "",
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

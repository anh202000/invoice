import { ACTIONS } from "./action";

const reducers = (state: any, action: any) => {
  switch (action.type) {
    case ACTIONS.NOTIFY:
      return {
        ...state,
        notify: action.payload,
      };
    case ACTIONS.AUTH:
      return {
        ...state,
        auth: action.payload,
      };
    case ACTIONS.PROFILE:
      return {
        ...state,
        user: action.payload,
      };
    case ACTIONS.LISTINVOICE:
      return {
        ...state,
        listInVoice: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;

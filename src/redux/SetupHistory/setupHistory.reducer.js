import { ADD_RACE } from "./setupHistory.types";

const INITIAL_STATE = {
  races: {},
  lastRaceId: 0,
};

const setupHistoryReducer = (state = INITIAL_STATE, action) => {
  console.log({ state, action });
  switch (action.type) {
    case ADD_RACE: {
      const newRaceId = state.lastRaceId + 1;
      return {
        ...state,
        lastRaceId: newRaceId,
        races: {
          ...state.races,
          [newRaceId]: {
            id: newRaceId,
            country: action.payload.country,
          },
        },
      };
    }

    default:
      return state;
  }
};

export default setupHistoryReducer;

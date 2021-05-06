import { ADD_RACE, SET_ACTIVE_RACE } from "./setupHistory.types";

const INITIAL_STATE = {
  races: {},
  lastRaceId: -1,
  activeRaceId: -1,
};

const setupHistoryReducer = (state = INITIAL_STATE, action) => {
  console.log({ state, action });
  switch (action.type) {
    case ADD_RACE: {
      const newRaceId = state.lastRaceId + 1;
      return {
        ...state,
        lastRaceId: newRaceId,
        activeRaceId: newRaceId,
        races: {
          ...state.races,
          [newRaceId]: {
            id: newRaceId,
            country: action.payload.country,
            setups: [],
          },
        },
      };
    }

    case SET_ACTIVE_RACE: {
      return {
        ...state,
        activeRaceId: action.payload.raceId,
      };
    }

    default:
      return state;
  }
};

export default setupHistoryReducer;

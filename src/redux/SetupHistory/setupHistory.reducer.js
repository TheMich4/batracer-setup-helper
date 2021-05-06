import { ADD_RACE, SET_ACTIVE_RACE, ADD_SETUP } from "./setupHistory.types";

const INITIAL_STATE = {
  races: {},
  lastRaceId: -1,
  activeRaceId: -1,
  activeSetupName: null,
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
            setups: {},
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

    case ADD_SETUP:
      return {
        ...state,
        activeSetupName: action.payload.setupName,
        races: {
          ...state.races,
          [state.activeRaceId]: {
            ...state.races[state.activeRaceId],
            setups: {
              ...state.races[state.activeRaceId].setups,
              [action.payload.setupName]: action.payload.setup,
            },
          },
        },
      };

    default:
      return state;
  }
};

export default setupHistoryReducer;

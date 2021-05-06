import { ADD_RACE, SET_ACTIVE_RACE } from "./setupHistory.types";

export const addRace = (country) => ({ type: ADD_RACE, payload: { country } });

export const getRaceList = (state) => {
  const raceList = Object.values(state.setupHistory.races).map((race) => ({
    id: race.id,
    country: race.country,
  }));
  console.log({ state, raceList });
  return raceList;
};

export const setActiveRace = (raceId) => ({ type: SET_ACTIVE_RACE, payload: { raceId } });

export const getActiveRace = (state) => {
  if (state.setupHistory.lastRaceId < 0 || state.setupHistory.activeRaceId < 0) {
    return null;
  }

  return state.setupHistory.races[state.setupHistory.activeRaceId];
};

import { ADD_RACE, SET_ACTIVE_RACE, ADD_SETUP } from "./setupHistory.types";
import { defaultSetup } from "../../consts";

export const addRace = (country) => ({ type: ADD_RACE, payload: { country } });

export const getRaceList = (state) => {
  const raceList = Object.values(state.setupHistory.races).map((race) => ({
    id: race.id,
    country: race.country,
  }));
  return raceList;
};

export const setActiveRace = (raceId) => ({ type: SET_ACTIVE_RACE, payload: { raceId } });

export const getActiveRace = (state) => {
  if (state.setupHistory.lastRaceId < 0 || state.setupHistory.activeRaceId < 0) {
    return null;
  }

  return state.setupHistory.races[state.setupHistory.activeRaceId];
};

export const addSetup = (setupName, setup = defaultSetup) => ({
  type: ADD_SETUP,
  payload: { setup, setupName },
});

export const getActiveSetupName = (state) => state.setupHistory.activeSetupName;

export const getActiveSetup = (state) => {
  const activeSetupName = getActiveSetupName(state);
  const activeRace = getActiveRace(state);

  if (!activeSetupName || !activeRace) {
    return null;
  }

  return state.setupHistory.races[activeRace.id].setups[activeSetupName];
};

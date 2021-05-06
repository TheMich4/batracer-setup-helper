import { ADD_RACE } from "./setupHistory.types";

export const addRace = (country) => ({ type: ADD_RACE, payload: { country } });

export const getRaceList = (state) => {
  const raceList = Object.values(state.setupHistory.races).map((race) => race.country);
  console.log({ state, raceList });
  return raceList;
};

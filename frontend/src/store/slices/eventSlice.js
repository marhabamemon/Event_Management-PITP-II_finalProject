import { createSlice } from '@reduxjs/toolkit'

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    currentEvent: null
  },
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload
    },
    setCurrentEvent: (state, action) => {
      state.currentEvent = action.payload
    }
  }
})

export const { setEvents, setCurrentEvent } = eventSlice.actions
export default eventSlice.reducer
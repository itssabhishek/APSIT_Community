import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// generate randome UUIDs
import { v4 as uuidv4 } from 'uuid';
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  events: [
    // '#00AB55', // theme.palette.primary.main,
    // '#1890FF', // theme.palette.info.main,
    // '#54D62C', // theme.palette.success.main,
    // '#FFC107', // theme.palette.warning.main,
    // '#FF4842', // theme.palette.error.main
    // '#04297A', // theme.palette.info.darker
    // '#7A0C2E', // theme.palette.error.darker
    {
      id: uuidv4(),
      allDay: true,
      textColor: '#7A0C2E',
      description: 'Mahavir Jayanti (Holiday)',
      start: '2023-04-03T18:30:00.000Z',
      end: '2023-04-04T18:30:00.000Z',
      title: 'Mahavir Jayanti',
    },
    {
      id: uuidv4(),
      allDay: true,
      textColor: '#7A0C2E',
      description: 'Good Friday (Holiday)',
      start: '2023-04-06T18:30:00.000Z',
      end: '2023-04-07T18:30:00.000Z',
      title: 'Good Friday',
    },

    {
      id: uuidv4(),
      allDay: true,
      textColor: '#7A0C2E',
      description: 'Dr. Babasaheb Ambedkar Jayanti (Holiday)',
      start: '2023-04-13T18:30:00.000Z',
      end: '2023-04-14T18:30:00.000Z',
      title: 'Dr. Babasaheb Ambedkar Jayanti',
    },
    {
      id: uuidv4(),
      allDay: false,
      textColor: '#FFC107',
      description: 'Day 1 of Term Test-II & Academic Review',
      start: '2023-04-16T29:00:00.000Z',
      end: '2023-04-16T34:00:00.000Z',
      title: 'Term Test-II & Academic Review',
    },
    {
      id: uuidv4(),
      allDay: false,
      textColor: '#FFC107',
      description: 'Day 2 of Term Test-II',
      start: '2023-04-17T29:00:00.000Z',
      end: '2023-04-17T34:00:00.000Z',
      title: 'Term Test-II',
    },
    {
      id: uuidv4(),
      allDay: false,
      textColor: '#FFC107',
      description: 'Day 3 of Term Test-II',
      start: '2023-04-18T29:00:00.000Z',
      end: '2023-04-18T34:00:00.000Z',
      title: 'Term Test-II',
    },
    {
      id: uuidv4(),
      allDay: false,
      textColor: '#FF4842',
      description: 'Third defaulter list',
      start: '2023-04-19T18:30:00.000Z',
      end: '2023-04-20T18:30:00.000Z',
      title: 'Third defaulter list',
    },
    {
      id: uuidv4(),
      allDay: false,
      textColor: '#FFC107',
      description: 'Commencement of Oral/Practical examination',
      start: '2023-04-23T18:30:00.000Z',
      end: '2023-04-27T18:30:00.000Z',
      title: 'Oral/Practical',
    },
    {
      id: uuidv4(),
      allDay: true,
      textColor: '#7A0C2E',
      description: 'Maharashtra Day (Holiday)',
      start: '2023-04-30T18:30:00.000Z',
      end: '2023-05-01T18:30:00.000Z',
      title: 'Maharashtra Day',
    },
    {
      id: uuidv4(),
      allDay: true,
      textColor: '#7a0c41',
      description: 'Buddha Poornima (Holiday)',
      start: '2023-05-03T18:30:00.000Z',
      end: '2023-05-04T18:30:00.000Z',
      title: 'Buddha Poornima',
    },
    {
      id: uuidv4(),
      allDay: false,
      textColor: '#FFC107',
      description: 'Theory Examination',
      start: '2023-05-07T18:30:00.000Z',
      end: '2023-05-19T18:30:00.000Z',
      title: 'Theory Examination',
    },
  ],
  isOpenModal: false,
  selectedEventId: null,
  selectedRange: null,
};

const slice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET EVENTS
    getEventsSuccess(state, action) {
      state.isLoading = false;
      state.events = action.payload;
    },

    // CREATE EVENT
    createEventSuccess(state, action) {
      const newEvent = action.payload;
      state.isLoading = false;
      state.events = [...state.events, newEvent];
    },

    // UPDATE EVENT
    updateEventSuccess(state, action) {
      const event = action.payload;
      const updateEvent = state.events.map((_event) => {
        if (_event.id === event.id) {
          return event;
        }
        return _event;
      });

      state.isLoading = false;
      state.events = updateEvent;
    },

    // DELETE EVENT
    deleteEventSuccess(state, action) {
      const { eventId } = action.payload;
      const deleteEvent = state.events.filter((event) => event.id !== eventId);
      state.events = deleteEvent;
    },

    // SELECT EVENT
    selectEvent(state, action) {
      const eventId = action.payload;
      state.isOpenModal = true;
      state.selectedEventId = eventId;
    },

    // SELECT RANGE
    selectRange(state, action) {
      const { start, end } = action.payload;
      state.isOpenModal = true;
      state.selectedRange = { start, end };
    },

    // OPEN MODAL
    openModal(state) {
      state.isOpenModal = true;
    },

    // CLOSE MODAL
    closeModal(state) {
      state.isOpenModal = false;
      state.selectedEventId = null;
      state.selectedRange = null;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { openModal, closeModal, selectEvent } = slice.actions;

// ----------------------------------------------------------------------

export function getEvents(moodleId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/calendar/events', {
        moodleId: moodleId,
      });
      dispatch(slice.actions.getEventsSuccess(response.data.events));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createEvent(newEvent) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axios.post('/api/calendar/events/new', newEvent);
      dispatch(slice.actions.createEventSuccess(newEvent));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateEvent(eventId, updateEvent) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axios.post('/api/calendar/events/update', {
      //   eventId,
      //   updateEvent,
      // });
      dispatch(slice.actions.updateEventSuccess({ ...updateEvent, id: eventId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteEvent(eventId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      // await axios.post('/api/calendar/events/delete', { eventId });
      dispatch(slice.actions.deleteEventSuccess({ eventId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function selectRange(start, end) {
  return async () => {
    dispatch(
      slice.actions.selectRange({
        start: start.getTime(),
        end: end.getTime(),
      })
    );
  };
}

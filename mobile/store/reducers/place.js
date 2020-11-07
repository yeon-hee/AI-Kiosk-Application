import { SET_PLACE } from '../actions/place';

const initialState = {
    place: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PLACE:
            return { ...state, place: action.payload};
        default:
            return state;
    }
}
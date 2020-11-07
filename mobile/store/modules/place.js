// 액션 타입 정의
const SET_PLACE = 'SET_PLACE';

// 액션 생성 함수 정의
export const setPlace = (place) => {
    return { type: SET_PLACE, _place: place };
}

// 초기상태 정의
const initialState = {
    _place: {
        address: 'seoul',
        id: 0,
        name: '_',
        phone: '123',
    },
};

// 리듀서 작성
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PLACE:
            return {
                ...state,
                _place: action._place
            };
        default:
            return state;
    }
}

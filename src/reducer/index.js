const initialState = {
  connection: 'close',
  error: '',
  members: [],
  sticker: null,
  name: '',
  avatar: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'CONNECTING': {
      return {
        ...state,
        connection: 'connecting',
        name: action.payload.name,
        avatar: action.payload.avatar,
      };
    }

    case 'ERROR': {
      return {
        ...state,
        connection: 'error',
        error: action.payload.message,
      };
    }

    case 'DISCONNECT':
      return {
        ...state,
        members: [],
        connection: 'close',
      };

    case 'JOIN':
      return {
        ...state,
        members: state.members.concat(action.payload),
      };

    case 'LEAVE':
      console.log('Reducer leave', action.payload.userId, state.members.length);
      return {
        ...state,
        members: state.members.filter(member => member.userId != action.payload.userId),
      };

    case 'MEMBERS':
      return {
        ...state,
        connection: 'open',
        members: action.payload.clients,
      };

    case 'STICKER':
      return {
        ...state,
        sticker: action.payload,
      };

    default:
      return state;
  }
}

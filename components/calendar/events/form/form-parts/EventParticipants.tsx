import React, { useImperativeHandle, useReducer } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/pro-duotone-svg-icons';
import { faPlus, faXmark } from '@fortawesome/pro-regular-svg-icons';

import { IEvent, Participant } from '../../../../../models/Event';
import classes from '../EventForm.module.scss';

interface Props {
    initialEvent?: IEvent;
}

export type ParticipantsRef = {
    getParticipants: () => Participant[];
};

interface State {
    participants: Participant[];
}

enum ActionType {
    ADD = 'add',
    DELETE = 'delete',
    EDIT = 'edit',
}

type Action =
    | {
          action: ActionType.ADD;
      }
    | { action: ActionType.EDIT; index: number; name?: string; email?: string }
    | { action: ActionType.DELETE; index: number };

function participantReducer(state: State, action: Action) {
    const newParts = [...state.participants];
    if (action.action === ActionType.ADD) {
        newParts.push({ name: '', email: '' });
    } else if (action.action === ActionType.EDIT) {
        const existingPart = state.participants[action.index];
        const partToEdit = { ...existingPart };
        partToEdit.name = action.name !== undefined ? action.name : existingPart.name;
        partToEdit.email = action.email !== undefined ? action.email : existingPart.email;
        newParts[action.index] = partToEdit;
    } else if (action.action === ActionType.DELETE) {
        newParts.splice(action.index, 1);
    }
    return { participants: newParts };
}

const initialState: State = {
    participants: [{ name: '', email: '' }],
};

function getInitialParticipantState(initialEvent?: IEvent): State {
    return initialEvent && initialEvent.participants && initialEvent.participants.length > 0
        ? { participants: initialEvent.participants }
        : initialState;
}

const EventParticipants: React.ForwardRefRenderFunction<ParticipantsRef, Props> = (
    { initialEvent },
    ref,
) => {
    const [participantState, dispatchParticipant] = useReducer(
        participantReducer,
        getInitialParticipantState(initialEvent),
    );

    useImperativeHandle(ref, () => ({
        getParticipants: () => participantState.participants,
    }));

    const addParticipantHandler = () => {
        dispatchParticipant({ action: ActionType.ADD });
    };
    const deleteParticipantHandler = (index: number) => {
        dispatchParticipant({ action: ActionType.DELETE, index });
    };
    const editParticipantHandler = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        dispatchParticipant({
            action: ActionType.EDIT,
            index,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className={`${classes.section}`}>
            <label className="flex">
                <span className="mr-auto">
                    <FontAwesomeIcon icon={faUsers} className={'icon-medium mr-2'} />
                    Participants
                </span>
                <button className="" type="button" onClick={addParticipantHandler}>
                    <FontAwesomeIcon icon={faPlus} className={`icon-medium`} /> New
                </button>
            </label>
            {participantState.participants.map((p, idx) => (
                <div key={idx} className={`flex justify-between items-center`}>
                    <input
                        type="text"
                        value={p.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            editParticipantHandler(e, idx)
                        }
                        name="name"
                        placeholder="Name"
                        className="w-[32%]"
                    />
                    <input
                        type="email"
                        value={p.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            editParticipantHandler(e, idx)
                        }
                        name="email"
                        placeholder="Email"
                        className="w-[62%]"
                    />
                    <FontAwesomeIcon
                        icon={faXmark}
                        onClick={deleteParticipantHandler.bind(null, idx)}
                        className={`text-pink-500 text-xl ${classes.icon}`}
                    />
                </div>
            ))}
        </div>
    );
};

export default React.forwardRef(EventParticipants);

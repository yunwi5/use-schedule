import React, { useEffect, useReducer } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/pro-duotone-svg-icons';
import { faPlus, faXmark } from '@fortawesome/pro-regular-svg-icons';
import { UseFormRegister } from 'react-hook-form';

import { EventFormValues } from '../../../../recurring/crud-operations/form/RecurringEventForm';
import { IEvent, Participant } from '../../../../../models/Event';
import classes from '../EventForm.module.scss';

const labelIconClass = `inline-block max-w-[1.3rem] max-h-[1.3rem] mr-2`;

interface Props {
    onUpdate: React.Dispatch<React.SetStateAction<Participant[]>>;
    initialEvent?: IEvent;
}

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

const EventParticipants: React.FC<Props> = ({ initialEvent, onUpdate }) => {
    const [participantState, dispatchParticipant] = useReducer(
        participantReducer,
        getInitialParticipantState(initialEvent),
    );

    const addParticipantHandler = () => {
        dispatchParticipant({ action: ActionType.ADD });
    };
    const deleteParticipantHandler = (index: number) => {
        dispatchParticipant({ action: ActionType.DELETE, index });
    };
    const editParticipantHandler = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        dispatchParticipant({ action: ActionType.EDIT, index, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const participants = participantState.participants.filter((p) => p.name && p.email);
        onUpdate(participants);
    }, [participantState.participants, onUpdate]);

    return (
        <div className={`${classes.section}`}>
            <label className="flex">
                <span className="mr-auto">
                    <FontAwesomeIcon icon={faUsers} className={labelIconClass} />
                    Participants
                </span>
                <button className="" type="button" onClick={addParticipantHandler}>
                    <FontAwesomeIcon icon={faPlus} className={`${labelIconClass} !mr-0`} /> New
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

export default EventParticipants;

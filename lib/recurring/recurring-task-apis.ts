import axios from 'axios';
import { RecurringTask } from '../../models/recurring-models/RecurringTask';

const BASE_URL = '/api/recurring/tasks';

export async function fetchRecurringTasks() {
    return (await axios.get<RecurringTask[]>(BASE_URL)).data;
}

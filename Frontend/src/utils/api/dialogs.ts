import {axios} from '../../core/index';

const dialogs = {
    getAll: () => axios.get("/dialogs")
}
export default dialogs
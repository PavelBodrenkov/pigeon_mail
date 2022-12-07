import {$api} from '../../core/index';

const dialogs = {
    getAll: () => $api.get("/dialogs")
}
export default dialogs
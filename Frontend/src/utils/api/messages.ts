import {$api} from '../../core/index';

const messages = {
    getAllByDialogId: (id:number) => $api.get(`/messages?id=${id}`)
}
export default messages
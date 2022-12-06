import {axios} from '../../core/index';

const messages = {
    getAllByDialogId: (id:number) => axios.get(`/messages?id=${id}`)
}
export default messages
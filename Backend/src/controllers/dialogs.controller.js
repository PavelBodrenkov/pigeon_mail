const dialogService = require('../services/dialog.service')

class DialogsController {


    constructor(io) {
        // console.log('io', io)
        this.io = io
    }

    async createDialog(req, res) {
       try {
           const dialog = await dialogService.createDialog(req)
           console.log('this.io',this.io)
           // this.io.emit('SERVER:DIALOG_CREATED', dialog)
           // res.json(dialog)
       } catch (e) {
           console.log('Ошибка диалога',e)
       }
    }

    async getDialogs(req, res) {
       try {
           const dialogs = await dialogService.getAllDialogsByUser(req)
           res.json(dialogs)
       } catch (e) {
           console.log('Ошибка диалога',e)
       }
    }

}

module.exports = DialogsController
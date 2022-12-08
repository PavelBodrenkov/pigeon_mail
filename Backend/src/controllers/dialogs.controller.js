const dialogService = require('../services/dialog.service')

class DialogsController {
    async createDialog(req, res) {
       try {
           const dialog = await dialogService.createDialog(req)
           res.json(dialog)
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

module.exports = new DialogsController()
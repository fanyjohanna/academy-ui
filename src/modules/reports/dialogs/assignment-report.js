

@inject(DialogController)
@useView("modules/project/dialogs/assignment-editor.html")
export class AssignmentReport {

    @bindable selectedIteration = {};// required. for initial variable reference. 
    @bindable selectedAccount = {};// required. for initial variable reference.

    constructor(dialogController) {
        this.dialogController = dialogController;
    }

    async activate(data) {
        this.data = data;
        this.assignmentService = new RestService("core", `tasks/${this.data.taskId}/assignments`);
        this.iterationService = new RestService("core", `iterations`);
        this.accountService = new RestService("core", "accounts");
        this.projectService = new RestService("core", `projects`);

        var iterationId = this.data.iterationId;
        var accountId = this.data.accountId;
        this.selectedIteration = await this.iterationService.get(iterationId, { filter: { include: "project" } });
        this.selectedAccount = await this.accountService.get(accountId);
    }







}
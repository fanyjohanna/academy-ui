

export class reportTask{





 taskColumns = [
    "code",
    "name",
    // {
    //   field: "date", title: "date",
    //   formatter: this.__dateFormatter
    // },
    // "budget",
    // "actual",
    {
      field: "open", title: "open",
      formatter: this.__dateFormatter
    },
    {
      field: "close", title: "close",
      formatter: this.__dateFormatter
    },
    "remark",
    "status"];

  taskContextMenu = ["Report"];
  __taskContextMenuCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "Report":
        this.__taskShowEditorDialog(data);
        break;
    }
  }
  __taskRowClickCallback(event) {
    var data = event.detail;
    this.activeTask = data;
  }

  __taskCreateCallback() {
    this.__taskShowEditorDialog({ projectId: this.projectId, backlogId: this.activeBacklog.id })
  }

  __taskShowEditorDialog(data) {
    this.dialog.show(TaskEditor, data)
      .then(response => {
        if (!response.wasCancelled) {
          this.taskTable.refresh();
        }
      });
  }

  taskLoader = (info) => {
    if (!this.activeBacklog)
      return Promise.resolve({ total: 0, data: [] });
    else {
      var fields = this.taskColumns.map(col => {
        if (typeof col === "string")
          return col;
        else if (typeof col === "object" && col.field)
          return col.field;
      })
      var loopbackFilter = createLoopbackFilterObject(info, fields)
      return Promise
        .all([this.taskService.count(loopbackFilter.filter), this.taskService.list(loopbackFilter)])
        .then(results => {
          var count = results[0].count;
          var data = results[1];
          return {
            total: count,
            data: data
          };
        });
    }
  }


} 
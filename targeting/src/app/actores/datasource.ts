export let sampleData: Object[] = [

    {
        taskId: 1,
        taskName: "Actor 1",
        startDate: new Date("02/03/1994"),
        endDate: new Date("02/07/2012"),
        progress: 100,
        duration: 5,
        priority: "Actor Principal",
        approved: false,
        isInExpandState: true,
    },
    {
        taskId: 2,
        taskName: 'Actor 2',
        startDate: new Date("02/03/1994"),
        endDate: new Date("02/07/2012"),
        progress: 100,
        duration: 5,
        priority: "sub actor",
        parentId: 1
    },
    {
        taskId:6,
        taskName: "Actor 6",
        startDate: new Date("02/03/1994"),
        endDate: new Date("02/07/2012"),
        progress: 3,
        duration: 86,
        priority: "Comentario",
        approved: false,
        isInExpandState: false
    }

]
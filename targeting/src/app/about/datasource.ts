export let sampleData: Object[] = [

    {
        taskId: 1,
        taskName: "Planning",
        startDate: new Date("02/03/1994"),
        endDate: new Date("02/07/2012"),
        progress: 100,
        duration: 5,
        priority: "Normal",
        approved: false,
        isInExpandState: true,
    },
    {
        taskId: 2,
        taskName: 'Plan timeline',
        startDate: new Date("02/03/1994"),
        endDate: new Date("02/07/2012"),
        progress: 100,
        duration: 5,
        priority: "Normal",
        parentId: 1
    },
    {
        taskId:6,
        taskName: "Desgin",
        startDate: new Date("02/03/1994"),
        endDate: new Date("02/07/2012"),
        progress: 3,
        duration: 86,
        priority: "High",
        approved: false,
        isInExpandState: false
    }

]
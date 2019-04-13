export interface ChartConfiguration{
    colorSet?:  string,
    animationEnabled: boolean,
    title: {
        text: string,
        horizontalAlign?: string
    },
    theme?: string,
    data: [{
        type: string,
        indexLabel: string,
        toolTipContent: string ,
        dataPoints: any[],
        startAngle?: number,
        indexLabelFontSize?: number
    }]
}
var new_doctors_options = {
series: [
    {
        name: "Absolventi VŠ",
        type: "line",
        data: graduates,
    },    
    {
        name: "Noví lékaři v ČLK",
        type: "line",
        data: new_doctors,
    },
  
],

chart: {
    height: 350,
    type: "line",
    stacked: false
},
stroke: {
    width: [4, 4],
},
title: {
    text: "",
},
dataLabels: {
    enabled: true,
    enabledOnSeries: [0,1],
},
labels: years,
xaxis: {
    type: "int",
    title: 'Rok'
},
yaxis: [
    {
    title: {
        text: "Počet",
    },
    }
],
};

var chart = new ApexCharts(document.querySelector("#linechart"), new_doctors_options);
chart.render();

// -----------------------------------------------------------------------------
//  BARCHART
var graduates_options = {
    series: [{
    name: 'Češi',
    data: graduated_czechs
  }, {
    name: 'Slováci',
    data: graduated_slovaks
  }, {
    name: 'Ostatní',
    data: graduated_others
  }],
    chart: {
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded'
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: years ,
  },
  yaxis: {
    title: {
      text: 'Počet'
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return  val
      }
    }
  }
  };

  var chart = new ApexCharts(document.querySelector("#barchart"), graduates_options);
  chart.render();


  var boxplot_options = {
    series: [
    {
      name: 'box',
      type: 'boxPlot',
      data: [
        {
          x: new Date('2017-01-01').getTime(),
          y: [54, 66, 69, 75, 88]
        },
        {
          x: new Date('2018-01-01').getTime(),
          y: [43, 65, 69, 76, 81]
        },
        {
          x: new Date('2019-01-01').getTime(),
          y: [31, 39, 45, 51, 59]
        },
        {
          x: new Date('2020-01-01').getTime(),
          y: [39, 46, 55, 65, 71]
        },
        {
          x: new Date('2021-01-01').getTime(),
          y: [29, 31, 35, 39, 44]
        }
      ]
    },
    {
      name: 'outliers',
      type: 'scatter',
      data: [
        {
          x: new Date('2017-01-01').getTime(),
          y: 32
        },
        {
          x: new Date('2018-01-01').getTime(),
          y: 25
        },
        {
          x: new Date('2019-01-01').getTime(),
          y: 64
        },
        {
          x: new Date('2020-01-01').getTime(),
          y: 27
        },
        {
          x: new Date('2020-01-01').getTime(),
          y: 78
        },
        {
          x: new Date('2021-01-01').getTime(),
          y: 15
        }
      ]
    }
  ],
    chart: {
    type: 'boxPlot',
    height: 350
  },
  colors: ['#008FFB', '#FEB019'],
  title: {
    text: 'BoxPlot - Scatter Chart',
    align: 'left'
  },
  xaxis: {
    type: 'datetime',
    tooltip: {
      formatter: function(val) {
        return new Date(val).getFullYear()
      }
    }
  },
  tooltip: {
    shared: false,
    intersect: true
  }
  };

  var chart = new ApexCharts(document.querySelector("#boxplot"), boxplot_options);
  chart.render();



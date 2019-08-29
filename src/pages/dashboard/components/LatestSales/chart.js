//import palette from 'theme/palette';

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  legend: { display: false },
  cornerRadius: 20,
  tooltips: {
    enabled: true,
    mode: "index",
    intersect: false,
    borderWidth: 1,
    //borderColor: palette.divider,
    backgroundColor: "white",
    titleFontColor: "blue",
    bodyFontColor: "green",
    footerFontColor: "green"
  },
  layout: { padding: 0 },
  scales: {
    xAxes: [
      {
        barThickness: 52,
        //maxBarThickness: 10,
        //barPercentage: 0.5,
        categoryPercentage: 0.5,
        ticks: {
          fontColor: "green"
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: "green",
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          //color: palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2]
          //zeroLineColor: palette.divider
        }
      }
    ]
  }
};

import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
      datacollection: {
        labels: [],
        datasets: [
          {
            label: "west",
            data: [],
            fill: false,
            borderColor: "red"
          },
          {
            label: "national",
            data: [],
            fill: false,
            borderColor: "blue"
          },
          {
            label: "east",
            data: [],
            fill: false,
            borderColor: "orange"
          },
          {
            label: "central",
            data: [],
            fill: false,
            borderColor: "brown"
          },
          {
            label: "south",
            data: [],
            fill: false,
            borderColor: "pink"
          },
          {
            label: "north",
            data: [],
            fill: false,
            borderColor: "aquamarine"
          }
        ]
      },
      options: {
        legend: { display: true },
        title: {
          display: true,
          text: 'PSI Twenty Four Hourly (By Region)'
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  methods: {
    fetchItems: function () {
      axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
          var datas = response.data['items']

          datas.forEach(data => {
            this.datacollection.labels.push(data['timestamp'])
            var stats = data['readings']['psi_twenty_four_hourly']
            var counter = 0
            for (var loc in stats) {
              this.datacollection.datasets[counter].data.push(stats[loc])
              counter += 1
            }
          })
          this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created() {
    this.fetchItems()
  }
}
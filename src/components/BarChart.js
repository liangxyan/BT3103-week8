//5mar added everything in here


import { Bar } from 'vue-chartjs'
import database from '../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
      datacollection: {
        labels: [],
        datasets: [{
          label: "Quantity",
          backgroundColor: ["blue", "purple", "green", "pink", "red", "yellow"],
          data: []
        }]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Total Number of each dish'
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    }
  },
  methods: {
    fetchItems: function () {
      var totalSum = {
        "Prawn Omelette": 0,
        "Dry Beef Hor Fun": 0,
        "Sambal KangKung": 0,
        "Pork Fried Rice": 0,
        "Mapo Tofu": 0,
        "Cereal Prawn": 0
      }

      database.collection('orders').get().then(querySnapShot => {
        querySnapShot.forEach(doc => {
          var data = doc.data()
          for (var item in data) {
            totalSum[item] += data[item]
          }
        })

        for (var food in totalSum) {
          this.datacollection.datasets[0].data.push(totalSum[food])
          this.datacollection.labels.push(food)
        }

        this.renderChart(this.datacollection, this.options)
      })
    }
  },
  created() {
    this.fetchItems()
  }
}
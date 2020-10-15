class TemperatureChart {
    constructor(day, infos) {
        const ctx = document.querySelector(`#day${day}-info .temperatures`).getContext("2d");
        
        const temperatures = {
            labels: [],
            datasets: [{
                label: 'Temperature en degres celcius',
                data: [],
                fill: false,
				conditionImages: [],
            }],
		};
		
		const promises = []

        for (const hour in infos["hourly_data"]) {
            temperatures.labels.push(hour);
            temperatures.datasets[0].data.push(infos["hourly_data"][hour]["TMP2m"]);

            const img = new Image(50, 50);
            const condition = conditions[infos["hourly_data"][hour]["CONDITION"]];

            img.src = `/resources/weather_img/${condition}.svg`;
			temperatures.datasets[0].conditionImages.push(img);
			
			promises.push(new Promise((resolve, reject) => {
				img.onload = resolve;
				img.onerror = reject;
			}))
        }

		Promise.all(promises)
			.then(() => {
				this._chart = new Chart(ctx, {
					type: 'line',
					data: temperatures,
					options: TemperatureChart.options
				});
			});
    }

    static get options() {
      return {
			hover: {
				animationDuration: 0
			},
			animation: {
				duration: 0,
				onComplete: function() {
					let chartInstance = this.chart,
					ctx = chartInstance.ctx;
		
					ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
					ctx.textAlign = 'center';
					ctx.textBaseline = 'bottom';

					this.data.datasets.forEach((dataset, i) => {
						let meta = chartInstance.controller.getDatasetMeta(i);
						meta.data.forEach((bar, index) => {
							const data = dataset.data[index];
							const img = dataset.conditionImages[index];
							ctx.fillStyle = "#000000"
							ctx.fillText(data + "°", bar._model.x, bar._model.y - 10);
							ctx.drawImage(img, bar._model.x, bar._model.y - 25, 50, 50);
						});
					});
				}
			},
			legend: {
				display: false
			},
			tooltips: {
				enabled: true
			},
			scales: {
				yAxes: [{
				display: false,
				gridLines: {
					display: false
				}
				}],
				xAxes: [{
				gridLines: {
					display: false
				},
				ticks: {
					beginAtZero: false
				}
				}]
			},
			layout: {
				padding: {
					left: 35,
					right: 35,
					top: 35,
					bottom: 35
				}
			}
		}
    }
}
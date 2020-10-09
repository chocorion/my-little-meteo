class CollapseDays {
    constructor() {
        this.setOnClick()
    }

    updateCollapseInfos(infos) {
        for (let day = 0; day < 5; day++) {
            this.updateDailyInfo(day, infos[`fcst_day_${day}`]);
            this.updateDailyTemperatures(day, infos[`fcst_day_${day}`]);
        }
    }

    setOnClick() {
        this._currentlySelected = document.querySelector(`button[href="#day0-info"]`);
        for (let i = 0; i <= 4; i++) {
            const button = document.querySelector(`button[href="#day${i}-info"]`);
            button.addEventListener(
                "click",
                () => {
                    this._currentlySelected.classList.remove("btn-white");
                    this._currentlySelected.classList.add("btn-secondary");

                    button.classList.remove("btn-secondary");
                    button.classList.add("btn-white");

                    this._currentlySelected = button;
                }
            )
        }
    }

    updateDailyInfo(day, infos) {
        document.querySelector(`#day${day}-button`).innerHTML = infos["day_long"];

        const div = document.querySelector(`#day${day}-info .infos`);
        div.innerHTML = `Météo pour ${infos["day_long"]} : <br>`
        div.innerHTML += `Condition : ${infos["condition"]} <br>`
        div.innerHTML += `Température minimum : ${infos['tmin']} <br>`
        div.innerHTML += `Température maximum : ${infos['tmax']} <br>`
    }

    updateDailyTemperatures(day, infos) {
        new TemperatureChart(day, infos);
    }

    
}
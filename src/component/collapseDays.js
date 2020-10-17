class CollapseDays {
    constructor(numberOfDay = 5) {
        this._numberOfDay = numberOfDay;
        this.setOnClick();
    }

    updateCollapseInfos(apiWrapper) {
        for (let day = 0; day < this._numberOfDay; day++) {
            this.updateDailyInfo(day, apiWrapper.getDayInformations(day));
            this.updateDailyTemperatures(day, apiWrapper.getDayInformations(day));
        }
    }

    setOnClick() {
        this._currentlySelected = document.querySelector(`button[href="#day0-info"]`);
        for (let i = 0; i < this._numberOfDay; i++) {
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
        document.querySelector(`#day${day}-button`).innerHTML = infos.day;

        const div = document.querySelector(`#day${day}-info .infos`);
        div.innerHTML = `Météo pour ${infos.day} : <br>`
        div.innerHTML += `Condition : ${infos.averageCondition} <br>`
        div.innerHTML += `Température minimum : ${infos.temperatureMin} <br>`
        div.innerHTML += `Température maximum : ${infos.temperatureMax} <br>`
    }

    updateDailyTemperatures(day, infos) {
        new TemperatureChart(day, infos);
    }

    
}
class CollapseDays {
    constructor() {
        this.setOnClick()
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

    
}
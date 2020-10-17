class SearchBar {
    constructor(onClick) {
        // You can use object that respect locationApiWrapper interface.
        this._locationApi = new Apicarto();
        
        this._menuForm = document.querySelector("#searchBar form");
        this._button = document.querySelector("#searchBar button");
        this._text = document.querySelector("#searchBar input");

        this._onClick = onClick;

        this.setButtonAction();
        this.setFormAction();
    }

    setButtonAction() {
        this._button.addEventListener(
            'click',
            event => {
                event.preventDefault();

                if (this._text.value === '')
                    return;

                if (!isNaN(this._text.value)) {
                    this._locationApi.getLocationFromCode(this._text.value)
                    .then(cityName => this._onClick(cityName))
                    .catch (() => this._onClick(''));
                }

                else
                    this._onClick(this._text.value);
            }
        );
    }

    setFormAction() {
        this._menuForm.addEventListener("keydown", event =>  {
            if (event.keyCode === 13) {
                event.preventDefault();
                this._button.click();
            }
        });
    }

}
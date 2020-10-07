class SearchBar {
    constructor(onClick) {
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
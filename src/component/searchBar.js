const API_CODES = "https://apicarto.ign.fr/api/codes-postaux/communes/"

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
                if (!isNaN(this._text.value)) {
                    get(API_CODES + this._text.value)
                    .then(value => {
                        let communeName = value[0].nomCommune;

                        if (typeof communeName === undefined)
                            this._onClick('');
                        
                        else {
                            let splitedName = communeName.split(" ");
                            communeName = splitedName[splitedName.length - 1];

                            this._onClick(communeName)
                        }
                    });
                }
                else if (this._text.value !== '')
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
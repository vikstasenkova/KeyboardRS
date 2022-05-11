const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
    },

    properties: {
        value: "",
        capsLock: false
    },

    languageNow: "en",
    keyArray: null,
    
    languages: {
        en:  [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "capslock", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "alt", "space"
            ],
        ru: [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
            "capslock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
            "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю",
            "alt", "space"
        ]
    },

    changeLanguage() {
        console.log("отработал changeLanguage");
    
        if(Keyboard.languageNow === "en"){
            keyArray = Keyboard.languages.ru;
            console.log(keyArray);
            Keyboard.languageNow = "ru";
            console.log(Keyboard.languageNow + "nononno");
        }
        else{
            keyArray = Keyboard.languages.en;
            Keyboard.languageNow = "en"
        }
        console.log(Keyboard.languageNow + "lalala");
        Keyboard.init();
    },

    init() {
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");
        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                activeTexteria();
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();

        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };
        if(this.languageNow === "en"){
            keyArray = this.languages.en;
        }
        if(this.languageNow === "ru"){
            keyArray = this.languages.ru
        }

        keyArray.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "p", "enter", "?", "ъ", "ю"].indexOf(key) !== -1;
            keyElement.setAttribute("type", "button");
            keyElement.setAttribute("data-key", `k${key}`);
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "capslock":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("keydown", () =>{
                        console.log("dfgdgdgdg");
                    })

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });
                    
                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });
            
        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        console.log(this.properties.capsLock);
        this.properties.capsLock = !this.properties.capsLock;
        console.log(this.properties.capsLock);
        for (const key of this.elements.keys) {
            console.log( this.elements.keys);
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
    },
};

// Animation into press
document.addEventListener('keydown', function(){
    console.log("Press key into Animation into press");
    activeTexteria();
    let currentButton = document.querySelector((`[data-key= K${event.key}]`).toLowerCase());
    if(!currentButton){
        currentButton = document.querySelector((`[data-key= kspace]`).toLowerCase());
    }
    currentButton.classList.add("active");
    console.log(currentButton);
    setTimeout(() => currentButton.classList.remove("active"), 400);
});

// Focus
function activeTexteria (){
    const inputKey = document.querySelector(".use-keyboard-input");
    inputKey.focus();
}

// Creating alt shift
document.onkeydown = function(event) {
    if (event.code == "AltLeft" || event.code == "AltRight") {
        document.onkeyup = function (event) {
            
            if (event.code == "ShiftLeft" || event.code == "ShiftRight"){
                console.log("отработал alt shift");
                Keyboard.changeLanguage();
            }
            else {
                document.onkeyup = null;
            }
        }
    }
}

// Creating keyboard
window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
    activeTexteria();
});

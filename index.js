const MenuForm = document.getElementById("menu-form");
const MenuInput = document.getElementById("menu-input");
const MenuUl = document.getElementById("menu-ul");

const Menus = JSON.parse(localStorage.getItem("Menus"));
if (Menus) {
    Menus.forEach((menu) => {
        add(menu);
    });
}

MenuForm.addEventListener("submit", function(event) {
    event.preventDefault();
    add();
});

function add(menu) {
    let MenuText = MenuInput.value;

    if (menu) {
        MenuText = menu.text;
    }

    if (MenuText) {
        const MenuList = document.createElement("li");
        const Menu = document.createElement("li");

        MenuList.innerText = MenuText;
        MenuList.classList.add("list-group-item");

        if (menu && menu.completed) {
            MenuList.classList.add("check");
        }

        MenuList.addEventListener("contextmenu", function(event) {
            event.preventDefault();
            MenuList.remove();
            saveData();
        });
        MenuList.addEventListener("click", function(event) {
            //クリックで打ち消しせん
            MenuList.classList.toggle("check");
            //クリックで編集可能にする
            MenuList.setAttribute('contenteditable', 'true');
            saveData();
        });
        MenuUl.appendChild(MenuList);
        MenuInput.value = "";
        saveData();
    }
}

function saveData() {
    const lists = document.querySelectorAll("li");
    let Menus = [];

    lists.forEach((MenuList) => {
        Menus.push({
            text: MenuList.innerText,
            completed: MenuList.classList.contains("check")
        });
    });

    localStorage.setItem("Menus", JSON.stringify(Menus));
}
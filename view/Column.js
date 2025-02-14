import KanbanAPI from "../api/KandanAPI.js";
import Item from "./Item.js";


export default class Column{
    constructor(id, title){
        this.elements = {};
        this.elements.root = Column.createRoot();
        this.elements.title = this.elements.root.querySelector(".kanban__column-title");
        this.elements.items = this.elements.root.querySelector(".kanban__column-items");
        this.elements.addItem = this.elements.root.querySelector(".kanban__add-item");

        this.elements.root.dataset.id = id;
        this.elements.title.textContent = title;

        this.elements.addItem.addEventListener("click", ()=>{
            // To do : add item
            const newItem = KanbanAPI.insertItem(id, "");

            this.renderItem(newItem);
        });

        KanbanAPI.getItems(id).forEach(item => {
           this.renderItem(item);
        })
    }

    static createRoot(){
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
            <div class="kandan__column">
            <div class="kanban__column-title"></div>
            <div class="kanban__column-items"></div>
            <button class="kanban__add-item" type="button">+ ADD</button>
            </div>
            `).children[0];
    }

    renderItem(data){
    //create item instance 
    const item = new Item(data.id, data.content);
    this.elements.items.appendChild(item.elements.root);
    }
}
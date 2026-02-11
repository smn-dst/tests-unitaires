class TodoList {
    constructor(user, emailSenderService, itemRepository) {
        this.user = user;
        this.emailSenderService = emailSenderService;
        this.itemRepository = itemRepository;
        this.items = [];
    }


    // Ajoute un item dans todoList
    add(item) {
        // User isValid
        if (!this.user || typeof this.user.isValid !== "function" || !this.user.isValid()) {
            throw new Error("User invalide, impossible d'ajouter un item.");
        }

        // TodoList ne peut pas contenir plus de 10 items
        if (this.items.length >= 10) {
            throw new Error("La ToDoList ne peut pas contenir plus de 10 items.");
        }

        // Name item > unique
        const nameAlreadyExists = this.items.some((existing) => existing.name === item.name);
        if (nameAlreadyExists) {
            throw new Error("Un item avec ce name existe déjà dans cette ToDoList.");
        }

        // Respect 30 minutes between 2 items
        if (this.items.length > 0) {
            const lastItem = this.items[this.items.length - 1];
            const lastDate = lastItem.createdAt;
            const newDate = item.createdAt;
            const THIRTY_MINUTES_MS = 30 * 60 * 1000;

            if (newDate - lastDate < THIRTY_MINUTES_MS) {
                throw new Error("Il doit y avoir au moins 30 minutes entre deux items.");
            }
        }

        this.items.push(item);

        // save item
        this.save(item);

        // Send email
        if (
            this.items.length === 8 &&
            this.emailSenderService &&
            typeof this.emailSenderService.sendAlmostFull === "function"
        ) {
            this.emailSenderService.sendAlmostFull(this.user, this);
        }

        return item;
    }

    // save item
    // Exception
    save(item) {
        if (!this.itemRepository || typeof this.itemRepository.save !== "function") {
            throw new Error("itemRepository.save n'est pas disponible.");
        }

        this.itemRepository.save(item);
    }
}

module.exports = TodoList;
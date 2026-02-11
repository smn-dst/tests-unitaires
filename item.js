class Item {
    constructor(name, content, createdAt) {
        this.name = name;
        this.content = content;
        this.createdAt = createdAt;
    }

    isValid() {
        if (!this.name) return false;
        if (!this.content) return false;
        if (!this.createdAt) return false;
        if (this.content.length > 1000) return false;
        return true;
    }

    isExpired() {
        const today = new Date();
        return this.createdAt < today;
    }

    isTooLong() {
        return this.content.length > 1000;
    }

    isTooShort() {
        return this.content.length < 10;
    }
}

module.exports = Item;
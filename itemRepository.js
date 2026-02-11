class ItemRepository {
   //error pour dire que c'est pas implémenté
  save(item) {
    throw new Error("save n'est pas implémenté (doit être mocké en test).");
  }
}

module.exports = ItemRepository;


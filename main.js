const fs = require("fs");
const path = require("path");
class Liga {
  #liga;
  constructor(liga) {
    this.liga = liga;
    fs.writeFileSync(__dirname + "/" + liga + ".json", "");
    fs.appendFileSync(
      __dirname + "/" + this.liga + ".json",
      '\n [{ "id": 1, "ch_name": "Laliga", "com_name": "barselona", "trener": "Mourino", "city": "Marsel"}]'
    );
  }
  close() {
    if (this.liga) {
      fs.unlinkSync(path.resolve() + "/" + this.liga + ".json");
    } else {
      console.log("Bunday fayl topilmadi !");
    }
  }
  info() {
    if (this.liga) {
      console.log(fs.readFileSync(__dirname + "/Laliga.json", "utf-8"));
    } else {
      console.log("File bo'sh !");
    }
  }
}
class Command {
  #liga;
  #com;
  #trener;
  #city;
  constructor(ch_name, com_name, trener, city) {
    this.liga = ch_name;
    this.com = com_name;
    this.trener = trener;
    this.city = city;
    let data = JSON.parse(
      fs.readFileSync(path.join(__dirname, "/" + this.liga + ".json"))
    );
    let newfilter = data.find(
      (e) =>
        e.ch_name == ch_name &&
        e.com_name == com_name &&
        e.trener == trener &&
        e.city == city
    );
    if (newfilter) {
      return `${this.liga} da ${this.com} allaqachon bor !`;
    }
    if (!newfilter) {
      data.push({
        id: data.at(-1)?.id + 1 || 1,
        ch_name,
        com_name,
        trener,
        city,
      });
      fs.writeFileSync(
        path.join(__dirname, "/" + this.liga + ".json"),
        JSON.stringify(data, null, 4)
      );
    }
  }
  change(arg, city) {
    let data = JSON.parse(
      fs.readFileSync(path.join(__dirname, "/" + this.liga + ".json"))
    );

    if (data.find((e) => (e.com_name == this.com, e.city == this.city))) {
      data.find((e) => (e.trener = arg));
      data.find((e) => (e.city = city));
      fs.writeFileSync(
        path.join(__dirname, "/" + this.liga + ".json"),
        JSON.stringify(data, null, 4)
      );
    } else {
      console.log("Xato !!!");
    }
  }
}
class Gamer {
  #com;
  #name;
  #work;
  #num;

  constructor(com, name, work, num) {
    this.com = com;
    this.name = name;
    this.work = work;
    this.num = num;

    let data = JSON.parse(
      fs.readFileSync(path.join(__dirname, "/Gamers.json"))
    );
    let newfilter = data.find(
      (e) => e.com == com && e.name == name && e.work == work && e.num == num
    );
    if (newfilter) {
      return `Gamers.json da ${this.name} allaqachon bor !`;
    }
    if (!newfilter) {
      data.push({
        id: data.at(-1)?.id + 1 || 1,
        com,
        name,
        work,
        num,
      });
      fs.writeFileSync(
        path.join(__dirname, "/Gamers.json"),
        JSON.stringify(data, null, 4)
      );
    }
  }

  change(arg, num) {
    let data = JSON.parse(
      fs.readFileSync(path.join(__dirname, "/Gamers.json"))
    );

    if (data.find((e) => (e.name == this.name, e.com == this.com))) {
      data.find((e) => (e.work = arg));
      data.find((e) => (e.num = num));
      fs.writeFileSync(
        path.join(__dirname, "/Gamers.json"),
        JSON.stringify(data, null, 4)
      );
    } else {
      console.log("Xato !!!");
    }
  }
}

// const liga = new Liga("Laliga");
// liga.close(); //  file o'chirilsin
// console.log(liga.info()); //  [{ "id": 1, "ch_name": "Laliga", "com_name": "barselona", "trener": "Mourino", "city": "Marsel"}]
// const bundesliga = new Liga("Bundesliga");
// bundesliga.close(); //  file o'chirilsin
// const barsa = new Command("Laliga", "Barselona", "Mari", "Barselona");
// barsa.change("Farrux"); // changed  Barselona
// console.log(barsa.info); // { liga: "Laliga",  commanda : "Barselona", trener: "Osumira", city "Mayami" }
// barsa.remove(); // removed  Barselona
// const real = new Command("Laliga", "Real", "Akim", "Madrid");
// const bavarya = new Command("Bundesliga", "Bavarya", "Oshit", "Bavarya");
// const barusya = new Command("Bundesliga", "Barusya", "Komra", "Barusya");
// barusya.remove(); // removed  Barselona
// const muller = new Gamer("Bavarya", "Muller", "hujum", 12);
// muller.change("himoya"); //   changed Muller
// muller.info; //       {commanda:"Bavarya", name: "Muller", position: "darvozabon", number: 1}
// muller.left(); //     left Muller of Bovariya
// const neymar = new Gamer("Barselona", "Neymar", "hujum", 2);
// neymar.change("himoya", 12);
// const benzema = new Gamer("Real", "Benzema", "hujum", 9);
// const messi = new Gamer("PSG", "Messi", "hujum", 10);
// const ranaldo = new Gamer("Chelsea", "C.Ronaldo", "hujum", 7);

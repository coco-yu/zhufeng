// 观察者模式

class Subject {
  constructor(name) {
    this.name = name;
    this.state = '开心';
    this.observer = [];
  }

  attach(o) {
    this.observer.push(o);
  }

  setState(newState) {
    this.state = newState;
    this.observer.forEach(o => o.update(this));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  update(baby) {
    console.log(baby.name+'状态变了'+this.name+'知道了');
  }
}

const father = new observer('爸爸');
const mother = new Observer('麻麻');

const baby = new Subject('宝宝');

baby.attach(father);
baby.attach(mother);



import moment from 'moment';

// Helper function for generating unique IDs
function guidGenerator() {
    function S4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return S4()+S4()+'-'+S4()+'-'+S4()+'-'+S4()+'-'+S4()+S4()+S4();
  }
  
  export default class Todo {
      constructor(descriptionText, todoDate, isDone, id) {
          this.descriptionText = descriptionText || '';
          this.todoDate = todoDate || '';
          this.isDone = isDone || false;
          this.id = id || guidGenerator();
          this.day = moment.utc(this.todoDate).local().format('DD');
      }
  }
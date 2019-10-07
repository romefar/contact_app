const uuidv1 = require('uuid/v1');

export default class ContactService {

   data = [];
   searchData = [];

   sectionDic = [
      {
         title: "",
         data: []
      }
   ];

   names = ['Emery', 'Matteo', 'Alexander', 'Santino', 'Zayne', 'Ismael', 'Trace', 'Reilly', 'Hamza', 'Alejandro', 'Sawyer', 'Lewis', 'Reese',
      'Keith', 'Jimmy', 'Alexzander', 'Joshua', 'Maximillian', 'Vaughn', 'Orlando', 'Ezra', 'Konner', 'Orion', 'Antony', 'Peyton', 'Freddy',
      'Gerardo', 'Matthias', 'Tanner', 'Zavier'];

   surnames = ['Hunt', 'Chavez', 'Booth', 'Curtis', 'Hensley', 'Dunn', 'Rangel', 'Hull', 'Terry', 'Pearson', 'Lyons', 'Pacheco', 'Miller', 'Ryan',
      'Sandoval', 'Ruiz', 'Huynh', 'Buchanan', 'Porter', 'Douglas', 'Small', 'Wiley', 'Phelps', 'Andersen', 'Rasmussen', 'Brock', 'Nash', 'Pennington',
      'Haas', 'Boone'];

   middleNames = ['Ellory', 'Caprice', 'Bailee', 'Gavin', 'Jack', 'Carlen', 'Jacklyn', 'Taye', 'Reeve', 'Joan', 'Matilda', 'Blanche', 'Vivian',
      'Debree', 'Robin', 'Grey', 'Eli', 'Naomi', 'Chase', 'Madisen', 'Bram', 'Orlando', 'Conrad', 'Drake', 'Levi', 'Natalie', 'Edward', 'Lucinda', 'Ellen', 'Dezi'];


   initializeContactList = () => {
      for (let i = 0; i < 30; i++) {
         this.data[i] = {
            key: uuidv1(),
            name: this.names[i],
            surname: this.surnames[i],
            middleName: this.middleNames[i],
            phone: `+37526440${i % 10}9${i % 10}1`,
            email: `myemail${i}@example.com`
         };
      }
   }

   updateContact = (contact) => {
      const index = this.data.findIndex(item => item.key === contact.key);
      this.data[index] = contact;
   }

   searchContact = (text) => {
      this.searchData = this.sectionDic.map(item => {
         const data = item.data.map(elem => {
            if (elem.name.includes(text) || elem.surname.includes(text) || elem.middleName.includes(text)) {
               return elem;
            }
         })
         if(data.length !== 0) 
            return item;

      });
      return this.searchData;
   }

   addItem = (item) => {
      this.data.push(item);
   }

   removeItem = (id) => {
      let index = this.data.findIndex((item) => item.key === id);
      this.data = this.data.splice(index, 1);
   }

   _sortData = () => {
      this.data.sort((a, b) => (a.surname > b.surname) ? 1 : -1);
   }

   _transformIntoSectionList = () => {
      this._sortData();
      this.data.forEach((el) => {
         if (!this.sectionDic.find((item) => item.title === el.surname[0])) {
            this.sectionDic.push({
               title: el.surname[0],
               data: [
                  el
               ]
            });
         } else {
            this.sectionDic[this.sectionDic.findIndex((item) => item.title === el.surname[0])].data.push(el);
         }
      });
   }


   getContactById = (id) => { 
      const srcItem = this.data.find((item) => item.key === id);
      return srcItem;
   }

   getSectionHeaders = () => {
      this.sectionDic = [
         {
            title: "",
            data: []
         }
      ];
      this._transformIntoSectionList();
      return this.sectionDic.filter(item => item.title !== '');
   }
}
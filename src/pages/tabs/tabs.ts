import { Component } from '@angular/core';





@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'HomePage';
  tab2Root = 'ProfilePage';
  tab3Root = 'UsersPage';
  tab4Root = 'PostCreatePage'

  constructor() {

  }
}

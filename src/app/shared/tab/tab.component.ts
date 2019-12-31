import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  @ViewChildren('allTabs') allTabs: QueryList<any>;

  constructor() {}

  ngOnInit() {}

  // ngAfterViewInit() {
  //   console.log('total tabs: ' + this.allTabs.first._tabs.length);
  // }

  tabChanged(tabChangeEvent: number) {
    console.log('tab selected: ' + tabChangeEvent);
  }
}

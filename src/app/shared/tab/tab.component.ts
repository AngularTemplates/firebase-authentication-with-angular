import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  @ViewChildren('allTabs') allTabs: QueryList<any>;

  constructor(private _route: Router) {}

  ngOnInit() {}

  // ngAfterViewInit() {
  //   console.log('total tabs: ' + this.allTabs.first._tabs.length);
  // }

  tabChanged(tabChangeEvent: number) {}
}

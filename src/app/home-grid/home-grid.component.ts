import { Component, OnInit } from '@angular/core';
// import { ColDef } from 'ag-grid-community';
import { HomeService } from './home.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-grid',
  templateUrl: './home-grid.component.html',
  styleUrls: ['./home-grid.component.less']
})
export class HomeGridComponent implements OnInit {
  columnDefs: { headerName: string; field: string; filter: boolean; sortable: boolean; resizable: boolean; minWidth: number; width: number;}[];
  gridApi: any;
  gridColumnApi: any;
  rowData: any = [];
  profileForm = new FormGroup({
    keyword: new FormControl('', Validators.required),
    tweets: new FormControl('', Validators.required),
  });

  constructor(private homeService: HomeService) { 
    this.columnDefs = [
      // {headerName:'Keyword', field: 'keyword', filter: true, sortable: true, resizable: true, minWidth:300},
      {headerName:'Tweets', field: 'tweets', filter: true, sortable: true, resizable: true, minWidth:300, width: 900},
      {headerName:'Sentiments', field: 'sentiments', filter: true, sortable: true, resizable: true, minWidth:300, width: 300}
      
      // {headerName:'negative', field: 'negative', filter: true, sortable: true, resizable: true, minWidth:300},
      // {headerName:'neutral', field: 'neutral', filter: true, sortable: true, resizable: true, minWidth:300},
      // {headerName:'positive', field: 'positive', filter: true, sortable: true, resizable: true, minWidth:300},
    ]
  }

  ngOnInit() {
  }

  onGridReady(params: any){
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();

    // Following line dymanic set height to row on content
    params.api.resetRowHeights();
    this.gridApi.setGridAutoHeight(true)
  }

  SearchWord(keyword: HTMLInputElement, number_of_tweets: HTMLInputElement){
    this.rowData = []
    let obj = {
      'keyword': keyword.value,
      'number_of_tweets' : parseInt(number_of_tweets.value)
    }
    this.homeService.populteGridData(obj).subscribe((response) => { 
      for (let i = 0; i< response['tweets'].length; i++) {
        this.rowData.push({'tweets' : response['tweets'][i], 'sentiments' : response['sentiments'][i]})
      }
      this.gridApi.setRowData(this.rowData)
    })
  }

  updateForm(event) {
    if (event.target.value.toString().length >= 2) {
      event.target.value = 100;
      event.preventDefault()
    }
  }

  onModelUpdated(params){
    this.gridApi = params.api;
    if (params.api && this.columnDefs.length != 0){
      this.onGridSizeChanged(params);
      this.gridApi.setDomLayout('autoHeight');
    }
    
  }
  onGridSizeChanged(params: any) {
    const gridWidth = document.getElementById('Home-Grid').offsetWidth;
    const columnstoShow = [];
    const columnstohide = [];
    let totalcolsWidth = 0 ;
    const allColumns = params.columnApi.getAllColumns();
    for(let i = 0; i< allColumns.length; i++){
      const column = allColumns[i];
      totalcolsWidth += column.getMinWidht();
      if (totalcolsWidth > gridWidth){
        columnstohide.push(column.colId)
      }
      else{
        columnstoShow.push(column.colId)
      }
    }
    params.columnApi.SetColumnsVisible(columnstoShow, true);
    params.columnApi.SetColumnsVisible(columnstohide, true);
    params.api.sizeColumnsToFit();
  }

  onCellClicked(event){
    console.log(event.colDef.field)
    console.log(event.node.data);
  }
}

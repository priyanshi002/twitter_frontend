import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home-grid',
  templateUrl: './home-grid.component.html',
  styleUrls: ['./home-grid.component.less']
})
export class HomeGridComponent implements OnInit {
  columnDefs: { headerName: string; field: string; filter: boolean; sortable: boolean; resizable: boolean; minWidth: number; }[];
  gridApi: any;
  gridColumnApi: any;
  rowData: any = [];

  constructor(private homeService: HomeService) { 
    this.columnDefs = [
      {headerName:'keyword', field: 'keyword', filter: true, sortable: true, resizable: true, minWidth:300},
      {headerName:'negative', field: 'negative', filter: true, sortable: true, resizable: true, minWidth:300},
      {headerName:'neutral', field: 'neutral', filter: true, sortable: true, resizable: true, minWidth:300},
      {headerName:'positive', field: 'positive', filter: true, sortable: true, resizable: true, minWidth:300},
      // {headerName:'First Name', field: 'first_name', filter: true, sortable: true, resizable: true, minWidth:300},
    ]
  }

  ngOnInit() {
  }

  onGridReady(params: any){
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  SearchWord(keyword: HTMLInputElement){
    let obj = {
      'keyword': keyword.value
    }
    this.homeService.populteGridData(obj).subscribe((response) => {      
      this.rowData.push(response)
      this.gridApi.setRowData(this.rowData)
    })
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

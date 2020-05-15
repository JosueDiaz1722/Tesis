import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {  MatTable } from '@angular/material/table';
import {DialogBoxComponent} from '../dialog-box/dialog-box.component'
 

export interface UsersData {
  id: number;
  nombre: string;
  prioridad: number;
  comentario: string;
}
 
const ELEMENT_DATA: UsersData[] = [
  {id: 12, prioridad: 1, nombre: 'Actor 1', comentario: 'Comentario 1'},
  {id: 11, prioridad: 3, nombre: 'Actor 2', comentario: 'Comentario 2'}
];

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {

  displayedColumns: string[] = ['id','nombre', 'prioridad', 'comentario', 'action'];
  dataSource = ELEMENT_DATA;
  
 
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
 
  constructor(public dialog: MatDialog) {}
 
  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '25%',
      data:obj
    });
 
    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }
 
  addRowData(row_obj){
    var d = new Date();
    this.dataSource.push({
      id:d.getTime(),
      nombre: row_obj.nombre,
      prioridad: row_obj.prioridad,
      comentario: row_obj.comentario
    });
    this.table.renderRows();
    
  }
  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.nombre = row_obj.nombre;
        value.comentario = row_obj.comentario;
        value.prioridad = row_obj.prioridad
      }
      return true;
    });
  }
  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }
 
  ngOnInit(): void {
  }

}

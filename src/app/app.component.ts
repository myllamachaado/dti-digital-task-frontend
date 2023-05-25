import { Component } from '@angular/core';
import { TaskService } from './services/task.service';
import { TaskRequest } from './task/task.request';
import { TaskResponse } from './task/task.response';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Data } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['../styles.css']
})
export class AppComponent {
  title = 'Cadastro de Lembretes';

  // Variável do form
  taskForm! : FormGroup;

   //Armazena retornos do backend
  taskRequest! : TaskRequest;
  taskResponse! : TaskResponse;
  taskResponseList! : TaskResponse[];

  // Variável que compara a data selecionada com a data atual
  today! : Date;

  constructor(private taskService : TaskService) {
    this.getAll();
  }

  ngOnInit(){
    this.taskForm = new FormGroup({
      id:  new FormControl(''),
      nome: new FormControl('', Validators.required),
      data: new FormControl('', Validators.required)
    });
  }

  // Getters and Setters

  get nome(){
    return this.taskForm.get('nome')! ;
  }

  get data(){
    return this.taskForm.get('data')!;
  }

  // CRUD Functions 

  saveTask(taskRequest : TaskRequest): void {
    if(this.taskForm.get('nome')?.valid && 
      this.taskForm.get('data')?.valid && 
      this.comparaData(this.taskForm.get('data')?.value)){
      this.taskService.create(taskRequest)
      .subscribe(
        response => {
          this.getAll();
        },
        error => {
          console.log("Erro: ", error);
        });
    }
  }

  getAll(): void {
    this.taskService.getAll()
      .subscribe(
        taskResponseList => {
          this.taskResponseList = taskResponseList;
          console.log(taskResponseList);
        },
        error => {
          console.log(error);
        });
  }

  deleteTutorial(id : any): void {
    this.taskService.delete(id)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  comparaData(data : Data) : Boolean {
    this.today = new Date();
    if(data < this.today){
      return false;
    }
    else{
      return true;
    }
  }

}

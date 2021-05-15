import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Bank } from '../../models/bank';
import { BankService } from '../../services/bank.service';
import { ToastrService } from "ngx-toastr";
import { LocalDataSource } from 'ng2-smart-table';


@Component({
  templateUrl: 'bank.component.html'
})
export class BankComponent {
      formulaire: FormGroup;
      source: LocalDataSource;
      settings = {
        mode: 'inline',
        columns: {
          code: { title: 'code', filter: false },
          libelle: { title: 'Libelle', filter: false },
        },
        delete: {
          deleteButtonContent: '<i class="fa fa-trash-o"> supprimer</i>',
          confirmDelete: true
        },
        edit: {
          editButtonContent: '<i class="fa fa-pencil"></i>',
          confirmSave: true
        },
        actions: {
          add: false,
          position: 'right'
        },
        noDataMessage: 'Données introuvables',
        hideSubHeader: true,
        pager: { display: true, perPage: 8 }
      }

      constructor(private formBuilder: FormBuilder,
        private router: Router,
        private bankService: BankService,
        private toastr: ToastrService) { }

      ngOnInit(): void {
        this.formulaire = this.formBuilder.group({
            code: ['', Validators.required],
            libelle: ['', Validators.required]
        });
        this.getBanks();
    }
    get code(): AbstractControl {
      return this.formulaire.get('code');
    }
    get libelle(): AbstractControl {
      return this.formulaire.get('libelle');
    }
    saveForm(){
      if (this.formulaire.valid) {
        let bank: Bank = this.formulaire.value;
        this.bankService.createBank(bank).subscribe(
          data => {
            console.log("doneeeeeee")
            this.source.append(bank)
            this.toastr.success("bank a été ajouteé", "succès");
            this.router.navigateByUrl('bank/', {skipLocationChange: true}).then(() => this.router.navigate(['bank/']));
            this.formulaire.reset();
          },
          error => {
            console.log(error);
            this.toastr.error("quelque chose s'est mal passé", "error");
          }
        );
      }
    }
    resetForm (){
      this.formulaire.reset();
    }

    getBanks() {
      this.bankService.getBanks().subscribe(
        banks => {
          this.source = new LocalDataSource(banks);
        },
        error => console.log('on fetch banks', error)
      );
    }

    deleteBank(event) {
      if (window.confirm('êtes vous sûr de vouloir supprimer cette Bank?')) {
        this.bankService.deleteBank(event.data.id).subscribe(
          success => {
            this.toastr.success("bank supprimé", "succès");
            event.confirm.resolve();
          },
          error => {
            this.toastr.error("bank non supprimé", "erreur")
            console.log(`error on delete of bank ${event.data.id}, ${error}`)
          });
      } else event.confirm.reject();
    }

    onSearch(query = '') {
      if (query == '') {
        this.source.setFilter([])
      } else {
        this.source.setFilter([
          { field: 'code', search: query },
          { field: 'libelle', search: query },

        ], false);
      }
    }

}

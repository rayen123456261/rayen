import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Affectation } from '../../models/affectation';
import { AffectationService } from '../../services/affectation.service';
import { ToastrService } from "ngx-toastr";
import { LocalDataSource } from 'ng2-smart-table';
import { Ng2SmartTableModule } from 'ng2-smart-table';





@Component({
  templateUrl: 'Affectation.component.html'
})
export class AffectationComponent {
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
        private affectationService: AffectationService,
        private toastr: ToastrService
        ) { }

      ngOnInit(): void {
        this.formulaire = this.formBuilder.group({
            code: ['', Validators.required],
            libelle: ['', Validators.required]
        });
        this.getAffectationss()
    }
    get code(): AbstractControl {
      return this.formulaire.get('code');
    }
    get libelle(): AbstractControl {
      return this.formulaire.get('libelle');
    }
    saveForm(){
      if (this.formulaire.valid) {
        let affectation: Affectation = this.formulaire.value;
        this.affectationService.createAffecation(affectation).subscribe(
          data => {
            console.log("doneeeeeee")
            this.source.append(affectation)
            this.toastr.success("Affectation a été ajouteé", "succès");
            this.router.navigateByUrl('affectation/', {skipLocationChange: true}).then(() => this.router.navigate(['affectation/']));
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

    getAffectationss() {
      this.affectationService.getAffectations().subscribe(
        affectations => {
          this.source = new LocalDataSource(affectations);
        },
        error => console.log('on fetch affectations', error)
      );
    }

    deleteAffectation(event) {
      if (window.confirm('êtes vous sûr de vouloir supprimer cette affectation?')) {
        this.affectationService.deleteAffectation(event.data.id).subscribe(
          success => {
            this.toastr.success("affectation supprimé", "succès");
            event.confirm.resolve();
          },
          error => {
            this.toastr.error("affectation non supprimé", "erreur")
            console.log(`error on delete of affectation ${event.data.id}, ${error}`)
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

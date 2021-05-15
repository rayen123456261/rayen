import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subvention } from '../../models/subvention';
import { SubventionService } from '../../services/subvention.service';
import { ToastrService } from "ngx-toastr";
import { LocalDataSource } from 'ng2-smart-table';


@Component({
  templateUrl: 'subvention.component.html'
})
export class SubventionComponent {
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
        private subventionService: SubventionService,
        private toastr: ToastrService) { }

      ngOnInit(): void {
        this.formulaire = this.formBuilder.group({
            code: ['', Validators.required],
            libelle: ['', Validators.required]
        });
        this.getSubventions();
    }
    get code(): AbstractControl {
      return this.formulaire.get('code');
    }
    get libelle(): AbstractControl {
      return this.formulaire.get('libelle');
    }
    saveForm(){
      if (this.formulaire.valid) {
        let subvention: Subvention = this.formulaire.value;
        this.subventionService.createSubvention(subvention).subscribe(
          data => {
            console.log("doneeeeeee")
            this.source.append(subvention)
            this.toastr.success("subvention a été ajouteé", "succès");
            this.router.navigateByUrl('subvention/', {skipLocationChange: true}).then(() => this.router.navigate(['subvention/']));
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

    getSubventions() {
      this.subventionService.getSubventions().subscribe(
        subventions => {
          this.source = new LocalDataSource(subventions);
        },
        error => console.log('on fetch subventions', error)
      );
    }

    deleteSubvention(event) {
      if (window.confirm('êtes vous sûr de vouloir supprimer cette subvention?')) {
        this.subventionService.deleteSubvention(event.data.id).subscribe(
          success => {
            this.toastr.success("subvention supprimé", "succès");
            event.confirm.resolve();
          },
          error => {
            this.toastr.error("subvention non supprimée,elle est utilisée dans subention Specaile  ", "erreur")
            console.log(`error on delete of subvention ${event.data.id}, ${error}`)
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

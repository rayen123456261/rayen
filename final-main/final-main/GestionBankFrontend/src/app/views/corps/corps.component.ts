import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Corps } from '../../models/corps';
import { CorpsService } from '../../services/corps.service';
import { ToastrService } from "ngx-toastr";
import { LocalDataSource } from 'ng2-smart-table';


@Component({
  templateUrl: 'corps.component.html'
})
export class CorpsComponent {
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
        private corpsService: CorpsService,
        private toastr: ToastrService) { }

      ngOnInit(): void {
        this.formulaire = this.formBuilder.group({
            code: ['', Validators.required],
            libelle: ['', Validators.required]
        });
        this.getCorps();
    }
    get code(): AbstractControl {
      return this.formulaire.get('code');
    }
    get libelle(): AbstractControl {
      return this.formulaire.get('libelle');
    }
    saveForm(){
      if (this.formulaire.valid) {

        let corps: Corps = this.formulaire.value;
        console.log(corps);
        this.corpsService.createCorps(corps).subscribe(
          data => {
            console.log("doneeeeeee")
            this.source.append(corps)
            this.toastr.success("Affectation a été ajouteé", "succès");
            this.router.navigateByUrl('corps/', {skipLocationChange: true}).then(() => this.router.navigate(['corps/']));
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

    getCorps() {
      this.corpsService.getCorpss().subscribe(
        corps => {
          this.source = new LocalDataSource(corps);
        },
        error => console.log('on fetch Corps', error)
      );
    }

    deleteCorps(event) {
      if (window.confirm('êtes vous sûr de vouloir supprimer cette affectation?')){
        console.log(event.data.id);
        this.corpsService.deleteCorps(event.data.id).subscribe(
          success => {
            this.toastr.success("Corps supprimé", "succès");
            event.confirm.resolve();
          },
          error => {
            this.toastr.error("Corps non supprimé", "erreur")
            console.log(`error on delete of corps ${event.data.id}, ${error}`)
            console.log(event.data.id);
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

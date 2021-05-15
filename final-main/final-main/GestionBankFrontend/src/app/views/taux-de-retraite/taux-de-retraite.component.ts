import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TauxDeRetraite } from '../../models/TauxDeRetraite';
import { TauxDeRetraiteService } from '../../services/Taux-de-retraite.service';
import { ToastrService } from "ngx-toastr";
import { LocalDataSource } from 'ng2-smart-table';



@Component({
  templateUrl: 'taux-de-retraite.component.html'
})
export class TauxDeRetraiteComponent {
      formulaire: FormGroup;
      source: LocalDataSource;
      settings = {
        mode: 'inline',
        columns: {
          retraite: { title: 'retraite', filter: false },
          prevoyancesociale: { title: 'Prévoyance sociale', filter: false },
          capitaledeces: { title: 'Capitale décés', filter: false },
          assurance: { title: 'assurance', filter: false },
          syndic: { title: 'syndic', filter: false }
        },
        delete: {
          deleteButtonContent: '<i class="fa fa-trash-o">supprimer</i>',
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
        private tauxDeRetraiteService: TauxDeRetraiteService,
        private toastr: ToastrService
        ) { }

      ngOnInit(): void {
        this.formulaire = this.formBuilder.group({
            retraite: ['', Validators.required],
            capitaledeces: ['', Validators.required],
            assurance: ['', Validators.required],
            prevoyancesociale: ['', Validators.required],
            syndic: ['', Validators.required]
        });
        this.getTauxDeretraites();
    }
    get retraite(): AbstractControl {
      return this.formulaire.get('retraite');
    }
    get capitaledeces(): AbstractControl {
      return this.formulaire.get('capitaledeces');
    }
    get assurance(): AbstractControl {
      return this.formulaire.get('assurance');
    }
    get Prevoyancesociale(): AbstractControl {
      return this.formulaire.get('prevoyancesociale');
    }
    get syndic(): AbstractControl {
    return this.formulaire.get('syndic');
  }
    saveForm(){
      if (this.formulaire.valid) {
        console.log(this.retraite);
        let tauxDeRetraite: TauxDeRetraite = this.formulaire.value;
        this.tauxDeRetraiteService.createTauxDeRetraite(tauxDeRetraite).subscribe(
          data => {
            console.log(tauxDeRetraite)
            this.source.append(tauxDeRetraite)
            this.toastr.success("Taux De Retraite a été ajouteé", "succès");
            this.router.navigateByUrl('tauxDeRetraite/', {skipLocationChange: true}).then(() => this.router.navigate(['tauxDeRetraite/']));
            this.formulaire.reset()
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

    getTauxDeretraites() {
      this.tauxDeRetraiteService.getTauxDeRetraites().subscribe(
        tauxDeRetraites => {
          this.source = new LocalDataSource(tauxDeRetraites);
        },
        error => console.log('on fetch grade', error)
      );
    }

  deleteretraite(event) {
    if (window.confirm('êtes vous sûr de vouloir supprimer cette affectation?')){
      console.log(event.data.id);
      this.tauxDeRetraiteService.deleteTauxDeRetraite(event.data.id).subscribe(
        success => {
          this.toastr.success("taux de retraite supprimé", "succès");
          event.confirm.resolve();
        },
        error => {
          this.toastr.error("taux de retraite non supprimé", "erreur")
          console.log(`error on delete of taux de retraite ${event.data.id}, ${error}`)
        });
    } else event.confirm.reject();
  }
  onSearch(query = '') {
    if (query == '') {
      this.source.setFilter([])
    } else {
      this.source.setFilter([
        { field: 'retraite', search: query },
        { field: 'prevoyancesociale', search: query },
        { field: 'capitaledeces', search: query },
        { field: 'assurance', search: query },
        { field: 'syndic', search: query },
      ], false);
    }
  }

}
